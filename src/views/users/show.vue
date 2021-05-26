<template>
    <div class="app-container">
        <div class="company-container">
            <el-row>
                <el-card class="box-card">
                    <div slot="header" class="clearfix">
                        <span>Show User</span>
                    </div>
                    <el-row>
                        <el-col :span="24">
                            <el-tabs tab-position="left" class="details-header" type="border-card">
                                <el-tab-pane>
                                    <span slot="label"><i class="el-icon-info"></i> Details</span>
                                    <user-details
                                    :user="userData"
                                    :company="companyData"
                                    />
                                </el-tab-pane>
                                <el-tab-pane>
                                    <span slot="label"><svg-icon name="settings"></svg-icon> Settings</span>
                                    <user-settings
                                    :userId="userData.id"
                                    />
                                </el-tab-pane>
                                <el-tab-pane>
                                    <span slot="label"><svg-icon name="access"></svg-icon> Access Rights</span>
                                    <access-rights
                                    :userId="userData.id"
                                    />
                                </el-tab-pane>
                                <el-tab-pane>
                                    <span slot="label"><svg-icon name="password"></svg-icon> Change Password</span>
                                    <update-password
                                    :userId="userData.id"
                                    />
                                </el-tab-pane>
                                <el-tab-pane>
                                    <span slot="label"><svg-icon name="reset"></svg-icon> Reset Password</span>
                                    <reset-password
                                    :userId="userData.id"
                                    />
                                </el-tab-pane>
                            </el-tabs>
                        </el-col>
                    </el-row>
                </el-card>
            </el-row>
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { defaultCompanyData, getCompany } from '@/api/companies'
import { getUser, defaultUserData } from '@/api/users'
import UserDetails from './components/UserDetails.vue'
import UserSettings from './components/UserSettings.vue'
import AccessRights from './components/AccessRights.vue'
import UpdatePassword from './components/UpdatePassword.vue'
import ResetPassword from './components/ResetPassword.vue'

@Component({
  name: 'UserShow',
  components: {
    UserDetails,
    UserSettings,
    AccessRights,
    UpdatePassword,
    ResetPassword
  }
})
export default class extends Vue {
    private companyData = defaultCompanyData
    private userData = defaultUserData

    created() {
      const companyId = this.$route.params && this.$route.params.companyId
      const id = this.$route.params && this.$route.params.id
      this.fetchCompany(parseInt(companyId))
      this.fetchUser(parseInt(id))
    }

    private async fetchCompany(id: number) {
      try {
        const { data } = await getCompany(id, {})
        this.companyData = data.company
      } catch (err) {
        console.error(err)
      }
    }

    private async fetchUser(id: number) {
      try {
        const { data } = await getUser(id, {})
        this.userData = data.user
      } catch (err) {
        console.error(err)
      }
    }
}
</script>
