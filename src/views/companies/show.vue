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
                                                <el-col :span="10" class="text-right fw-b mt-10-px">
                                                    <span>{{$t('table.companies.plan')}}:</span>
                                                </el-col>
                                                <el-col :span="12" class="text-left ml-20-px">
                                                    <span>
                                                        <el-tag
                                                        :type="planFilter(companyData.plan)"
                                                        effect="dark">
                                                            {{companyData.plan}}
                                                        </el-tag>
                                                        <el-tooltip class="item" effect="dark" content="Upgrade Plan" placement="top">
                                                            <el-button class="ml-5-px" circle>
                                                                <svg-icon name="upgrade"></svg-icon>
                                                            </el-button>
                                                        </el-tooltip>
                                                    </span>
                                                </el-col>
                                            </el-row>

                                            <el-row class="mb-10-px">
                                                <el-col :span="10" class="text-right fw-b">
                                                    <span>{{$t('table.companies.messageForward')}}:</span>
                                                </el-col>
                                                <el-col :span="12" class="text-left ml-20-px">
                                                    <span>
                                                        <el-switch v-model="companyData.messageForward"></el-switch>
                                                    </span>
                                                </el-col>
                                            </el-row>

                                            <el-row class="mb-10-px">
                                                <el-col :span="10" class="text-right fw-b">
                                                    <span>{{$t('table.companies.callForwarding')}}:</span>
                                                </el-col>
                                                <el-col :span="12" class="text-left ml-20-px">
                                                    <span>
                                                        <el-switch v-model="companyData.callForwarding"></el-switch>
                                                    </span>
                                                </el-col>
                                            </el-row>

                                            <el-row class="mb-10-px">
                                                <el-col :span="10" class="text-right fw-b mt-7-px">
                                                    <span>{{$t('table.companies.apiToken')}}:</span>
                                                </el-col>
                                                <el-col :span="12" class="text-left ml-20-px">
                                                    <span>
                                                        <el-tag type="danger" effect="plain">{{companyData.apiToken}}</el-tag>
                                                        <el-tooltip class="item" effect="dark" content="Generate Token" placement="top">
                                                            <el-button  class="ml-5-px" icon="el-icon-refresh" circle>
                                                            </el-button>
                                                        </el-tooltip>
                                                    </span>
                                                </el-col>
                                            </el-row>

                                            <el-row class="mb-10-px">
                                                <el-col :span="10" class="text-right fw-b mt-10-px">
                                                    <span>{{$t('table.companies.totalCredits')}}:</span>
                                                </el-col>
                                                <el-col :span="12" class="text-left ml-20-px">
                                                    <span>
                                                        <el-input-number
                                                            v-model="companyData.totalCredits"
                                                            controls-position="right"
                                                            @change="handleChange"
                                                            :step="100"
                                                            step-strictly>
                                                        </el-input-number>
                                                        <el-tooltip class="item" effect="dark" content="Will notify the updated credits to admin and admin will contact you to reflect in the credits" placement="top">
                                                            <el-button  class="ml-5-px" type="primary">
                                                                <svg-icon name="upgrade"></svg-icon> Update Credits
                                                            </el-button>
                                                        </el-tooltip>
                                                    </span>
                                                </el-col>
                                            </el-row>

                                            <el-row class="mb-10-px">
                                                <el-col :span="10" class="text-right fw-b mt-5-px">
                                                    <span>{{$t('table.companies.remainingCredits')}}:</span>
                                                </el-col>
                                                <el-col :span="12" class="text-left ml-20-px">
                                                    <span>
                                                        <el-tag type="danger" effect="plain">{{companyData.remainingCredits}}</el-tag>
                                                    </span>
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

    private handleChange(value: number) {
      console.log(value)
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

    // Filter for status
    private planFilter = (status: string) => {
      const statusMap: { [key: string]: string } = {
        Tentative: 'info',
        Lite: 'success',
        Plus: '',
        Premium: 'warning',
        Ultimate: 'danger'
      }
      return statusMap[status]
    }
}
</script>

<style lang="scss" scoped>

.details-header {
    height:600px
}
</style>
