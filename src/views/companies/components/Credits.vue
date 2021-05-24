<template>
    <el-card class="box-card w-ratio-70">
        <div slot="header" class="clearfix">
            <span>Current Credits</span>
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
                <el-col :span="10" class="text-right fw-b mt-10-px">
                    <span>{{$t('table.companies.totalCredits')}}:</span>
                </el-col>
                <el-col :span="12" class="text-left ml-20-px">
                    <span>
                        <el-input-number
                            v-model="companyData.totalCredits"
                            controls-position="right"
                            :step="100"
                            step-strictly>
                        </el-input-number>
                        <el-tooltip class="item" effect="dark" content="Will notify the updated credits to admin and admin will contact you to reflect in the credits" placement="top">
                            <el-button  class="ml-5-px" circle>
                                <svg-icon name="upgrade"></svg-icon>
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
