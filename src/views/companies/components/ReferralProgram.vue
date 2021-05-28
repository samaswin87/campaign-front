<template>
    <el-card class="box-card">
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

            <el-divider>History</el-divider>
            <el-table
            ref="referralTable"
            :key="tableKey"
            v-loading="listLoading"
            :data.sync="list"
            border
            fit
            highlight-current-row
            style="width: 100%;"
            @sort-change="sortChange"
            >
                <el-table-column
                :label="$t('table.id')"
                prop="id"
                sortable="custom"
                align="center"
                width="80"
                :class-name="getSortClass('id')"
                >
                </el-table-column>
                <el-table-column
                :label="$t('table.name')"
                min-width="150px"
                >
                <template slot-scope="{row}">
                    <span
                    >{{ row.name }}</span>
                </template>
                </el-table-column>
                <el-table-column
                :label="$t('table.email')"
                min-width="150px"
                >
                <template slot-scope="{row}">
                    <span
                    >{{ row.email }}</span>
                </template>
                </el-table-column>
                <el-table-column
                label="Contact Person"
                min-width="150px"
                >
                <template slot-scope="{row}">
                    <span
                    >{{ row.contactPerson }}</span>
                </template>
                </el-table-column>
                <el-table-column
                :label="$t('table.phone')"
                min-width="150px"
                >
                <template slot-scope="{row}">
                    <el-tag effect="dark" :type="row.phone | shortcodeFilter">
                    {{ row.phone }}
                    </el-tag>
                </template>
                </el-table-column>
                <el-table-column
                label="Credits"
                min-width="150px"
                >
                <template slot-scope="{row}">
                    <span
                    >{{ row.freeCredits }}</span>
                </template>
                </el-table-column>
                <el-table-column
                :label="$t('table.createdOn')"
                min-width="150px"
                >
                <template slot-scope="{row}">
                    <span
                    >{{ row.createdOn | parseDate}}</span>
                </template>
                </el-table-column>
                <el-table-column
                :label="$t('table.status')"
                min-width="150px"
                >
                <template slot-scope="{row}">
                    <el-tag effect="dark" :type="row.status | statusFilter">
                        {{ row.status | uppercaseFirstChar}}
                    </el-tag>
                </template>
                </el-table-column>
            </el-table>
            <pagination
            v-show="total>0"
            :total="total"
            :page.sync="listQuery.page"
            :limit.sync="listQuery.limit"
            @pagination="fetchData"
            />
        </div>
    </el-card>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { getReferrals, defaultCompanyReferralsData } from '@/api/companies'
import { ICompanyReferralsData } from '@/api/types'
import Pagination from '@/components/Pagination/index.vue'

@Component({
  name: 'ReferralProgram',
  components: {
    Pagination
  }
})
export default class extends Vue {
    private companyReferralData = defaultCompanyReferralsData
    private tableKey = 0
    private list: ICompanyReferralsData[] = []
    private total = 0
    private companyId = 0
    private listLoading = true
    private listQuery = {
      page: 1,
      limit: 20,
      sort: '+id'
    }

    created() {
      const id = this.$route.params && this.$route.params.id
      this.companyId = parseInt(id)
      this.fetchData()
    }

    private async fetchData() {
      try {
        this.listLoading = true
        const { data } = await getReferrals(this.companyId, this.listQuery)
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
