<template>
  <div class="app-container">
    <el-table
      :key="tableKey"
      v-loading="listLoading"
      :data="list"
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
        <template slot-scope="{row}">
          <span>{{ row.id }}</span>
        </template>
      </el-table-column>
      <el-table-column
        :label="$t('table.createdOn')"
        width="180px"
        align="center"
      >
        <template slot-scope="{row}">
          <span>{{ row.createdOn | parseDate }}</span>
        </template>
      </el-table-column>
      <el-table-column
        :label="$t('table.name')"
        min-width="150px"
      >
        <template slot-scope="{row}">
          <span
            class="link-type"
          >{{ row.name }}</span>
        </template>
      </el-table-column>
      <el-table-column
        :label="$t('table.company')"
        width="180px"
        align="center"
      >
        <template slot-scope="{row}">
          <span>{{ row.company }}</span>
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
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { getCampaigns } from '@/api/campaigns'
import { ICampaignData } from '@/api/types'
import Pagination from '@/components/Pagination/index.vue'

@Component({
  name: 'CampaignTable',
  components: {
    Pagination
  }
})
export default class extends Vue {
  private list: ICampaignData[] = []
  private tableKey = 0
  private total = 0
  private listLoading = true
  private listQuery = {
    page: 1,
    limit: 20,
    title: undefined,
    type: undefined,
    sort: '+id'
  }

  created() {
    this.getList()
  }

  private async getList() {
    this.listLoading = true
    const { data } = await getCampaigns(this.listQuery)
    this.list = data.items
    this.total = data.total
    // Just to simulate the time of the request
    setTimeout(() => {
      this.listLoading = false
    }, 0.5 * 1000)
  }

  private handleFilter() {
    this.listQuery.page = 1
    this.getList()
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
    this.handleFilter()
  }

  private getSortClass(key: string) {
    const sort = this.listQuery.sort
    return sort === `+${key}` ? 'ascending' : 'descending'
  }
}
</script>
