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
                            <el-tabs tab-position="left" class="details-header">
                                <el-tab-pane label="Details">
                                    <Details/>
                                </el-tab-pane>
                                <el-tab-pane label="Current Credits">
                                    <Credits/>
                                </el-tab-pane>
                                <el-tab-pane label="Credits History">Credits History</el-tab-pane>
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
import Details from './components/Details.vue'
import Credits from './components/Credits.vue'

@Component({
  name: 'CompanyCreate',
  components: {
    Details,
    Credits
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
