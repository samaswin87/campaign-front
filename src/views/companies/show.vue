<template>
    <div class="app-container">
        <div class="company-container">
            <el-row>
                <el-card class="box-card">
                    <div slot="header" class="clearfix">
                        <span>Show Company</span>
                    </div>
                    <el-row>
                        <el-col :span="24">
                            <el-tabs tab-position="left" class="details-header" type="border-card">
                                <el-tab-pane>
                                    <span slot="label"><i class="el-icon-info"></i> Details</span>
                                    <company-details/>
                                </el-tab-pane>
                                <el-tab-pane>
                                    <span slot="label"><i class="el-icon-odometer"></i> Current Credits</span>
                                    <credits/>
                                </el-tab-pane>
                                <el-tab-pane>
                                    <span slot="label"><i class="el-icon-time"></i> Credits History</span>
                                    <credits-history/>
                                </el-tab-pane>
                                <el-tab-pane>
                                    <span slot="label"><svg-icon name="platform-numbers"></svg-icon> Platform Numbers</span>
                                    <platfom-numbers />
                                </el-tab-pane>
                                <el-tab-pane>
                                    <span slot="label"><svg-icon name="users"></svg-icon> Users</span>
                                    <users />
                                </el-tab-pane>
                                <el-tab-pane>
                                    <span slot="label"><svg-icon name="integrations"></svg-icon> Integrations</span>
                                    <integrations/>
                                </el-tab-pane>
                                <el-tab-pane>
                                    <span slot="label"><svg-icon name="tags"></svg-icon> Tags</span>
                                    <tags/>
                                </el-tab-pane>
                                <el-tab-pane>
                                    <span slot="label"><svg-icon name="settings"></svg-icon> Settings</span>
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
import { IPlanCredits } from '@/api/types'
import Credits from './components/Credits.vue'
import CreditsHistory from './components/CreditsHistory.vue'
import CompanyDetails from './components/Details.vue'
import PlatfomNumbers from './components/PlatfomNumbers.vue'
import Users from './components/Users.vue'
import Integrations from './components/Integrations.vue'
import Tags from './components/Tags.vue'

@Component({
  name: 'CompanyShow',
  components: {
    Credits,
    CreditsHistory,
    CompanyDetails,
    PlatfomNumbers,
    Users,
    Integrations,
    Tags
  }
})
export default class extends Vue {
    private companyData = defaultCompanyData
    private planCredits :IPlanCredits[] = []

    created() {
      const id = this.$route.params && this.$route.params.id
      this.fetchData(parseInt(id))
    }

    private async fetchData(id: number) {
      try {
        const { data } = await getCompany(id, {})
        this.companyData = data.company
        this.planCredits = data.company.planCredits
      } catch (err) {
        console.error(err)
      }
    }
}
</script>
