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
        width="140"
        class-name="fixed-width"
      >
        <template slot-scope="{row}">
          <router-link :to="{name: 'CampaignView', params: {id: row.id}}">
            <el-button
              icon="el-icon-view"
              class="mr-3-px"
              circle
            >
            </el-button>
          </router-link>
          <router-link :to="{name: 'CampaignEdit', params: {id: row.id}}">
            <el-button
              icon="el-icon-edit-outline"
              class="mr-3-px"
              circle
            >
            </el-button>
          </router-link>
          <el-button
            v-if="row.status!=='deleted'"
            icon="el-icon-delete"
            class="mr-3-px"
            @click="handleActivation(row)"
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
      @clearFilter="clearFilter"
    />
  </div>
</template>

<script lang="ts">
import { Component, Mixins } from 'vue-property-decorator'
import { getCampaigns, updateCampaign } from '@/api/campaigns'
import CampaignTableFilters from './components/CampaignTableFilters.vue'
import { ICampaignData } from '@/api/types'
import TableMixin from '@/views/mixins/TableMixin'
import { isEmpty } from 'lodash'

@Component({
  name: 'CampaignTable',
  components: {
    CampaignTableFilters
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
    if (!isEmpty(data)) {
      this.filterIcon = 'filter-clear'
      this.listQuery.filters = data
      this.getList()
    }
  }

  private clearFilter() {
    this.listQuery.filters = ''
    this.filterIcon = 'filter-solid'
    this.getList()
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

  private async handleActivation(row: any) {
    this.$confirm('Are you sure?', 'Warning', {
      confirmButtonText: 'OK',
      cancelButtonText: 'Cancel',
      type: 'warning'
    }).then(() => {
      this.updateStatus(row)
    }).catch((err) => {
      console.log(err)
      this.$message({
        type: 'info',
        message: 'Campaign not updated'
      })
    })
  }

  private async updateStatus(row: any) {
    const status = row.status === 'active' ? 'inactive' : 'active'
    const archivedAt = row.status === 'active' ? new Date() : ''
    await updateCampaign(row.id, { status: status, archived_at: archivedAt })
    this.$message({
      type: 'success',
      message: 'Campaign updated'
    })
    this.getList()
  }
}
</script>
