<template>
  <div>
    <div class="filter-container">
      <el-row>
        <el-col :span="14">
          <TableDefaultActions
            :createRoute="createRoute"
          />
        </el-col>
        <el-col :span="10" class="float-right">
          <TableSearchWithFilters @handleFilter="handleFilter" />
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
        :label="$t('table.recipient.data')"
        min-width="170px"
      >
        <template slot-scope="{row}">
          <span v-html="formatMustache(row.data)"
          ></span>
        </template>
      </el-table-column>
      <el-table-column
        :label="$t('table.phone')"
        min-width="140px"
      >
        <template slot-scope="{row}">
          <span
          >{{ row.phone }}</span>
        </template>
      </el-table-column>
      <el-table-column
        :label="$t('table.recipient.addedOn')"
        min-width="140px"
      >
        <template slot-scope="{row}">
          <span
          >{{ row.addedOn | parseTime }}</span>
        </template>
      </el-table-column>
      <el-table-column
        :label="$t('table.recipient.lastReplyAt')"
        min-width="140px"
      >
        <template slot-scope="{row}">
          <span
          >{{ row.lastReplyAt | parseTime }}</span>
        </template>
      </el-table-column>
      <el-table-column
          :label="$t('table.tags')"
          min-width="150px"
        >
          <template slot-scope="{row}">

            <span>
              <el-tag
                v-for="(item, index) in restrictedTags(row.tags)"
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
        min-width="80px"
      >
        <template slot-scope="{row}">
          <el-tag size="mini" effect="dark" :type="row.status | statusFilter">
            {{ row.status }}
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
          <el-button
            icon="el-icon-chat-round"
            circle
          >
          </el-button>
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
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { getRecipients, defaultRecipientData } from '@/api/recipients'
import { ICampaignRecipientData } from '@/api/types'
import Pagination from '@/components/Pagination/index.vue'
import TableDefaultActions from '@/components/common/TableDefaultActions.vue'
import TableSearchWithFilters from '@/components/common/TableSearchWithFilters.vue'

@Component({
  name: 'RecipientsTable',
  components: {
    Pagination,
    TableDefaultActions,
    TableSearchWithFilters
  }
})

export default class extends Vue {
  private multipleSelection = []
  private tableKey = 0
  private list: ICampaignRecipientData[] = []
  private total = 0
  private listLoading = true
  private filterLoading = false
  private dialogLoading = false
  private createRoute = 'RecipientCreate'
  private listQuery = {
    page: 1,
    limit: 20,
    sort: '+id'
  }

  private statusOptions = ['active', 'inactive']
  private showReviewer = false
  private dialogFormVisible = false
  private dialogStatus = ''
  private campaignRow = defaultRecipientData
  private textMap = {
    update: 'Edit',
    create: 'Create'
  }

  private dialogPageviewsVisible = false
  private pageviewsData = []

  private downloadLoading = false
  private tempCampaignData = defaultRecipientData

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

  formatMustache = (jsonData: any) => {
    let formatedMustache = ''
    Object.keys(jsonData).map((key) => {
      formatedMustache += '<span class="tags el-tag el-tag--danger el-tag--mini el-tag--plain el-tag--light">{{' + key + ' }}</span> - ' + jsonData[key] + ' </br>'
    })
    return formatedMustache
  }

  private async getList() {
    this.listLoading = true
    const { data } = await getRecipients(this.listQuery)
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

  private restrictedTags(tags: string[]) {
    return tags.filter((tag, index) => index < 3)
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
