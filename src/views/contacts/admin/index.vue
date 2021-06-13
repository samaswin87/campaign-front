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
        <el-col :span="8">
          <el-tooltip class="item" effect="dark" :content="$t('table.contact.optOut')" placement="bottom">
            <el-button
              style="margin-left: 10px;"
              type="danger"
              :disabled="bulkOpt"
              icon="el-icon-turn-off"
              @click="toggleStatus"
            >
            </el-button>
          </el-tooltip>
          <el-tooltip class="item" effect="dark" :content="$t('table.tags')" placement="bottom">
            <el-button
              style="margin-left: 10px;"
              type="primary"
              :disabled="bulkTags"
              icon="el-icon-price-tag"
              @click="toggleTags"
            >
            </el-button>
          </el-tooltip>
          <el-tooltip class="item" effect="dark" :content="$t('table.contact.moveContacts')" placement="bottom">
            <el-button
              style="margin-left: 10px;"
              type="primary"
              :disabled="bulkMove"
              icon="el-icon-copy-document"
              @click="toggleMove"
            >
            </el-button>
          </el-tooltip>
        </el-col>
        <el-col :span="8" class="float-right">
            <TableSearchWithFilters
            :filterIcon.sync="filterIcon"
            @handleFilter="handleFilter"
            @handleSearchFilter="handleSearchFilter"/>
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
        @selection-change="handleSelectionChange"
        border
        fit
        highlight-current-row
      >
        <el-table-column
          type="selection"
          width="30">
        </el-table-column>
        <el-table-column
          :label="$t('table.contact.firstName')"
          min-width="130px"
        >
          <template slot-scope="{row}">
            <span
            >{{ row.first_name }}</span>
          </template>
        </el-table-column>
        <el-table-column
          :label="$t('table.contact.lastName')"
          min-width="130px"
        >
          <template slot-scope="{row}">
            <span
            >{{ row.last_name }}</span>
          </template>
        </el-table-column>
        <el-table-column
          :label="$t('table.company')"
          min-width="200px"
        >
          <template slot-scope="{row}">
            <span
            >{{ row.company_name }}</span>
          </template>
        </el-table-column>
        <el-table-column
          :label="$t('table.phone')"
          min-width="120px"
        >
          <template slot-scope="{row}">
            <span
            >{{ row.phone }}</span>
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
                class="mr-3-px"
                :key="item"
              >
                {{ item }}
              </el-tag>
            </span>
          </template>
        </el-table-column>
        <el-table-column
          :label="$t('table.contact.tags')"
          min-width="200px"
        >
          <template slot-scope="{row}">

            <span>
              <el-tag
                v-for="item in row.tags"
                class="mr-3-px"
                :key="item"
              >
                {{ item }}
              </el-tag>
            </span>
          </template>
        </el-table-column>
        <el-table-column
        :label="$t('table.status')"
        min-width="100px"
        >
          <template slot-scope="{row}">
            <el-tag effect="dark" :type="row.status | statusFilter" >
              {{ row.status | uppercaseFirstChar}}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column
          :label="$t('table.actions')"
          align="center"
          width="150"
          class-name="fixed-width"
        >
          <template slot-scope="{row}">
            <el-tooltip class="item" effect="dark" :content="$t('table.action.show')" placement="bottom">
              <router-link :to="{name: 'ContactView', params: {id: row.id}}">
                <el-button
                  icon="el-icon-view"
                  circle
                  class="mr-3-px"
                >
                </el-button>
              </router-link>
            </el-tooltip>
            <el-tooltip class="item" effect="dark" :content="$t('table.action.edit')" placement="bottom">
              <router-link :to="{name: 'ContactEdit', params: {id: row.id}}">
                <el-button
                  icon="el-icon-edit-outline"
                  circle
                  class="mr-3-px"
                >
                </el-button>
              </router-link>
            </el-tooltip>
            <el-tooltip class="item" effect="dark" :content="$t('table.action.' + row.status)" placement="bottom">
              <el-button
                v-if="row.status !== 'deleted'"
                :icon="iconStatus(row.status)"
                @click="handleActivation(row)"
                circle
                class="mr-3-px"
                :type="row.status === 'active' ? 'danger' : 'success'"
              >
              </el-button>
            </el-tooltip>
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
      @clearFilter="clearFilter"
    />

    <TagsDialog
      :visible.sync="tagsLoading"
      :companyId.sync="companyId"
      :tags.sync="tags"
      @updateTags="updateTags"
    />

    <MoveDialog
      :visible.sync="moveLoading"
    />
  </div>
</template>

<script lang="ts">
import { Component, Mixins } from 'vue-property-decorator'
import { getContacts, updateContact, defaultContactData, updateStatuses, updateTags } from '@/api/contacts'
import ContactTableFilters from './components/ContactTableFilters.vue'
import TagsDialog from './components/TagsDialog.vue'
import MoveDialog from './components/MoveDialog.vue'
import { IContactData } from '@/api/types'
import TableMixin from '@/views/mixins/TableMixin'
import { isEmpty, map, uniq, flattenDeep, compact } from 'lodash'

@Component({
  name: 'ContactTable',
  components: {
    ContactTableFilters,
    TagsDialog,
    MoveDialog
  }
})
export default class Contact extends Mixins(TableMixin) {
  private list: IContactData[] = []
  private tagsLoading = false
  private moveLoading = false
  private tags: string[] = []
  private createRoute = 'ContactCreate'
  private importRoute = 'UploadContacts'
  private contactRow = defaultContactData
  private companyId = 0

  created() {
    this.getList()
  }

  private contactFiltered(data: any) {
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

  private toggleTags() {
    this.tagsLoading = true
    this.tags = uniq(compact(flattenDeep(map(this.multipleSelection, 'tags'))))
    this.companyId = uniq(map(this.multipleSelection, 'company_id'))[0]
  }

  private async updateTags(data: any) {
    if (!isEmpty(data) && !isEmpty(this.multipleSelection)) {
      const contactIds = map(this.multipleSelection, 'id')
      await updateTags({ tags: data, contacts: contactIds })
    }
    this.getList()
  }

  private async toggleStatus() {
    if (!isEmpty(this.multipleSelection)) {
      const contactIds = map(this.multipleSelection, 'id')
      let status = isEmpty(this.activeRecords) ? 'active' : 'inactive'
      status = isEmpty(this.inActiveRecords) ? 'inactive' : 'active'
      await updateStatuses({ contacts: contactIds, status: status })
    }
    this.getList()
  }

  private toggleMove() {
    this.moveLoading = true
  }

  private viewContact(row: any) {
    this.contactRow = Object.assign({}, row)
  }

  private async getList() {
    this.companyId = 0
    this.listLoading = true
    const { data, headers } = await getContacts(this.listQuery)
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
      const { data, headers } = await getContacts(this.listQuery)
      this.list = data
      this.total = parseInt(headers.count)
      this.listLoading = false
    } else {
      this.listQuery.searchparam = ''
      this.getList()
    }
  }

  private iconStatus(status: string) {
    if (status === 'active') {
      return 'el-icon-open'
    }

    return 'el-icon-turn-off'
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
        message: 'Contact not updated'
      })
    })
  }

  private async updateStatus(row: any) {
    const status = row.status === 'active' ? 'inactive' : 'active'
    const archivedAt = row.status === 'active' ? new Date() : ''
    await updateContact(row.id, { status: status, archived_at: archivedAt })
    this.$message({
      type: 'success',
      message: 'Contact updated'
    })
    this.getList()
  }
}
</script>
