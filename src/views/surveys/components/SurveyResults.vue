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
        <el-col :span="10" class="float-right">
          <TableSearchWithFilters @handleFilter="handleFilter" />
        </el-col>
      </el-row>
    </div>

    <el-table
      ref="resultTable"
      :key="tableKey"
      :data.sync="results"
      border
      fit
      highlight-current-row
      height="650"
      style="width: 100%;"
      default-expand-all=true
      @sort-change="sortChange"
    >
      <el-table-column type="expand">
        <template slot-scope="props">
          <p v-if="props.row.choice1"><svg-icon color="#42b983" name="skill"></svg-icon> {{ props.row.choice1 }}</p>
          <p v-if="props.row.choice2"><svg-icon color="#42b983" name="skill"></svg-icon> {{ props.row.choice2 }}</p>
          <p v-if="props.row.choice3"><svg-icon color="#42b983" name="skill"></svg-icon> {{ props.row.choice3 }}</p>
          <p v-if="props.row.choice4"><svg-icon color="#42b983" name="skill"></svg-icon> {{ props.row.choice4 }}</p>
          <p v-if="props.row.choice5"><svg-icon color="#42b983" name="skill"></svg-icon> {{ props.row.choice5 }}</p>
          <p v-if="!props.row.choice1 && !props.row.choice2 && !props.row.choice3 && !props.row.choice4 && !props.row.choice5 "><svg-icon color="red" name="skill" /> Not Answered</p>
        </template>
      </el-table-column>
      <el-table-column
        label="Contact"
      >
        <template slot-scope="{row}">
          <span
          >{{ row.contact }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="Description"
        min-width="150px"
      >
        <template slot-scope="{row}">
        <span>{{ row.surveyQuest }}</span>
        </template>
      </el-table-column>
    </el-table>

    <ResultsTableFilters
      :visible.sync="filterLoading"
      @resultFiltered="resultFiltered"
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
import { Component, Vue } from 'vue-property-decorator'
import { getSurveyResults } from '@/api/surveys'
import { ISurveyResultsData } from '@/api/types'
import Pagination from '@/components/Pagination/index.vue'
import TableSearchWithFilters from '@/components/common/TableSearchWithFilters.vue'
import ResultsTableFilters from './ResultsTableFilters.vue'

@Component({
  name: 'SurveyResults',
  components: {
    Pagination,
    TableSearchWithFilters,
    ResultsTableFilters
  }
})

export default class extends Vue {
  private tableKey = 0
  private total = 0
  private results: ISurveyResultsData[] = []
  private surveyId = 0
  private listLoading = true
  private filterLoading = false
  private listQuery = {
    page: 1,
    limit: 20,
    sort: '+id'
  }

  private resultFiltered(data: any) {
    console.log(data)
  }

  created() {
    const id = this.$route.params && this.$route.params.id
    this.surveyId = parseInt(id)
    this.getList()
  }

  private async getList() {
    this.listLoading = true
    const { data } = await getSurveyResults(this.surveyId, this.listQuery)
    this.results = data.items
    this.total = data.total
    // Just to simulate the time of the request
    setTimeout(() => {
      this.listLoading = false
    }, 0.5 * 1000)
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
