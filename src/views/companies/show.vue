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
                                <el-tab-pane label="Details">
                                    <company-details/>
                                </el-tab-pane>
                                <el-tab-pane label="Current Credits">
                                    <credits/>
                                </el-tab-pane>
                                <el-tab-pane label="Credits History">
                                    <credits-history/>
                                </el-tab-pane>
                                <el-tab-pane label="Platform Numbers">Platform Numbers</el-tab-pane>
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

@Component({
  name: 'CompanyShow',
  components: {
    Credits,
    CreditsHistory,
    CompanyDetails
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
