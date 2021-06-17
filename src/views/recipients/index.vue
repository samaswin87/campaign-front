<template>
  <div>
    <div class="filter-container w-90-ratio">
      <el-row>
        <el-col :span="14">
          <TableDefaultActions
            :createRoute="createRoute"
            :createParams="createParams"
            :importRoute="importRoute"
          />
        </el-col>
        <el-col :span="10" class="float-right">
          <TableSearchWithFilters
          :filterIcon.sync="filterIcon"
          @handleFilter="handleFilter"
          @handleSearchFilter="handleSearchFilter" />
        </el-col>
      </el-row>
    </div>

    <el-table
      ref="recipientTable"
      :key="tableKey"
      v-loading="listLoading"
      :data="list"
      border
      fit
      highlight-current-row
      class="w-90-ratio"
    >
      <el-table-column
        :label="$t('table.phone')"
        min-width="50px"
      >
        <template slot-scope="{row}">
          <span
          >{{ row.recipient }}</span>
        </template>
      </el-table-column>
      <el-table-column
        :label="$t('table.recipient.data')"
        min-width="130px"
      >
        <template slot-scope="{row}">
          <span v-html="formatMoustache(row.data)"></span>
        </template>
      </el-table-column>
      <el-table-column
        label="State"
        min-width="40px"
      >
        <template slot-scope="{row}">
          <el-tag size="mini" effect="dark" :type="row.state | statusFilter">
            {{ row.state | uppercaseFirstChar }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column
          :label="$t('table.tags')"
          min-width="110px"
        >
          <template slot-scope="{row}">

            <span>
              <el-tag
                v-for="(item, index) in row.tags"
                class="tags"
                size="mini"
                :key="item"
              >
                {{ (index > 1) ? '...' : item }}
              </el-tag>
            </span>
          </template>
        </el-table-column>
      <el-table-column
        :label="$t('table.status')"
        min-width="40px"
      >
        <template slot-scope="{row}">
          <el-tag size="mini" effect="dark" :type="row.status | statusFilter">
            {{ row.status | uppercaseFirstChar }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column
        :label="$t('table.actions')"
        align="center"
        width="130"
      >
        <template slot-scope="{row}">
          <router-link :to="{name: 'RecipientChat', params: {campaignId: depositoryId}, query: {recipientId: row.id}}">
            <el-button
              icon="el-icon-chat-round"
              circle
              class="mr-3-px"
            >
            </el-button>
          </router-link>
          <el-button
            :icon="row.status === 'active' ? 'el-icon-circle-close' : 'el-icon-circle-check'"
            :type="row.status === 'active' ? 'danger' : 'success'"
            @click="handleDelete(row)"
            circle
          >
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <RecipientTableFilters
      :visible.sync="filterLoading"
      @recipientFiltered="recipientFiltered"
      @clearFilter="clearFilter"
    />

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
import { Component, Mixins } from 'vue-property-decorator'
import { getRecipients, updateRecipient } from '@/api/recipients'
import { ICampaignRecipientData } from '@/api/types'
import RecipientTableFilters from './components/RecipientTableFilters.vue'
import TableMixin from '@/views/mixins/TableMixin'
import { isEmpty } from 'lodash'

@Component({
  name: 'RecipientsTable',
  components: {
    RecipientTableFilters
  }
})

export default class Recipient extends Mixins(TableMixin) {
  private list: ICampaignRecipientData[] = []
  private createRoute = 'RecipientCreate'
  private depositoryId = -1
  private importRoute = 'UploadRecipients'
  private createParams = {}

  created() {
    this.depositoryId = parseInt(this.$route.params && this.$route.params.id)
    this.createParams = {
      campaignId: this.depositoryId
    }
    this.getList()
  }

  private recipientFiltered(data: any) {
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

  private formatMoustache(jsonData: any) {
    let formatedMoustache = ''
    Object.keys(jsonData).map((key) => {
      formatedMoustache += '<span class="tags el-tag el-tag--danger el-tag--mini el-tag--plain el-tag--light">{{' + key + ' }}</span> - ' + jsonData[key] + ' </br>'
    })
    return formatedMoustache
  }

  private async getList() {
    this.listLoading = true
    const { headers, data } = await getRecipients(this.depositoryId, this.listQuery)
    this.list = data
    this.total = parseInt(headers.count)
    this.listLoading = false
  }

  private async handleSearchFilter(searchData: string) {
    if (!isEmpty(searchData)) {
      this.listLoading = true
      this.listQuery.searchparam = searchData
      const { data, headers } = await getRecipients(this.depositoryId, this.listQuery)
      this.list = data
      this.total = parseInt(headers.count)
      this.listLoading = false
    } else {
      this.listQuery.searchparam = ''
      this.getList()
    }
  }

  private handleFilter() {
    this.filterLoading = true
  }

  private handleDelete(row: any) {
    this.$confirm('Are you sure?', 'Warning', {
      confirmButtonText: 'OK',
      cancelButtonText: 'Cancel',
      type: 'warning'
    }).then(() => {
      this.updateStatus(row)
      this.$message({
        type: 'success',
        message: 'Recipient status updated'
      })
    }).catch(() => {
      this.$message({
        type: 'info',
        message: 'Recipient status not updated'
      })
    })
  }

  private async updateStatus(row: any) {
    const status = row.status === 'active' ? 'inactive' : 'active'
    const archivedAt = row.status === 'active' ? new Date() : ''
    await updateRecipient(row.id, this.depositoryId, { status: status, archived_at: archivedAt })
    this.$message({
      type: 'success',
      message: 'Contact updated'
    })
    this.getList()
  }
}
</script>
