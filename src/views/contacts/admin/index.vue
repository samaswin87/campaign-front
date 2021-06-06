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
              icon="el-icon-turn-off"
            >
            </el-button>
          </el-tooltip>
          <el-tooltip class="item" effect="dark" :content="$t('table.tags')" placement="bottom">
            <el-button
              style="margin-left: 10px;"
              type="primary"
              icon="el-icon-price-tag"
              @click="toggleTags"
            >
            </el-button>
          </el-tooltip>
          <el-tooltip class="item" effect="dark" :content="$t('table.contact.moveContacts')" placement="bottom">
            <el-button
              style="margin-left: 10px;"
              type="primary"
              icon="el-icon-copy-document"
              @click="toggleMove"
            >
            </el-button>
          </el-tooltip>
        </el-col>
        <el-col :span="8" class="float-right">
            <TableSearchWithFilters @handleFilter="handleFilter" />
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
        style="width: 100%;"
        @sort-change="sortChange"
      >
        <el-table-column
          :label="$t('table.id')"
          prop="row_id"
          sortable="custom"
          align="center"
          width="80"
          :class-name="getSortClass('id')"
        >
          <template slot-scope="{row}">
            <span>{{ row.row_id }}</span>
          </template>
        </el-table-column>
        <el-table-column
          :label="$t('table.contact.firstName')"
          min-width="150px"
        >
          <template slot-scope="{row}">
            <span
            >{{ row.first_name }}</span>
          </template>
        </el-table-column>
        <el-table-column
          :label="$t('table.contact.lastName')"
          min-width="150px"
        >
          <template slot-scope="{row}">
            <span
            >{{ row.last_name }}</span>
          </template>
        </el-table-column>
        <el-table-column
          :label="$t('table.company')"
          min-width="150px"
        >
          <template slot-scope="{row}">
            <span
            >{{ row.company_name }}</span>
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
            <span>{{ row.no_of_campaigns }}</span>
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
        :label="$t('table.status')"
        min-width="150px"
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
          width="230"
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
    />

    <TagsDialog
      :visible.sync="tagsLoading"
      :tagList.sync="tagList"
    />

    <MoveDialog
      :visible.sync="moveLoading"
    />
  </div>
</template>

<script lang="ts">
import { Component, Mixins } from 'vue-property-decorator'
import { getContacts, updateContact, defaultContactData } from '@/api/contacts'
import ContactTableFilters from './components/ContactTableFilters.vue'
import TagsDialog from './components/TagsDialog.vue'
import MoveDialog from './components/MoveDialog.vue'
import { IContactData } from '@/api/types'
import TableMixin from '@/views/mixins/TableMixin'

@Component({
  name: 'ContactTable',
  components: {
    ContactTableFilters,
    TagsDialog,
    MoveDialog
  }
})
export default class Contact extends Mixins(TableMixin) {
  private reloadTable = true
  private list: IContactData[] = []
  private tagsLoading = false
  private moveLoading = false
  private createRoute = 'ContactCreate'
  private importRoute = 'UploadContacts'
  private contactRow = defaultContactData
  private tagList:string[][] = []

  created() {
    this.getList()
  }

  private contactFiltered(data: any) {
    console.log(data)
  }

  private toggleTags() {
    this.tagsLoading = true
    this.tagList = [...new Set(this.list.map((result) => result.tags))]
  }

  private toggleMove() {
    this.moveLoading = true
  }

  private viewContact(row: any) {
    this.contactRow = Object.assign({}, row)
  }

  private async getList() {
    this.listLoading = true
    const { data, headers } = await getContacts(this.listQuery)
    this.list = data
    this.total = parseInt(headers.count)
    // Just to simulate the time of the request
    setTimeout(() => {
      this.listLoading = false
    }, 0.5 * 1000)
  }

  private handleFilter() {
    this.filterLoading = true
  }

  private iconStatus(status: string) {
    if (status === 'active') {
      return 'el-icon-open'
    }

    return 'el-icon-turn-off'
  }

  private handleModifyStatus(row: any, status: string) {
    this.$message({
      message: '操作成功',
      type: 'success'
    })
    row.status = status
  }

  private handleActivation(row: any) {
    this.$confirm('Are you sure?', 'Warning', {
      confirmButtonText: 'OK',
      cancelButtonText: 'Cancel',
      type: 'warning'
    }).then(() => {
      const status = row.status === 'active' ? 'inactive' : 'active'
      updateContact(row.id, { status: status })
      this.$message({
        type: 'success',
        message: 'Contact opted out'
      })
      this.getList()
    }).catch((err) => {
      console.log(err)
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
