<template>
  <div class="app-container">
    <div class="filter-container">
      <el-row>
        <el-col :span="16">
          <TableDefaultActions
            :createRoute="createRoute"
            :importRoute="importRoute"
          />
        </el-col>
        <el-col :span="8" class="float-right">
          <TableSearchWithFilters
            :filterIcon.sync="filterIcon"
            @handleFilter="handleFilter"
            @handleSearchFilter="handleSearchFilter" />
        </el-col>
      </el-row>
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
    >
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
        min-width="80px"
      >
        <template slot-scope="{row}">
          <el-tag effect="dark" :type="row.group | campaignTypeFilter">
            {{ row.group }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column
        :label="$t('table.company')"
        min-width="230px"
      >
        <template slot-scope="{row}">
          <span
          >{{ row.company_name }}</span>
        </template>
      </el-table-column>
      <el-table-column
        :label="$t('table.phone')"
        min-width="110px"
      >
        <template slot-scope="{row}">
          <span
          >{{ row.operator }}</span>
        </template>
      </el-table-column>
      <el-table-column
        :label="$t('table.campaign.scheduledOn')"
        min-width="120px"
      >
        <template slot-scope="{row}">
          <span
          >{{ row.scheduled_at | parseTime }}</span>
        </template>
      </el-table-column>
      <el-table-column
        :label="$t('table.createdOn')"
        min-width="80px"
      >
        <template slot-scope="{row}">
          <span
          >{{ row.created_on | parseDate }}</span>
        </template>
      </el-table-column>
      <el-table-column
        :label="$t('table.status')"
        min-width="60px"
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
        width="130"
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
import { Component, Mixins } from 'vue-property-decorator'
import { getCampaigns } from '@/api/campaigns'
import CampaignTableFilters from './components/CampaignTableFilters.vue'
import { ICampaignData } from '@/api/types'
import Pagination from '@/components/Pagination/index.vue'
import TableDefaultActions from '@/components/common/TableDefaultActions.vue'
import TableSearchWithFilters from '@/components/common/TableSearchWithFilters.vue'
import TableMixin from '@/views/mixins/TableMixin'
import { isEmpty } from 'lodash'

@Component({
  name: 'CampaignTable',
  components: {
    Pagination,
    CampaignTableFilters,
    TableDefaultActions,
    TableSearchWithFilters
  }
})
export default class Campaign extends Mixins(TableMixin) {
  private list: ICampaignData[] = []
  private dialogLoading = false
  private createRoute = 'CampaignCreate'
  private importRoute = 'UploadCampaigns'

  created() {
    this.getList()
  }

  private campaignFiltered(data: any) {
    console.log(data)
  }

  private async getList() {
    this.listLoading = true
    const { data, headers } = await getCampaigns(this.listQuery)
    this.list = data
    this.total = parseInt(headers.count)
    this.listLoading = false
  }

  private handleFilter() {
    this.filterLoading = true
  }

  private async handleSearchFilter(searchData: string) {
    if (!isEmpty(searchData)) {
      this.listLoading = true
      this.listQuery.searchparam = searchData
      const { data, headers } = await getCampaigns(this.listQuery)
      this.list = data
      this.total = parseInt(headers.count)
      this.listLoading = false
    } else {
      this.listQuery.searchparam = ''
      this.getList()
    }
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
