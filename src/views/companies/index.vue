<template>
  <div class="app-container">
    <div class="filter-container">
      <el-row>
        <el-col :span="8">
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
    <el-row>
      <el-col>
        <el-table
        ref="companyTable"
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
          :label="$t('table.phone')"
          min-width="150px"
        >
          <template slot-scope="{row}">
            <span
            >{{ row.phone }}</span>
          </template>
        </el-table-column>
        <el-table-column
          :label="$t('table.companies.totalCredits')"
          min-width="150px"
        >
          <template slot-scope="{row}">
            <span
            >{{ row.totalCredits }}</span>
          </template>
        </el-table-column>
        <el-table-column
          :label="$t('table.companies.remainingCredits')"
          min-width="150px"
        >
          <template slot-scope="{row}">
            <span
            >{{ row.remainingCredits }}</span>
          </template>
        </el-table-column>
        <el-table-column
          :label="$t('table.email')"
          min-width="150px"
        >
          <template slot-scope="{row}">
            <span
            >{{ row.email }}</span>
          </template>
        </el-table-column>
        <el-table-column
        :label="$t('table.status')"
        min-width="150px"
        >
          <template slot-scope="{row}">
            <el-tag effect="dark" :type="row.status | statusFilter">
              {{ row.status | uppercaseFirstChar}}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column
          :label="$t('table.actions')"
          align="center"
          width="230"
          class-name="fixed-width"
        >
          <template slot-scope="{row}">
            <router-link :to="{name: 'CompanyView', params: {id: row.id}}">
              <el-button
                icon="el-icon-view"
                circle
              >
              </el-button>
            </router-link>
            <router-link :to="{name: 'CompanyEdit', params: {id: row.id}}">
              <el-button
                icon="el-icon-edit-outline"
                circle
              >
              </el-button>
            </router-link>
            <el-button
              v-if="row.status!=='deleted'"
              :icon="iconStatus(row.status)"
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

    <CompanyTableFilters
      :visible.sync="filterLoading"
      @companyFiltered="companyFiltered"
    />
  </div>
</template>

<script lang="ts">
import { Component, Vue, Ref } from 'vue-property-decorator'
import { getCompanies, defaultCompanyData } from '@/api/companies'
import CompanyTableFilters from './components/CompanyTableFilters.vue'
import { ICompanyData } from '@/api/types'
import Pagination from '@/components/Pagination/index.vue'
import TableDefaultActions from '@/components/common/TableDefaultActions.vue'
import TableSearchWithFilters from '@/components/common/TableSearchWithFilters.vue'
import UploadExcelComponent from '@/components/UploadExcel/index.vue'

@Component({
  name: 'CompanyTable',
  components: {
    Pagination,
    CompanyTableFilters,
    TableDefaultActions,
    TableSearchWithFilters,
    UploadExcelComponent
  }
})

export default class extends Vue {
  @Ref('companyTable') readonly companyTable!: any;
  private tableKey = 0
  private list: ICompanyData[] = []
  private total = 0
  private listLoading = true
  private filterLoading = false
  private createRoute = 'CompanyCreate'
  private importRoute = 'UploadCompanies'
  private listQuery = {
    page: 1,
    limit: 20,
    sort: '+id'
  }

  private statusOptions = ['active', 'inactive']
  private companyRow = defaultCompanyData

  created() {
    this.getList()
  }

  private companyFiltered(data: any) {
    console.log(data)
  }

  private viewCompany(row: any) {
    this.companyRow = Object.assign({}, row)
  }

  private iconStatus(status: string) {
    if (status === 'active') {
      return 'el-icon-open'
    }

    return 'el-icon-turn-off'
  }

  private async getList() {
    this.listLoading = true
    const { data } = await getCompanies(this.listQuery)
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
      this.$message({
        type: 'success',
        message: 'Company opted out'
      })
    }).catch(() => {
      this.$message({
        type: 'info',
        message: 'Company not opted out'
      })
    })
  }
}
</script>
