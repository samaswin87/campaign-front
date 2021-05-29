<template>
    <div class="app-container">
        <div class="menu-container">
            <el-row>
                <el-card class="box-card">
                    <div slot="header" class="clearfix">
                        <span>Show Menu</span>
                    </div>
                    <el-row>
                        <el-col :span="24" class="mb-20-px">
                            <el-button :disabled="menuSelected" @click.native="selectMenu"><svg-icon name="nested" /> Menu</el-button>
                            <el-button :disabled="conversationsSelected" @click.native="selectConversation"><svg-icon name="message" /> Conversations</el-button>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="8">
                            <el-row>
                                <el-card class="box-card menu-details">
                                    <el-form
                                    ref="menuForm"
                                    :model="menuData"
                                    class="form-container"
                                    >
                                        <el-row class="mb-5-ratio">
                                            <el-col :span="2">
                                                <svg-icon name="company"/>
                                            </el-col>
                                            <el-col :span="20">
                                                <div class="grid-value">
                                                    {{menuData.company}}
                                                </div>
                                            </el-col>
                                        </el-row>

                                        <el-row class="mb-5-ratio">
                                            <el-col :span="2">
                                                <svg-icon name="keyword"/>
                                            </el-col>
                                            <el-col :span="20">
                                                <div class="grid-value">
                                                    <span>
                                                        <el-tag effect="plain">
                                                            {{menuData.name}}
                                                        </el-tag>
                                                    </span>
                                                </div>
                                            </el-col>
                                        </el-row>

                                        <el-row class="mb-5-ratio">
                                            <el-col :span="2">
                                                <svg-icon name="phone"/>
                                            </el-col>
                                            <el-col :span="20">
                                                <div class="grid-value">
                                                    <span>
                                                        {{menuData.phone}}
                                                    </span>
                                                </div>
                                            </el-col>
                                        </el-row>

                                        <el-row class="mb-5-ratio">
                                            <el-col :span="2">
                                                <svg-icon :name="menuData.confidential ? 'eye-cross' : 'eye-on'"/>
                                            </el-col>
                                            <el-col :span="20">
                                                <div class="grid-value">
                                                    <span>
                                                        {{menuData.confidential ? 'Confidential' : 'Non Confidential'}}
                                                    </span>
                                                </div>
                                            </el-col>
                                        </el-row>

                                        <el-row class="mb-5-ratio">
                                            <el-col :span="2">
                                                <svg-icon :name="menuData.status"/>
                                            </el-col>
                                            <el-col :span="20">
                                                <div class="grid-value">
                                                    <span>
                                                        {{menuData.status | uppercaseFirstChar}}
                                                    </span>
                                                </div>
                                            </el-col>
                                        </el-row>
                                    </el-form>
                                </el-card>
                            </el-row>
                        </el-col>
                        <el-col :span="16" v-show="menuSelected">
                            <el-card class="box-card menu-promt content-card">
                                <div slot="header" class="clearfix">
                                    <i class="el-icon-s-order" />
                                    <span class="ml-10-px">PROMTS</span>
                                </div>
                                <draggable
                                    :list="promtList"
                                    :key.sync="draggableList"
                                    class="dragArea"
                                >
                                    <div
                                    v-for="element in promtList"
                                    :key="element.order"
                                    class="list-complete-item"
                                    >
                                        <el-card shadow="hover" class="all-scroll">
                                            <i class="el-icon-s-promotion margin-right-10" />
                                            <span>{{ element.body }}</span>
                                        </el-card>
                                    </div>
                                </draggable>
                            </el-card>
                        </el-col>
                        <el-col :span="16" v-show="conversationsSelected">
                            <Conversations
                                :menuId.sync="menuId"
                            />
                        </el-col>
                    </el-row>
                </el-card>
            </el-row>
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { defaultMenuData, getMenu } from '@/api/menus'
import { getCompanies } from '@/api/companies'
import { map } from 'lodash'
import Conversations from './components/MenuConversations.vue'
import Draggable from 'vuedraggable'

@Component({
  name: 'MenuCreate',
  components: {
    Draggable,
    Conversations
  }
})
export default class extends Vue {
    private menuData = defaultMenuData
    private companies :string[] = []
    private promtList:any[] = []
    private conversationList:any[] = []
    private draggableList = 0
    private order = 0
    private conversationsSelected = false
    private menuSelected = true
    private menuId = 0

    created() {
      this.fetchCompanies()
      const id = this.$route.params && this.$route.params.id
      this.fetchData(parseInt(id))
      this.menuId = parseInt(id)
    }

    private async fetchCompanies() {
      try {
        const { data } = await getCompanies({})
        this.companies = map(data.items, 'name')
      } catch (err) {
        console.error(err)
      }
    }

    private selectMenu() {
      this.menuSelected = true
      this.conversationsSelected = false
    }

    private selectConversation() {
      this.menuSelected = false
      this.conversationsSelected = true
    }

    private async fetchData(id: number) {
      try {
        const { data } = await getMenu(id, { /* Your params here */ })
        this.menuData = data.menu
        this.promtList = data.menu.promts
        this.order = this.promtList.length
        this.conversationList = data.menu.conversations
      } catch (err) {
        console.error(err)
      }
    }
}
</script>
