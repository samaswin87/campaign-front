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
          <TableSearchWithFilters @handleFilter="handleFilter" />
        </el-col>
      </el-row>
    </div>

    <el-table
      ref="menuTable"
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
            {{ row.status | uppercaseFirstChar }}
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
          <router-link :to="{name: 'MenuView', params: {id: row.id}}">
            <el-button
              icon="el-icon-view"
              circle
            >
            </el-button>
          </router-link>
          <router-link :to="{name: 'MenuEdit', params: {id: row.id}}">
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

    <MenuTableFilters
      :visible.sync="filterLoading"
      @menuFiltered="menuFiltered"
    />
  </div>
</template>

<script lang="ts">
import { Component, Vue, Ref } from 'vue-property-decorator'
import { getMenus, defaultMenuData } from '@/api/menus'
import MenuTableFilters from './components/MenuTableFilters.vue'
import { IMenuData } from '@/api/types'
import Pagination from '@/components/Pagination/index.vue'
import TableDefaultActions from '@/components/common/TableDefaultActions.vue'
import TableSearchWithFilters from '@/components/common/TableSearchWithFilters.vue'

@Component({
  name: 'MenuTable',
  components: {
    Pagination,
    MenuTableFilters,
    TableDefaultActions,
    TableSearchWithFilters
  }
})

export default class extends Vue {
  @Ref('menuTable') readonly menuTable!: any;
  private tableKey = 0
  private list: IMenuData[] = []
  private total = 0
  private listLoading = true
  private filterLoading = false
  private dialogLoading = false
  private listQuery = {
    page: 1,
    limit: 20,
    sort: '+id'
  }

  private createRoute = 'MenuCreate'
  private importRoute = 'UploadMenus'
  private statusOptions = ['active', 'inactive']
  private showReviewer = false
  private dialogFormVisible = false
  private dialogStatus = ''
  private menuRow = defaultMenuData
  private textMap = {
    update: 'Edit',
    create: 'Create'
  }

  private dialogPageviewsVisible = false
  private pageviewsData = []

  private downloadLoading = false
  private tempMenuData = defaultMenuData

  created() {
    this.getList()
  }

  private menuFiltered(data: any) {
    console.log(data)
  }

  private dialogVisiblity() {
    return this.filterLoading
  }

  private viewMenu(row: any) {
    this.menuRow = Object.assign({}, row)
    this.dialogLoading = true
  }

  private async getList() {
    this.listLoading = true
    const { data } = await getMenus(this.listQuery)
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
