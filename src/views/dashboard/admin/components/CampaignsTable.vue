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
        width="180px"
        align="center"
      >
        <template slot-scope="{row}">
          <span>{{ row.created_on }}</span>
        </template>
      </el-table-column>
      <el-table-column
        :label="$t('table.name')"
        min-width="150px"
      >
        <template slot-scope="{row}">
          <span
            class="link-type"
          >{{ row.name }}</span>
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

    </el-table>

  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { getCampaigns } from '@/api/campaigns'
import { ICampaignData } from '@/api/types'
import Pagination from '@/components/Pagination/index.vue'

@Component({
  name: 'CampaignTable',
  components: {
    Pagination
  }
})
export default class extends Vue {
  private list: ICampaignData[] = []
  private tableKey = 0
  private listLoading = true

  created() {
    this.getList()
  }

  private async getList() {
    this.listLoading = true
    const { data } = await getCampaigns({})
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
