<template>
    <el-card class="box-card w-ratio-70">
        <div slot="header" class="clearfix">
            <span>Settings</span>
        </div>
        <div class="user-details">
            <el-row class="mb-10-px">
                <el-col :span="5" class="text-right fw-b mt-5-px">
                    <span>Time Zone:</span>
                </el-col>
                <el-col :span="12" class="text-left ml-20-px">
                    <span>
                        <el-tag
                        type="primary">
                        {{userSetting.timeZone}}
                        </el-tag>
                    </span>
                </el-col>
            </el-row>

            <el-row class="mb-10-px">
                <el-col :span="5" class="text-right fw-b mt-7-px">
                    <span>Campaign Replies:</span>
                </el-col>
                <el-col :span="12" class="text-left ml-20-px">
                    <span>
                        <el-radio v-model="userSetting.notifyCampaign" :label="true" border>Send an email with campaign response</el-radio>
                        <el-radio v-model="userSetting.notifyCampaign" :label="false" class="mt-10-px ml-0-px-i" border>Do not send an email with campaign response</el-radio>
                    </span>
                </el-col>
            </el-row>

            <el-row class="mb-10-px">
                <el-col :span="5" class="text-right fw-b mt-7-px">
                    <span>Workflow Conversations:</span>
                </el-col>
                <el-col :span="12" class="text-left ml-20-px">
                    <span>
                        <el-radio v-model="userSetting.notifyWorkflow" :label="true" border>Send an email with workflow response</el-radio>
                        <el-radio v-model="userSetting.notifyWorkflow" :label="false" class="mt-10-px ml-0-px-i" border>Do not send an email with workflow response</el-radio>
                    </span>
                </el-col>
            </el-row>

            <el-row class="mb-10-px">
                <el-col :span="5" class="text-right fw-b mt-7-px">
                    <span>Menu Conversations:</span>
                </el-col>
                <el-col :span="12" class="text-left ml-20-px">
                    <span>
                        <el-radio v-model="userSetting.notifyMenu" :label="true" border>Send an email with menu response</el-radio>
                        <el-radio v-model="userSetting.notifyMenu" :label="false" class="mt-10-px ml-0-px-i" border>Do not send an email with menu response</el-radio>
                    </span>
                </el-col>
            </el-row>

            <el-row class="mb-10-px">
                <el-col :span="5" class="text-right fw-b mt-7-px">
                    <span>Account Threshold:</span>
                </el-col>
                <el-col :span="12" class="text-left ml-20-px">
                    <span>
                        <el-radio v-model="userSetting.notifyCreditLimit" :label="true" border>Send an email when approaching credit limit</el-radio>
                        <el-radio v-model="userSetting.notifyCreditLimit" :label="false" class="mt-10-px ml-0-px-i" border>Do not send an email when approaching credit limit</el-radio>
                    </span>
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
    private userSetting: IUserSettingData = defaultUserSettingData

    created() {
      this.userSetting = {
        id: 1,
        userId: this.userId,
        notifyCampaign: true,
        notifyCreditLimit: false,
        notifyMenu: false,
        notifyWorkflow: false,
        timeZone: 'UTC'
      }
    }
}
</script>
