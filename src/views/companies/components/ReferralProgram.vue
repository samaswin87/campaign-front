<template>
    <el-card class="box-card w-ratio-70">
        <div slot="header" class="clearfix">
            <span>Referrals</span>
        </div>
        <div class="company-details">
            <el-form
            ref="referralForm"
            :model="companyReferralData"
            class="form-container"
            >
                <el-row class="mb-10-px">
                    <el-col :span="10" class="text-right mt-10-px fw-b">
                        <label>{{$t('table.name')}}:</label>
                    </el-col>
                    <el-col :span="5" class="text-left ml-20-px">
                        <span>
                            <el-input
                            placeholder="Please add name"
                            v-model="companyReferralData.name"
                            clearable>
                            </el-input>
                        </span>
                    </el-col>
                </el-row>

                <el-row class="mb-10-px">
                    <el-col :span="10" class="text-right mt-10-px fw-b">
                        <span>{{$t('table.phone')}}:</span>
                    </el-col>
                    <el-col :span="5" class="text-left ml-20-px">
                        <span>
                            <el-input
                            placeholder="Please add phone"
                            v-model="companyReferralData.phone"
                            clearable>
                            </el-input>
                        </span>
                    </el-col>
                </el-row>

                <el-row class="mb-10-px">
                    <el-col :span="10" class="text-right mt-10-px fw-b">
                        <span>{{$t('table.email')}}:</span>
                    </el-col>
                    <el-col :span="5" class="text-left ml-20-px">
                        <span>
                            <el-input
                            placeholder="Please add email"
                            v-model="companyReferralData.email"
                            clearable>
                            </el-input>
                        </span>
                    </el-col>
                </el-row>

                 <el-row class="mb-10-px">
                    <el-col :span="10" class="text-right mt-10-px fw-b">
                        <span>Conatct Person:</span>
                    </el-col>
                    <el-col :span="5" class="text-left ml-20-px">
                        <span>
                            <el-input
                            placeholder="Please add person name"
                            v-model="companyReferralData.conatctPerson"
                            clearable>
                            </el-input>
                        </span>
                    </el-col>
                </el-row>

                <el-row class="mb-10-px">
                    <el-col :span="10" class="text-right mt-10-px fw-b">
                        <span>Description:</span>
                    </el-col>
                    <el-col :span="5" class="text-left ml-20-px">
                        <span>
                            <el-input
                            placeholder="Please add description"
                            v-model="companyReferralData.description"
                            clearable>
                            </el-input>
                        </span>
                    </el-col>
                </el-row>

                <el-row class="mb-10-px">
                    <el-col :span="16">
                        <el-button class="float-right ml-10-px mr-20-px" type="primary">Submit</el-button>
                        <el-button class="float-right">Cancel</el-button>
                    </el-col>
                </el-row>
            </el-form>

            <el-card class="box-card">
                <div slot="header" class="clearfix">
                    <span>Referral History</span>
                </div>
                <div class="history">
                </div>
            </el-card>
        </div>
    </el-card>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { getReferrals, defaultCompanyReferralsData } from '@/api/companies'
import { ICompanyReferralsData } from '@/api/types'

@Component({
  name: 'ReferralProgram',
  components: {
  }
})
export default class extends Vue {
    private companyReferralData = defaultCompanyReferralsData
    private tableKey = 0
    private list: ICompanyReferralsData[] = []
    private total = 0
    private listLoading = true
    private listQuery = {
      page: 1,
      limit: 20,
      sort: '+id'
    }

    created() {
      const id = this.$route.params && this.$route.params.id
      this.fetchData(parseInt(id))
    }

    private async fetchData(id: number) {
      try {
        this.listLoading = true
        const { data } = await getReferrals(id, this.listQuery)
        this.list = data.items
        this.total = data.total
        // Just to simulate the time of the request
        setTimeout(() => {
          this.listLoading = false
        }, 0.5 * 1000)
      } catch (err) {
        console.error(err)
      }
    }

    private sortChange(data: any) {
      const { prop, order } = data
      if (prop === 'id') {
        this.sortByID(order)
      }
    }

    private sortByID(order: string) {
      if (order === 'ascending') {
        this.listQuery.sort = '+id'
      } else {
        this.listQuery.sort = '-id'
      }
    }

    private getSortClass(key: string) {
      const sort = this.listQuery.sort
      return sort === `+${key}` ? 'ascending' : 'descending'
    }
}
</script>
