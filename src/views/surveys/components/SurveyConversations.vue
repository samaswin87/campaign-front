<template>
  <div>
    <div class="filter-container">
      <el-row>
        <el-col :span="8">
          <el-tooltip class="item" effect="dark" :content="$t('table.export')" placement="bottom">
            <el-button
                style="margin-left: 10px;"
                type="primary"
                icon="el-icon-upload"
            >
            </el-button>
          </el-tooltip>
        </el-col>
        <el-col :span="6">
          <el-tooltip class="item" effect="dark" :content="$t('table.conversation.sendMessages')" placement="bottom">
            <el-button
                style="margin-left: 10px;"
                type="primary"
                icon="el-icon-s-promotion"
            >
            </el-button>
          </el-tooltip>
        </el-col>
        <el-col :span="10" class="float-right">
          <TableSearchWithFilters @handleFilter="handleFilter" />
        </el-col>
      </el-row>
    </div>

    <el-table
      ref="conversationTable"
      :key="tableKey"
      :data.sync="conversations"
      border
      fit
      highlight-current-row
      style="width: 100%;"
      @sort-change="sortChange"
    >
      <el-table-column
        :label="$t('table.phone')"
      >
        <template slot-scope="{row}">
          <span
          >{{ row.contact }}</span>
        </template>
      </el-table-column>
      <el-table-column
        :label="$t('table.conversation.firstReplyAt')"
        min-width="80px"
      >
        <template slot-scope="{row}">
          <span
          >{{ row.firstReplyAt | parseTime }}</span>
        </template>
      </el-table-column>
      <el-table-column
        :label="$t('table.conversation.lastReplyAt')"
        min-width="80px"
      >
        <template slot-scope="{row}">
          <span
          >{{ row.lastReplyAt | parseTime }}</span>
        </template>
      </el-table-column>
      <el-table-column
        :label="$t('table.actions')"
        align="center"
        width="130"
        class-name="fixed-width"
      >
        <template slot-scope="{row}">
          <router-link :to="{name: 'WorkflowRecipientChat', params: {menuId: menuId, id: row.id}, query: {contact: row.contact}}">
            <el-button
              icon="el-icon-chat-round"
              circle
            >
            </el-button>
          </router-link>
        </template>
      </el-table-column>
    </el-table>

    <ConversationTableFilters
      :visible.sync="filterLoading"
      @conversationFiltered="conversationFiltered"
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
import { Component, Vue, Prop } from 'vue-property-decorator'
import { defaultConversationData, getWorkflowConversations } from '@/api/workflows'
import { ICampaignConversationsData } from '@/api/types'
import Pagination from '@/components/Pagination/index.vue'
import TableSearchWithFilters from '@/components/common/TableSearchWithFilters.vue'
import ConversationTableFilters from './ConversationTableFilters.vue'

@Component({
  name: 'SurveyConversations',
  components: {
    Pagination,
    TableSearchWithFilters,
    ConversationTableFilters
  }
})

export default class extends Vue {
  @Prop({ required: true }) private menuId!: number
  private tableKey = 0
  private total = 0
  private conversations: ICampaignConversationsData[] = []
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
  private campaignRow = defaultConversationData

  private dialogPageviewsVisible = false
  private pageviewsData = []

  private downloadLoading = false
  private tempCampaignData = defaultConversationData

  private conversationFiltered(data: any) {
    console.log(data)
  }

  created() {
    this.getList()
  }

  private async getList() {
    this.listLoading = true
    const { data } = await getWorkflowConversations(this.menuId, this.listQuery)
    if (this.listQuery.sort === '-id') {
      this.conversations = this.conversations.reverse()
    }
    this.conversations = data.items
    this.total = data.total
    this.listLoading = false
  }

  private dialogVisiblity() {
    return this.filterLoading
  }

  private handleFilter() {
    this.filterLoading = true
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

<style lang="scss" scoped>
.float-right {
  float: right;
}

</style>
