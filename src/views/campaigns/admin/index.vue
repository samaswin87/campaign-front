<template>
  <div class="app-container">
    <div class="filter-container">
      <router-link :to="{name: 'CampaignCreate'}">
        <el-button
          class="filter-item"
          style="margin-left: 10px;"
          type="primary"
          icon="el-icon-circle-plus-outline"
        >
          {{ $t('table.add') }}
        </el-button>
      </router-link>
      <el-button
        class="filter-item"
        style="margin-left: 10px;"
        type="primary"
        icon="el-icon-download"
      >
        {{ $t('table.export') }}
      </el-button>
      <el-button
        class="filter-item"
        style="margin-left: 10px;"
        type="primary"
        icon="el-icon-upload"
      >
        {{ $t('table.import') }}
      </el-button>
      <div class="float-right">
        <el-input
          v-model="listQuery.title"
          :placeholder="$t('table.search')"
          style="width: 300px;"
          class="filter-item"
          @keyup.enter.native="handleFilter"
        />

        <el-button
          v-waves
          class="filter-item"
          type="primary"
          icon="el-icon-search"
          @click="handleSearch"
        >
        </el-button>

        <el-button
          v-waves
          type="primary"
          class="filter-item"
          circle
          @click="handleFilter"
          >
          <svg-icon name="filter-solid" />
        </el-button>
      </div>
    </div>

    <el-table
      ref="campaignTable"
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
        :label="$t('table.name')"
        min-width="150px"
      >
        <template slot-scope="{row}">
          <span
          >{{ row.name }}</span>
        </template>
      </el-table-column>
      <el-table-column
        :label="$t('table.type')"
        min-width="150px"
      >
        <template slot-scope="{row}">
          <el-tag effect="dark" :type="row.type | campaignTypeFilter">
            {{ row.type }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column
        :label="$t('table.company')"
        min-width="150px"
      >
        <template slot-scope="{row}">
          <span
          >{{ row.company }}</span>
        </template>
      </el-table-column>
      <el-table-column
        :label="$t('table.phone')"
        min-width="150px"
      >
        <template slot-scope="{row}">
          <span
          >{{ row.phone }}</span>
        </template>
      </el-table-column>
      <el-table-column
        :label="$t('table.campaign.scheduledOn')"
        min-width="150px"
      >
        <template slot-scope="{row}">
          <span
          >{{ row.scheduledOn | parseTime }}</span>
        </template>
      </el-table-column>
      <el-table-column
        :label="$t('table.createdOn')"
        min-width="150px"
      >
        <template slot-scope="{row}">
          <span
          >{{ row.createdOn | parseDate }}</span>
        </template>
      </el-table-column>
      <el-table-column
        :label="$t('table.status')"
        min-width="150px"
      >
        <template slot-scope="{row}">
          <el-tag effect="dark" :type="row.status | statusFilter">
            {{ row.status }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column
        :label="$t('table.actions')"
        align="center"
        width="230"
        class-name="fixed-width"
      >
        <template slot-scope="{row, $index}">
          <router-link :to="{name: 'CampaignView', params: {id: row.id}}">
            <el-button
              icon="el-icon-view"
              circle
            >
            </el-button>
          </router-link>
          <router-link :to="{name: 'CampaignEdit', params: {id: row.id}}">
            <el-button
              icon="el-icon-edit-outline"
              circle
            >
            </el-button>
          </router-link>
          <el-button
            v-if="row.status!=='deleted'"
            icon="el-icon-delete"
            @click="handleDelete(row, $index)"
            circle
          >
          </el-button>
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

    <CampaignTableFilters
      :visible.sync="filterLoading"
      @campaignFiltered="campaignFiltered"
    />
  </div>
</template>

<script lang="ts">
import { Component, Vue, Ref } from 'vue-property-decorator'
import { getCampaigns, defaultCampaignData } from '@/api/campaigns'
import CampaignTableFilters from './components/CampaignTableFilters.vue'
import { ICampaignData } from '@/api/types'
import Pagination from '@/components/Pagination/index.vue'

@Component({
  name: 'CampaignTable',
  components: {
    Pagination,
    CampaignTableFilters
  }
})

export default class extends Vue {
  @Ref('campaignTable') readonly campaignTable!: any;
  private tableKey = 0
  private list: ICampaignData[] = []
  private total = 0
  private listLoading = true
  private filterLoading = false
  private dialogLoading = false
  private listQuery = {
    page: 1,
    limit: 20,
    sort: '+id'
  }

  private statusOptions = ['active', 'inactive']
  private showReviewer = false
  private dialogFormVisible = false
  private dialogStatus = ''
  private campaignRow = defaultCampaignData
  private textMap = {
    update: 'Edit',
    create: 'Create'
  }

  private dialogPageviewsVisible = false
  private pageviewsData = []

  private downloadLoading = false
  private tempCampaignData = defaultCampaignData

  created() {
    this.getList()
  }

  private campaignFiltered(data: any) {
    console.log(data)
  }

  private dialogVisiblity() {
    return this.filterLoading
  }

  private viewCampaign(row: any) {
    this.campaignRow = Object.assign({}, row)
    this.dialogLoading = true
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
    this.filterLoading = true
  }

  private handleSearch() {
    this.filterLoading = true
  }

  private handleModifyStatus(row: any, status: string) {
    this.$message({
      message: '操作成功',
      type: 'success'
    })
    row.status = status
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

  private handleDelete(row: any, index: number) {
    this.$confirm('Are you sure?', 'Warning', {
      confirmButtonText: 'OK',
      cancelButtonText: 'Cancel',
      type: 'warning'
    }).then(() => {
      this.list.splice(index, 1)
      this.$message({
        type: 'success',
        message: 'Delete completed'
      })
    }).catch(() => {
      this.$message({
        type: 'info',
        message: 'Delete canceled'
      })
    })
  }
}
</script>

<style lang="scss" scoped>
.float-right {
  float: right;
}

.tags {
  margin-left: 3px;
  margin-bottom: 3px;
}
</style>
