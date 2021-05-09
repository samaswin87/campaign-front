<template>
  <div class="app-container">
    <div class="filter-container">
      <el-row>
        <el-col :span="8">
          <router-link :to="{name: 'ContactCreate'}">
            <el-tooltip class="item" effect="dark" :content="$t('table.add')" placement="bottom">
              <el-button
                style="margin-left: 10px;"
                type="primary"
                icon="el-icon-circle-plus-outline"
              >
              </el-button>
          </el-tooltip>
        </router-link>
        <el-tooltip class="item" effect="dark" :content="$t('table.export')" placement="bottom">
          <el-button
            style="margin-left: 10px;"
            type="primary"
            icon="el-icon-download"
          >
          </el-button>
        </el-tooltip>
        <el-tooltip class="item" effect="dark" :content="$t('table.import')" placement="bottom">
          <el-button
            style="margin-left: 10px;"
            type="primary"
            icon="el-icon-upload"
          >
          </el-button>
        </el-tooltip>
        </el-col>
        <el-col :span="8">
          <el-switch
            v-model="selectAll"
            @change="handleSelectAll"
            active-text="Select All">
          </el-switch>
          <el-tooltip class="item" effect="dark" :content="$t('table.contact.optOut')" placement="bottom">
            <el-button
              style="margin-left: 10px;"
              type="danger"
              icon="el-icon-turn-off"
              :disabled="(this.multipleSelection.length === 0)"
            >
            </el-button>
          </el-tooltip>
          <el-tooltip class="item" effect="dark" :content="$t('table.contact.tags')" placement="bottom">
            <el-button
              style="margin-left: 10px;"
              type="primary"
              icon="el-icon-price-tag"
              @click="toggleTags"
              :disabled="(this.multipleSelection.length === 0)"
            >
            </el-button>
          </el-tooltip>
          <el-tooltip class="item" effect="dark" :content="$t('table.contact.moveContacts')" placement="bottom">
            <el-button
              style="margin-left: 10px;"
              type="primary"
              icon="el-icon-copy-document"
              :disabled="(this.multipleSelection.length === 0)"
            >
            </el-button>
          </el-tooltip>
        </el-col>
        <el-col :span="8" class="float-right">
            <el-input
              v-model="listQuery.title"
              :placeholder="$t('table.search')"
              style="width: 300px;"
              @keyup.enter.native="handleFilter"
            />

            <el-button
              v-waves
              type="primary"
              icon="el-icon-search"
              @click="handleSearch"
            >
            </el-button>

            <el-button
              v-waves
              type="primary"
              circle
              @click="handleFilter"
              >
              <svg-icon name="filter-solid" />
            </el-button>
        </el-col>
      </el-row>
    </div>
    <el-row>
      <el-col>
        <el-table
        ref="contactTable"
        :key="tableKey"
        v-loading="listLoading"
        :data="list"
        border
        fit
        highlight-current-row
        @selection-change="handleSelectionChange"
        style="width: 100%;"
        @sort-change="sortChange"
      >
        <el-table-column
          type="selection"
          width="55">
        </el-table-column>
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
          :label="$t('table.contact.firstName')"
          min-width="150px"
        >
          <template slot-scope="{row}">
            <span
            >{{ row.firstName }}</span>
          </template>
        </el-table-column>
        <el-table-column
          :label="$t('table.contact.lastName')"
          min-width="150px"
        >
          <template slot-scope="{row}">
            <span
            >{{ row.lastName }}</span>
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
          :label="$t('table.contact.noOfCampaigns')"
          min-width="150px"
        >
          <template slot-scope="{row}">
            <span>{{ row.noOfCampaigns }}</span>
          </template>
        </el-table-column>
        <el-table-column
          :label="$t('table.contact.keywords')"
          min-width="150px"
        >
          <template slot-scope="{row}">

            <span>
              <el-tag
                v-for="item in row.keywords"
                class="tags"
                :key="item"
              >
                {{ item }}
              </el-tag>
            </span>
          </template>
        </el-table-column>
        <el-table-column
          :label="$t('table.actions')"
          align="center"
          width="230"
          class-name="fixed-width"
        >
          <template slot-scope="{row}">
            <router-link :to="{name: 'ContactView', params: {id: row.id}}">
              <el-button
                icon="el-icon-view"
                circle
              >
              </el-button>
            </router-link>
            <router-link :to="{name: 'ContactEdit', params: {id: row.id}}">
              <el-button
                icon="el-icon-edit-outline"
                circle
              >
              </el-button>
            </router-link>
            <el-button
              v-if="row.status!=='deleted'"
              icon="el-icon-turn-off"
              @click="handleDelete(row)"
              circle
            >
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      </el-col>
    </el-row>

    <pagination
      v-show="total>0"
      :total="total"
      :page.sync="listQuery.page"
      :limit.sync="listQuery.limit"
      @pagination="getList"
    />

    <ContactTableFilters
      :visible.sync="filterLoading"
      @contactFiltered="contactFiltered"
    />

    <TagsDialog
      :visible.sync="dialogLoading"
    />
  </div>
</template>

<script lang="ts">
import { Component, Vue, Ref, Watch } from 'vue-property-decorator'
import { getContacts, updateContact, defaultContactData } from '@/api/contacts'
import ContactTableFilters from './components/ContactTableFilters.vue'
import TagsDialog from './components/TagsDialog.vue'
import { IContactData } from '@/api/types'
import Pagination from '@/components/Pagination/index.vue'

@Component({
  name: 'ContactTable',
  components: {
    Pagination,
    ContactTableFilters,
    TagsDialog
  }
})

export default class extends Vue {
  @Ref('contactTable') readonly contactTable!: any;

  private multipleSelection = []
  private tableKey = 0
  private list: IContactData[] = []
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
  private contactRow = defaultContactData
  private textMap = {
    update: 'Edit',
    create: 'Create'
  }

  private selectAll = false

  private dialogPageviewsVisible = false
  private pageviewsData = []

  private downloadLoading = false
  private tempContactData = defaultContactData

  created() {
    this.getList()
  }

  private contactFiltered(data: any) {
    console.log(data)
  }

  private toggleTags() {
    this.dialogLoading = true
  }

  private viewContact(row: any) {
    this.contactRow = Object.assign({}, row)
  }

  private handleSelectionChange(val: any) {
    this.multipleSelection = val
  }

  private handleSelectAll() {
    this.contactTable.toggleAllSelection()
  }

  private async getList() {
    this.listLoading = true
    const { data } = await getContacts(this.listQuery)
    this.list = data.items
    this.total = data.total
    // Just to simulate the time of the request
    setTimeout(() => {
      this.listLoading = false
    }, 0.5 * 1000)
  }

  @Watch('listLoading')
  watchLoading() {
    if (!this.listLoading && this.selectAll) {
      this.contactTable.toggleAllSelection()
    }
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

  private handleDelete(row: any) {
    this.$confirm('Are you sure?', 'Warning', {
      confirmButtonText: 'OK',
      cancelButtonText: 'Cancel',
      type: 'warning'
    }).then(() => {
      updateContact(row.id, { status: 'inactive' })
      this.$message({
        type: 'success',
        message: 'Contact opted out'
      })
    }).catch(() => {
      this.$message({
        type: 'info',
        message: 'Contact not opted out'
      })
    })
  }
}
</script>

<style lang="scss" scoped>
.float-right {
  text-align: right
}

.tags {
  margin-left: 3px;
  margin-bottom: 3px;
}
</style>
