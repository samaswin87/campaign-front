<template>
    <el-card class="box-card w-ratio-80">
        <div slot="header" class="clearfix">
            <span>Access Rights</span>
            <span class="float-right"><el-button type="primary" @click="updateAccessRights" circle><svg-icon name="save" ></svg-icon></el-button></span>
        </div>
        <div class="user-rights">
            <el-row :gutter="12" class="panel-group">
                <el-col :xs="12" :sm="12" :lg="6" v-for="item in accessRights" :key="item.id">
                    <el-card shadow="hover" class="mb-10-px">
                        <span :class="item.className">
                            <el-checkbox v-model="item.moduleSelected" :label="item.moduleName" border><svg-icon :name="item.logo"></svg-icon> {{item.moduleName}}</el-checkbox>
                        </span>
                        <span class="mt-10-px d-flex" v-if="item.menu">
                            <el-checkbox v-model="item.list" label="List"><svg-icon name="list"></svg-icon></el-checkbox>
                            <el-checkbox v-model="item.show" label="Show"><svg-icon name="eye-on" ></svg-icon></el-checkbox>
                            <el-checkbox v-model="item.create" label="Create"><svg-icon name="add"></svg-icon></el-checkbox>
                            <el-checkbox v-model="item.edit" label="Edit"><svg-icon name="edit"></svg-icon></el-checkbox>
                        </span>
                    </el-card>
                </el-col>
            </el-row>
        </div>
    </el-card>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
import { IUserAccessRightData } from '@/api/types'
import { getAccessRights } from '@/api/users'

@Component({
  name: 'UserSettings',
  components: {
  }
})
export default class extends Vue {
    @Prop({ required: true }) private userId!: number
    private accessRights: IUserAccessRightData[] = []

    created() {
      this.fetchAccessRights()
    }

    private async fetchAccessRights() {
      try {
        const { data } = await getAccessRights(this.userId, {})
        this.accessRights = data.accessRights
      } catch (err) {
        console.error(err)
      }
    }

    private updateAccessRights() {
      console.log(this.accessRights)
    }
}
</script>
