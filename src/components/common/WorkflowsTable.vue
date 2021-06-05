<template>
  <div class="app-container">
    <el-table
      :key="tableKey"
      v-loading="listLoading"
      :data="list"
      border
      fit
      highlight-current-row
      style="width: 100%;"
    >
      <el-table-column
        :label="$t('table.id')"
        prop="id"
        align="center"
        width="80"
      >
        <template slot-scope="{row}">
          <span>{{ row.id }}</span>
        </template>
      </el-table-column>
      <el-table-column
        :label="$t('table.createdOn')"
        width="110px"
        align="center"
      >
        <template slot-scope="{row}">
          <span>{{ row.created_on }}</span>
        </template>
      </el-table-column>
      <el-table-column
        :label="$t('table.keyword')"
        min-width="100px"
      >
        <template slot-scope="{row}">
          <span
            class="link-type"
          >{{ row.keyword }}</span>
        </template>
      </el-table-column>
      <el-table-column
        :label="$t('table.noOfContacts')"
        min-width="150px"
        v-if="!dashboard"
      >
        <template slot-scope="{row}">
          <span
            class="link-type"
          >{{ row.noOfContacts }}</span>
        </template>
      </el-table-column>
      <el-table-column
        :label="$t('table.company')"
        width="280px"
        align="center"
      >
        <template slot-scope="{row}">
          <span>{{ row.company_name }}</span>
        </template>
      </el-table-column>
      <el-table-column
        :label="$t('table.status')"
        min-width="110px"
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
        class-name="fixed-width"
        v-if="action"
      >
        <el-tooltip class="item" effect="dark" content="Add to Menu Promt" placement="left">
          <el-button
            icon="el-icon-circle-plus-outline"
            type="primary"
            circle
          >
          </el-button>
        </el-tooltip>
      </el-table-column>
    </el-table>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
import { getWorkflows } from '@/api/workflows'
import { IWorkflowData } from '@/api/types'

@Component({
  name: 'WorkflowTable',
  components: {
  }
})
export default class extends Vue {
  @Prop({ required: true }) private action!: boolean
  @Prop({ required: true }) private dashboard!: boolean
  private list: IWorkflowData[] = []
  private tableKey = 0
  private listLoading = true

  created() {
    this.getList()
  }

  private async getList() {
    this.listLoading = true
    const { data } = await getWorkflows({})
    this.list = data
    // Just to simulate the time of the request
    setTimeout(() => {
      this.listLoading = false
    }, 0.5 * 1000)
  }

  private handleFilter() {
    this.getList()
  }
}
</script>
