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
                                    <el-card class="box-card w-ratio-70">
                                        <div slot="header" class="clearfix">
                                            <span>Details</span>
                                        </div>
                                        <div class="company-details">
                                            <el-row class="mb-10-px">
                                                <el-col :span="10" class="text-right fw-b">
                                                    <span>{{$t('table.name')}}:</span>
                                                </el-col>
                                                <el-col :span="12" class="text-left ml-20-px">
                                                    <span>{{companyData.name}}</span>
                                                </el-col>
                                            </el-row>

                                            <el-row class="mb-10-px">
                                                <el-col :span="10" class="text-right fw-b">
                                                    <span>{{$t('table.phone')}}:</span>
                                                </el-col>
                                                <el-col :span="12" class="text-left ml-20-px">
                                                    <span>{{companyData.phone}}</span>
                                                </el-col>
                                            </el-row>

                                            <el-row class="mb-10-px">
                                                <el-col :span="10" class="text-right fw-b">
                                                    <span>{{$t('table.email')}}:</span>
                                                </el-col>
                                                <el-col :span="12" class="text-left ml-20-px">
                                                    <span>{{companyData.email}}</span>
                                                </el-col>
                                            </el-row>

                                            <el-row class="mb-10-px">
                                                <el-col :span="10" class="text-right fw-b">
                                                    <span>{{$t('table.companies.plan')}}:</span>
                                                </el-col>
                                                <el-col :span="12" class="text-left ml-20-px">
                                                    <span>
                                                        <el-tag
                                                        :type="planFilter"
                                                        effect="dark">
                                                            {{companyData.plan}}
                                                        </el-tag>
                                                    </span>
                                                </el-col>
                                            </el-row>

                                            <el-row class="mb-10-px">
                                                <el-col :span="10" class="text-right fw-b">
                                                    <span>{{$t('table.companies.messageForward')}}:</span>
                                                </el-col>
                                                <el-col :span="12" class="text-left ml-20-px">
                                                    <span>{{companyData.messageForward}}</span>
                                                </el-col>
                                            </el-row>
                                        </div>
                                    </el-card>
                                </el-tab-pane>
                                <el-tab-pane label="Plan & Credits">Plan & Credits</el-tab-pane>
                                <el-tab-pane label="Available Credits">Available Credits</el-tab-pane>
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

@Component({
  name: 'CompanyCreate',
  components: {
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

<style lang="scss" scoped>

.details-header {
    height:600px
}
</style>
