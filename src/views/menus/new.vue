<template>
    <div class="app-container">
        <div class="menu-container">
            <el-row>
                <el-card class="box-card">
                    <div slot="header" class="clearfix">
                        <span>New Menu</span>
                        <el-button type="primary" class="float-right"><svg-icon name="save" /></el-button>
                    </div>
                    <el-row>
                        <el-col :span="8">
                            <el-row>
                                <el-card class="box-card menu-details">
                                    <el-form
                                    ref="menuForm"
                                    :model="menuData"
                                    class="form-container"
                                    >
                                        <el-row class="content-row">
                                            <el-col :span="2">
                                                <svg-icon name="company" class="svg-icon-botton"/>
                                            </el-col>
                                            <el-col :span="20">
                                                <div class="grid-value">
                                                    <multiselect
                                                    v-model="menuData.company"
                                                    placeholder="Search one company"
                                                    :options="companies"
                                                    :clear-on-select="false"
                                                    :close-on-select="false"
                                                    >
                                                    </multiselect>
                                                </div>
                                            </el-col>
                                        </el-row>

                                        <el-row class="content-row">
                                            <el-col :span="2">
                                                <svg-icon name="keyword" class="svg-icon-botton"/>
                                            </el-col>
                                            <el-col :span="20">
                                                <div class="grid-value">
                                                    <span>
                                                        <el-input
                                                        placeholder="Please add keyword"
                                                        v-model="menuData.name"
                                                        clearable>
                                                        </el-input>
                                                    </span>
                                                </div>
                                            </el-col>
                                        </el-row>

                                        <el-row class="content-row">
                                            <el-col :span="2">
                                                <svg-icon name="phone" class="svg-icon-botton"/>
                                            </el-col>
                                            <el-col :span="20">
                                                <div class="grid-value">
                                                    <span>
                                                        <el-input
                                                        placeholder="Please add phone"
                                                        v-model="menuData.phone"
                                                        clearable>
                                                        </el-input>
                                                    </span>
                                                </div>
                                            </el-col>
                                        </el-row>

                                        <el-row class="content-row">
                                            <el-col :span="20" class="content-vlaue">
                                                <div class="grid-content">
                                                    <span>
                                                        <el-switch
                                                        v-model="menuData.confidential"
                                                        active-text="Confidential"
                                                        active-color="#ff4949"
                                                        inactive-color="#13ce66"
                                                        inactive-text="Non Confidential">
                                                        </el-switch>
                                                    </span>
                                                </div>
                                            </el-col>
                                        </el-row>
                                    </el-form>
                                </el-card>
                            </el-row>
                        </el-col>
                        <el-col :span="16">
                            <el-card class="box-card menu-promt content-card">
                                <div slot="header" class="clearfix">
                                    <el-tooltip class="item" effect="dark" content="Add Promts" placement="bottom">
                                        <el-button type="primary" icon="el-icon-circle-plus" @click="addPromt"></el-button>
                                    </el-tooltip>
                                    <span class="content-space">Prompts are sent in the order they appear.</span>
                                </div>
                                <draggable
                                    :list="promtList"
                                    :key.sync="draggableList"
                                    class="dragArea"
                                    @end="updateItemOrder($event)"
                                >
                                    <div
                                    v-for="element in promtList"
                                    :key="element.order"
                                    class="list-complete-item"
                                    >
                                        <el-card shadow="hover" class="all-scroll">
                                            <svg-icon
                                            class="margin-right-10"
                                            name="drag"
                                            width="20"
                                            height="20"
                                            />
                                            <span>{{ element.body }} Order: [{{element.order}}]</span>
                                            <i class="el-icon-delete-solid float-right pointer" @click="removePromt(element)"/>
                                        </el-card>
                                    </div>
                                </draggable>
                            </el-card>
                                <el-card class="box-card menu-promt">
                                    <div slot="header" class="clearfix">
                                        <el-button
                                            type="primary"
                                            @click="addDestination"
                                        >
                                            <svg-icon name="add-url" />
                                        </el-button>
                                        <span class="content-space">Final Response</span>
                                    </div>
                                    <el-tag type="danger">Note: Add destination URL by declaring the variable {destinationURL} in the context</el-tag>
                                    <el-input
                                    placeholder="The final message is sent after the last prompt is answered."
                                    v-model="finalResponseData.body"
                                    type="textarea"
                                    :rows="8"
                                    class="margin-top-10"
                                    clearable>
                                    </el-input>
                                </el-card>
                        </el-col>
                    </el-row>
                </el-card>
            </el-row>

            <AddPromt
            :visible.sync="promtLoading"
            :order.sync="order"
            @promtRecord="addPromtRecord"
            />

            <AddDestinationURL
            :visible.sync="destinationLoading"
            @addDestinationURL="addDestinationURL"
            />
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { defaultMenuData, defaultFinalResponseData } from '@/api/menus'
import { getCompanies } from '@/api/companies'
import Multiselect from 'vue-multiselect'
import { map } from 'lodash'
import AddPromt from './components/AddPromt.vue'
import AddDestinationURL from './components/AddDestinationURL.vue'
import Draggable from 'vuedraggable'

@Component({
  name: 'MenuCreate',
  components: {
    Multiselect,
    AddPromt,
    Draggable,
    AddDestinationURL
  }
})
export default class extends Vue {
    private menuData = defaultMenuData
    private finalResponseData = defaultFinalResponseData
    private companies :string[] = []
    private promtLoading = false
    private destinationLoading = false
    private promtList:any[] = []
    private draggableList = 0
    private order = 0

    created() {
      this.fetchCompanies()
      this.promtList.push({
        name: 'Name',
        defualt: '',
        body: 'What is your name?',
        order: 0
      })

      this.promtList.push({
        name: 'Gender',
        defualt: 'Male',
        body: 'What is gender?',
        order: 1
      })

      this.promtList.push({
        name: 'Country',
        defualt: '',
        body: 'What is you country?',
        order: 2
      })
      this.order = this.promtList.length
    }

    private async fetchCompanies() {
      try {
        const { data } = await getCompanies({})
        this.companies = map(data.items, 'name')
      } catch (err) {
        console.error(err)
      }
    }

    private addPromt() {
      this.promtLoading = true
    }

    private addDestination() {
      this.destinationLoading = true
    }

    private addPromtRecord(data: any) {
      this.promtList.push(data)
      this.order = this.promtList.length
      this.draggableList += 1
    }

    private removePromt(element: any) {
      const index = this.promtList.indexOf(element)
      this.promtList.splice(index, 1)
      this.order = this.promtList.length
    }

    private updateItemOrder(event: any) {
      console.log('Old Index: ' + event.oldIndex)
      console.log('New Index: ' + event.newIndex)
    }

    private addDestinationURL(data: any) {
      console.log('Add destination URL to object :' + data)
    }
}
</script>

<style lang="scss" scoped>

.content-card {
    margin-bottom: 2%;
}

.content-row {
    margin-bottom: 5%;
}

.content-space {
    margin-left: 10px;
}

.content-button {
    margin-left: 28px;
}

.content-vlaue {
    padding-left: 50px;
}

.svg-icon-botton {
    width: 30px !important;
    height: 30px !important;
    margin-top: 8px;
}

.all-scroll {
    cursor: all-scroll;
}

.pointer {
    cursor: pointer;
}
</style>
