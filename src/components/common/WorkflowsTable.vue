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
        width="110px"
        align="center"
      >
        <template slot-scope="{row}">
          <span>{{ row.created_on }}</span>
        </template>
      </el-table-column>
      <el-table-column
        :label="$t('table.keyword')"
        min-width="100px"
      >
        <template slot-scope="{row}">
          <span
            class="link-type"
          >{{ row.keyword }}</span>
        </template>
      </el-table-column>
      <el-table-column
        :label="$t('table.noOfContacts')"
        min-width="150px"
        v-if="!dashboard"
      >
        <template slot-scope="{row}">
          <span
            class="link-type"
          >{{ row.noOfContacts }}</span>
        </template>
      </el-table-column>
      <el-table-column
        :label="$t('table.company')"
        width="280px"
        align="center"
      >
        <template slot-scope="{row}">
          <span>{{ row.company_name }}</span>
        </template>
      </el-table-column>
      <el-table-column
        :label="$t('table.status')"
        min-width="110px"
      >
        <template slot-scope="{row}">
          <el-tag effect="dark" :type="row.status | statusFilter">
            {{ row.status | uppercaseFirstChar }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column
        :label="$t('table.actions')"
        align="center"
        class-name="fixed-width"
        v-if="action"
      >
        <el-tooltip class="item" effect="dark" content="Add to Menu Promt" placement="left">
          <el-button
            icon="el-icon-circle-plus-outline"
            type="primary"
            circle
          >
          </el-button>
        </el-tooltip>
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
import { Component, Vue, Prop } from 'vue-property-decorator'
import { getWorkflows } from '@/api/workflows'
import { IWorkflowData } from '@/api/types'
import Pagination from '@/components/Pagination/index.vue'

@Component({
  name: 'WorkflowTable',
  components: {
    Pagination
  }
})
export default class extends Vue {
  @Prop({ required: true }) private action!: boolean
  @Prop({ required: true }) private dashboard!: boolean
  private list: IWorkflowData[] = []
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
    const { data } = await getWorkflows(this.listQuery)
    this.list = data
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
