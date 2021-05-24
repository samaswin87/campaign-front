<template>
    <el-row>
        <el-col :span="12">
            <el-card class="box-card">
                <div slot="header" class="clearfix">
                    <span>Current Credits</span>
                </div>
                <div class="company-details">
                    <el-row class="mb-10-px">
                        <el-col :span="10" class="text-right fw-b">
                            <span>{{$t('table.companies.month')}}:</span>
                        </el-col>
                        <el-col :span="12" class="text-left ml-20-px">
                            <span>{{planCurrentCredit.month}}</span>
                        </el-col>
                    </el-row>

                    <el-row class="mb-10-px">
                        <el-col :span="10" class="text-right fw-b mt-5-px">
                            <span>{{$t('table.companies.totalCredits')}}:</span>
                        </el-col>
                        <el-col :span="12" class="text-left ml-20-px">
                            <span>
                                <el-tag type="primary" effect="plain">{{companyData.totalCredits}}</el-tag>
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

                    <el-row class="mb-10-px">
                        <el-col :span="10" class="text-right fw-b">
                            <span>{{$t('table.companies.usedPercentage')}}:</span>
                        </el-col>
                        <el-col :span="12" class="text-left ml-20-px">
                            <span>{{companyData.usedPercentage}} %</span>
                        </el-col>
                    </el-row>

                    <el-divider class="my-30-px divider-text-color"> Monthly Plan </el-divider>
                    <el-row class="mb-10-px">
                        <el-col :span="10" class="text-right fw-b mt-5-px">
                            <span>{{$t('table.companies.planCredit')}}:</span>
                        </el-col>
                        <el-col :span="12" class="text-left ml-20-px">
                            <span>
                                <el-tag type="primary" effect="plain">{{companyData.planCredit}}</el-tag>
                            </span>
                        </el-col>
                    </el-row>
                    <el-row class="mb-10-px">
                        <el-col :span="10" class="text-right fw-b mt-5-px">
                            <span>{{$t('table.companies.remainingPlanCredit')}}:</span>
                        </el-col>
                        <el-col :span="12" class="text-left ml-20-px">
                            <span>
                                <el-tag type="danger" effect="plain">{{planCurrentCredit.credits}}</el-tag>
                            </span>
                        </el-col>
                    </el-row>
                    <el-row class="mb-10-px">
                        <el-col :span="10" class="text-right fw-b mt-7-px">
                            <span>{{$t('table.companies.additionalCredits')}}:</span>
                        </el-col>
                        <el-col :span="12" class="text-left ml-20-px">
                            <span>
                                <el-input-number
                                    v-model="planCurrentCredit.additionalCredits"
                                    controls-position="right"
                                    :step="100">
                                </el-input-number>
                                <el-tooltip class="item" effect="dark" content="Will notify the updated credits to admin and admin will contact you to reflect in the additional credits" placement="top">
                                    <el-button  class="ml-5-px" circle>
                                        <svg-icon name="upgrade"></svg-icon>
                                    </el-button>
                                </el-tooltip>
                            </span>
                        </el-col>
                    </el-row>

                </div>
            </el-card>
        </el-col>
        <el-col :span="12">
            <el-card class="box-card">
                <el-divider class="my-30-px divider-text-color"> Plan Details </el-divider>
                <el-row class="mb-10-px">
                    <el-col :span="10" class="text-right fw-b mt-5-px">
                        <span>{{$t('table.companies.inbounds')}}:</span>
                    </el-col>
                    <el-col :span="12" class="text-left ml-20-px">
                        <span>
                            <el-tag type="primary" effect="plain">{{planCurrentCredit.inbounds}}</el-tag>
                        </span>
                    </el-col>
                </el-row>

                <el-row class="mb-10-px">
                    <el-col :span="10" class="text-right fw-b mt-5-px">
                        <span>{{$t('table.companies.outbounds')}}:</span>
                    </el-col>
                    <el-col :span="12" class="text-left ml-20-px">
                        <span>
                            <el-tag type="primary" effect="plain">{{planCurrentCredit.outbounds}}</el-tag>
                        </span>
                    </el-col>
                </el-row>

                <el-row class="mb-10-px">
                    <el-col :span="10" class="text-right fw-b mt-5-px">
                        <span>{{$t('table.companies.voiceInbounds')}}:</span>
                    </el-col>
                    <el-col :span="12" class="text-left ml-20-px">
                        <span>
                            <el-tag type="primary" effect="plain">{{planCurrentCredit.voiceInbounds}}</el-tag>
                        </span>
                    </el-col>
                </el-row>

                <el-row class="mb-10-px">
                    <el-col :span="10" class="text-right fw-b mt-5-px">
                        <span>{{$t('table.companies.voiceOutbounds')}}:</span>
                    </el-col>
                    <el-col :span="12" class="text-left ml-20-px">
                        <span>
                            <el-tag type="primary" effect="plain">{{planCurrentCredit.voiceOutbounds}}</el-tag>
                        </span>
                    </el-col>
                </el-row>

                <el-divider class="my-30-px divider-text-color"> Plan Usage Availability </el-divider>
                <el-row class="mb-10-px">
                    <el-col :span="10" class="text-right fw-b mt-5-px">
                        <span>{{$t('table.companies.availedInbounds')}}:</span>
                    </el-col>
                    <el-col :span="12" class="text-left ml-20-px">
                        <span>
                            <el-tag type="danger" effect="plain">{{planCurrentCredit.availedInbounds}}</el-tag>
                        </span>
                    </el-col>
                </el-row>

                <el-row class="mb-10-px">
                    <el-col :span="10" class="text-right fw-b mt-5-px">
                        <span>{{$t('table.companies.availedOutbounds')}}:</span>
                    </el-col>
                    <el-col :span="12" class="text-left ml-20-px">
                        <span>
                            <el-tag type="danger" effect="plain">{{planCurrentCredit.availedOutbounds}}</el-tag>
                        </span>
                    </el-col>
                </el-row>

                <el-row class="mb-10-px">
                    <el-col :span="10" class="text-right fw-b mt-5-px">
                        <span>{{$t('table.companies.availedVoiceInbounds')}}:</span>
                    </el-col>
                    <el-col :span="12" class="text-left ml-20-px">
                        <span>
                            <el-tag type="danger" effect="plain">{{planCurrentCredit.availedVoiceInbounds}}</el-tag>
                        </span>
                    </el-col>
                </el-row>

                <el-row class="mb-10-px">
                    <el-col :span="10" class="text-right fw-b mt-5-px">
                        <span>{{$t('table.companies.availedVoiceOutbounds')}}:</span>
                    </el-col>
                    <el-col :span="12" class="text-left ml-20-px">
                        <span>
                            <el-tag type="danger" effect="plain">{{planCurrentCredit.availedVoiceOutbounds}}</el-tag>
                        </span>
                    </el-col>
                </el-row>
            </el-card>
        </el-col>
    </el-row>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { defaultCompanyData, getCompany, defaultPlanCreditData } from '@/api/companies'
import { IPlanCredits } from '@/api/types'

@Component({
  name: 'Credits',
  components: {
  }
})
export default class extends Vue {
    private companyData = defaultCompanyData
    private planCurrentCredit :IPlanCredits = defaultPlanCreditData
    private currentMonth = ''

    created() {
      const id = this.$route.params && this.$route.params.id
      this.getMonth()
      this.fetchData(parseInt(id))
    }

    private getMonth() {
      const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
      const date = new Date()
      this.currentMonth = monthNames[date.getMonth()] + '-' + date.getFullYear()
    }

    private async fetchData(id: number) {
      try {
        const { data } = await getCompany(id, {})
        this.companyData = data.company
        const planCredits = data.company.planCredits.filter((value: IPlanCredits) => (value.month === this.currentMonth))
        this.planCurrentCredit = (planCredits.length === 0) ? data.company.planCredits[0] : planCredits[0] // Need to fix in real time.
      } catch (err) {
        console.error(err)
      }
    }
}
</script>
