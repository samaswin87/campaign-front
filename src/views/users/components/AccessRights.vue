<template>
    <el-card class="box-card w-ratio-70">
        <div slot="header" class="clearfix">
            <span>Access Rights</span>
        </div>
        <div class="user-rights">
            <el-row :gutter="12">
                <el-col :span="8">
                    <el-card shadow="hover">
                        <span class="ml-25-ratio-i">
                            <el-checkbox label="Campaign" border><svg-icon name="campaign"></svg-icon> Campaign</el-checkbox>
                        </span>
                        <span class="mt-10-px ml-5-ratio-i d-flex">
                            <el-checkbox label="List"><svg-icon name="list"></svg-icon></el-checkbox>
                            <el-checkbox label="Show"><svg-icon name="eye-on" ></svg-icon></el-checkbox>
                            <el-checkbox label="Create"><svg-icon name="add"></svg-icon></el-checkbox>
                            <el-checkbox label="Edit"><svg-icon name="edit"></svg-icon></el-checkbox>
                        </span>
                    </el-card>
                </el-col>
                <el-col :span="8">
                    <el-card shadow="hover">
                        Always
                    </el-card>
                </el-col>
                <el-col :span="8">
                    <el-card shadow="hover">
                        Always
                    </el-card>
                </el-col>
                <el-col :span="8">
                    <el-card shadow="hover">
                        Always
                    </el-card>
                </el-col>
                <el-col :span="8">
                    <el-card shadow="hover">
                        Always
                    </el-card>
                </el-col>
                <el-col :span="8">
                    <el-card shadow="hover">
                        Always
                    </el-card>
                </el-col>
            </el-row>
        </div>
    </el-card>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
import { IUserSettingData } from '@/api/types'
import { defaultUserSettingData } from '@/api/users'

@Component({
  name: 'UserSettings',
  components: {
  }
})
export default class extends Vue {
    @Prop({ required: true }) private userId!: number
}
</script>
