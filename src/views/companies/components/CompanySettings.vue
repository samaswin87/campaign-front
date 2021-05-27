<template>
    <el-row>
        <el-col :span="24">
          <el-tabs tab-position="top" class="details-header" type="border-card">
            <el-tab-pane label="Settings">Settings</el-tab-pane>
            <el-tab-pane label="Platfrom">Platform</el-tab-pane>
            <el-tab-pane label="SSO">SSO</el-tab-pane>
            <el-tab-pane label="Notification">Notify</el-tab-pane>
            <el-tab-pane label="Plan">Plan</el-tab-pane>
            <el-tab-pane label="TimeZone">TimeZone</el-tab-pane>
          </el-tabs>
        </el-col>
    </el-row>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { defaultCompanyData, getCompany } from '@/api/companies'

@Component({
  name: 'CompanySettings',
  components: {
  }
})
export default class extends Vue {
    private companyData = defaultCompanyData

    created() {
      const id = this.$route.params && this.$route.params.id
      this.fetchData(parseInt(id))
    }

    private async fetchData(id: number) {
      try {
        const { data } = await getCompany(id, {})
        this.companyData = data.company
      } catch (err) {
        console.error(err)
      }
    }
}
</script>
