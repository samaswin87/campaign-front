<template>
  <div class="app-container">
    <div class="filter-container">
      <el-button
        class="filter-item"
        style="margin-left: 10px;"
        type="primary"
        icon="el-icon-circle-plus-outline"
        @click="handleCreate"
      >
        {{ $t('table.add') }}
      </el-button>
      <el-button
        class="filter-item"
        style="margin-left: 10px;"
        type="primary"
        icon="el-icon-download"
        @click="handleCreate"
      >
        {{ $t('table.export') }}
      </el-button>
      <el-button
        class="filter-item"
        style="margin-left: 10px;"
        type="primary"
        icon="el-icon-upload"
        @click="handleCreate"
      >
        {{ $t('table.import') }}
      </el-button>
      <el-switch
        style="margin-left: 10px;"
        v-model="selectAll"
        class="filter-item"
        @change="handleSelectAll"
        active-text="Select All">
      </el-switch>
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
        :label="$t('table.contact.phone')"
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
        <template slot-scope="{row, $index}">
          <router-link :to="{name: 'ContactView', params: {id: row.id}}">
            <el-button
              icon="el-icon-view"
              circle
            >
            </el-button>
          </router-link>
          <el-button
            icon="el-icon-edit-outline"
            @click="handleUpdate(row)"
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

    <ContactTableFilters
      :visible.sync="filterLoading"
      @contactFiltered="contactFiltered"
    />
  </div>
</template>

<script lang="ts">
import { Component, Vue, Ref, Watch } from 'vue-property-decorator'
import { Form } from 'element-ui'
import { cloneDeep } from 'lodash'
import { getContacts, createContact, updateContact, defaultContactData } from '@/api/contacts'
import ContactTableFilters from './components/ContactTableFilters.vue'
import { IContactData } from '@/api/types'
import { exportJson2Excel } from '@/utils/excel'
import { formatJson } from '@/utils'
import Pagination from '@/components/Pagination/index.vue'

@Component({
  name: 'ContactTable',
  components: {
    Pagination,
    ContactTableFilters
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

  private statusOptions = ['published', 'draft', 'deleted']
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

  private dialogVisiblity() {
    return this.filterLoading
  }

  private viewContact(row: any) {
    this.contactRow = Object.assign({}, row)
    this.dialogLoading = true
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

  private resetTempContactData() {
    this.tempContactData = cloneDeep(defaultContactData)
  }

  private handleCreate() {
    this.resetTempContactData()
    this.dialogStatus = 'create'
    this.dialogFormVisible = true
    this.$nextTick(() => {
      (this.$refs.dataForm as Form).clearValidate()
    })
  }

  private createData() {
    (this.$refs.dataForm as Form).validate(async(valid) => {
      if (valid) {
        const contactData = this.tempContactData
        contactData.id = Math.round(Math.random() * 100) + 1024 // mock a id
        const { data } = await createContact({ contact: contactData })
        this.list.unshift(data.contact)
        this.dialogFormVisible = false
        this.$notify({
          title: '成功',
          message: '创建成功',
          type: 'success',
          duration: 2000
        })
      }
    })
  }

  private handleUpdate(row: any) {
    this.tempContactData = Object.assign({}, row)
    this.dialogStatus = 'update'
    this.dialogFormVisible = true
    this.$nextTick(() => {
      (this.$refs.dataForm as Form).clearValidate()
    })
  }

  private updateData() {
    (this.$refs.dataForm as Form).validate(async(valid) => {
      if (valid) {
        const tempData = Object.assign({}, this.tempContactData)
        const { data } = await updateContact(tempData.id, { contact: tempData })
        const index = this.list.findIndex(v => v.id === data.contact.id)
        this.list.splice(index, 1, data.contact)
        this.dialogFormVisible = false
        this.$notify({
          title: '成功',
          message: '更新成功',
          type: 'success',
          duration: 2000
        })
      }
    })
  }

  private handleDelete(row: any, index: number) {
    this.$notify({
      title: 'Success',
      message: 'Delete Successfully',
      type: 'success',
      duration: 2000
    })
    this.list.splice(index, 1)
  }

  private async handleGetPageviews() {
    this.dialogPageviewsVisible = true
  }

  private handleDownload() {
    this.downloadLoading = true
    const tHeader = ['timestamp', 'title', 'type', 'importance', 'status']
    const filterVal = ['timestamp', 'title', 'type', 'importance', 'status']
    const data = formatJson(filterVal, this.list)
    exportJson2Excel(tHeader, data, 'table-list')
    this.downloadLoading = false
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
