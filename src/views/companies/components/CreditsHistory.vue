<template>
    <el-card class="box-card">
        <div slot="header" class="clearfix">
            <span>Credits History</span>
        </div>
        <div class="company-details">
            <el-table
                ref="contactTable"
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
                :label="$t('table.companies.month')"
                min-width="150px"
                >
                <template slot-scope="{row}">
                    <span
                    >{{ row.month }}</span>
                </template>
                </el-table-column>
                <el-table-column
                :label="$t('table.companies.additionalCredits')"
                min-width="150px"
                >
                <template slot-scope="{row}">
                    <span
                    >{{ row.additionalCredits }}</span>
                </template>
                </el-table-column>
                <el-table-column
                :label="$t('table.companies.inbounds')"
                min-width="150px"
                >
                <template slot-scope="{row}">
                    <span
                    >{{ row.inbounds }}</span>
                </template>
                </el-table-column>
                <el-table-column
                :label="$t('table.companies.outbounds')"
                min-width="150px"
                >
                <template slot-scope="{row}">
                    <span
                    >{{ row.outbounds }}</span>
                </template>
                </el-table-column>
                <el-table-column
                :label="$t('table.companies.voiceInbounds')"
                min-width="150px"
                >
                <template slot-scope="{row}">
                    <span
                    >{{ row.voiceInbounds }}</span>
                </template>
                </el-table-column>
                <el-table-column
                :label="$t('table.companies.voiceOutbounds')"
                min-width="150px"
                >
                <template slot-scope="{row}">
                    <span
                    >{{ row.voiceOutbounds }}</span>
                </template>
                </el-table-column>
            </el-table>
            <pagination
            v-show="total>0"
            :total="total"
            :page.sync="listQuery.page"
            :limit.sync="listQuery.limit"
            @pagination="getList"
            />
        </div>
    </el-card>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { defaultCompanyData, getCompany, getCredits } from '@/api/companies'
import { IPlanCredits } from '@/api/types'
import Pagination from '@/components/Pagination/index.vue'

@Component({
  name: 'CreditsHistory',
  components: {
    Pagination
  }
})
export default class extends Vue {
    private companyData = defaultCompanyData
    private currentMonth = ''
    private tableKey = 0
    private list: IPlanCredits[] = []
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
        const { data } = await getCompany(id, {})
        this.companyData = data.company
        this.getList()
      } catch (err) {
        console.error(err)
      }
    }

    private async getList() {
      try {
        this.listLoading = true
        const { data } = await getCredits(this.companyData.id, this.listQuery)
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
