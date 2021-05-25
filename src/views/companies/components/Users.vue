<template>
    <el-card class="box-card">
        <div slot="header" class="clearfix">
            <span>Users</span>
        </div>
        <div class="company-details">
            <el-row>
                <el-col :span="8">
                  <el-tooltip class="item" effect="dark" :content="$t('table.add')" placement="top">
                      <el-button
                      class="ml-10-px"
                      @click="addUser"
                      type="primary"
                      icon="el-icon-circle-plus-outline"
                      >
                      </el-button>
                  </el-tooltip>
                </el-col>
                <el-col :span="8" class="float-right mb-10-px">
                    <TableSearchWithFilters @handleFilter="handleFilter" />
                </el-col>
            </el-row>
            <el-row>
                <el-col>
                    <el-table
                    ref="creditTable"
                    :key="tableKey"
                    v-loading="listLoading"
                    :data.sync="list"
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
                        :label="$t('table.email')"
                        min-width="150px"
                        >
                        <template slot-scope="{row}">
                          <span>
                            {{ row.email }}
                          </span>
                        </template>
                        </el-table-column>
                        <el-table-column
                        :label="$t('table.createdOn')"
                        min-width="150px"
                        >
                        <template slot-scope="{row}">
                          <span>
                            {{ row.createdOn | parseTime }}
                          </span>
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
                          width="130"
                          class-name="fixed-width"
                        >
                          <template slot-scope="{row}">
                            <el-button
                              v-if="row.status!=='deleted'"
                              icon="el-icon-delete"
                              @click="handleDelete(row)"
                              circle
                            >
                            </el-button>
                          </template>
                        </el-table-column>
                    </el-table>

                    <users-table-filters
                        :visible.sync="filterLoading"
                        @userFiltered="userFiltered"
                    />
                    <add-platfrom
                      :visible.sync="addUserLoading"
                      @userRecord="userRecord"
                    />

                    <pagination
                    v-show="total>0"
                    :total="total"
                    :page.sync="listQuery.page"
                    :limit.sync="listQuery.limit"
                    @pagination="getList"
                    />
                </el-col>
            </el-row>
        </div>
    </el-card>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { defaultCompanyData, getCompany } from '@/api/companies'
import { getUsersByCompany } from '@/api/users'
import { IUserData } from '@/api/types'
import Pagination from '@/components/Pagination/index.vue'
import TableSearchWithFilters from '@/components/common/TableSearchWithFilters.vue'
import UsersTableFilters from './UsersTableFilters.vue'
import AddPlatfrom from './AddPlatfrom.vue'

@Component({
  name: 'User',
  components: {
    Pagination,
    TableSearchWithFilters,
    UsersTableFilters,
    AddPlatfrom
  }
})
export default class extends Vue {
    private companyData = defaultCompanyData
    private currentMonth = ''
    private tableKey = 0
    private list: IUserData[] = []
    private total = 0
    private listLoading = true
    private filterLoading = false
    private addUserLoading = false
    private listQuery = {
      page: 1,
      limit: 20,
      sort: '+id'
    }

    created() {
      const id = this.$route.params && this.$route.params.id
      this.fetchData(parseInt(id))
    }

    private handleFilter() {
      this.filterLoading = true
    }

    private addUser() {
      this.addUserLoading = true
    }

    private userRecord(data: any) {
      console.log(data)
    }

    private async fetchData(id: number) {
      try {
        this.listLoading = true
        const { data } = await getCompany(id, {})
        this.companyData = data.company
        this.getList()
      } catch (err) {
        console.error(err)
      }
    }

    private userFiltered(data: any) {
      console.log(data)
    }

    private async getList() {
      try {
        this.listLoading = true
        const { data } = await getUsersByCompany(this.companyData.id, this.listQuery)
        this.list = data.items
        this.total = data.total
        // Just to simulate the time of the request
        setTimeout(() => {
          this.listLoading = false
        }, 0.5 * 1000)
      } catch (err) {
        console.error(err)
      }
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
          message: 'User removed'
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: 'User not removed'
        })
      })
    }
}
</script>
