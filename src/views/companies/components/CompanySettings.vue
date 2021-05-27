<template>
    <el-row>
        <el-col :span="24">
          <el-tabs tab-position="top" class="details-header" type="border-card">
            <el-tab-pane label="Settings">
              <company-common-settings />
            </el-tab-pane>
            <el-tab-pane label="Message">
              <company-message-settings/>
            </el-tab-pane>
            <el-tab-pane label="SSO">
              <company-sso-settings/>
            </el-tab-pane>
            <el-tab-pane label="Notification">
              <company-notify-settings/>
            </el-tab-pane>
            <el-tab-pane label="Plan">Plan</el-tab-pane>
            <el-tab-pane label="TimeZone">TimeZone</el-tab-pane>
          </el-tabs>
        </el-col>
    </el-row>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { defaultCompanySettingData, getCompany } from '@/api/companies'
import CompanyCommonSettings from './CompanyCommonSettings.vue'
import CompanyMessageSettings from './CompanyMessageSettings.vue'
import CompanySsoSettings from './CompanySsoSettings.vue'
import CompanyNotifySettings from './CompanyNotifySettings.vue'

@Component({
  name: 'CompanySettings',
  components: {
    CompanyCommonSettings,
    CompanyMessageSettings,
    CompanySsoSettings,
    CompanyNotifySettings
  }
})
export default class extends Vue {
    private companySettingData = defaultCompanySettingData

    created() {
      const id = this.$route.params && this.$route.params.id
      this.fetchData(parseInt(id))
    }

    private async fetchData(id: number) {
      try {
        const { data } = await getCompany(id, {})
        this.companySettingData = data.companySetting
      } catch (err) {
        console.error(err)
      }
    }
}
</script>
