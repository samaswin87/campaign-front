<template>
    <div class="app-container">
        <div class="survey-container">
            <el-row>
                <el-card class="box-card">
                    <div slot="header" class="clearfix">
                        <span>Edit Survey</span>
                    </div>
                    <el-row>
                        <el-col :span="8">
                            <el-row>
                                <el-card class="box-card survey-details">
                                    <div slot="header" class="clearfix">
                                        <span>Details</span>
                                        <el-button type="primary" class="float-right"><svg-icon name="save" /></el-button>
                                    </div>
                                    <el-form
                                    ref="surveyForm"
                                    :model="surveyData"
                                    class="form-container"
                                    >
                                        <el-row class="mb-10-px">
                                            <el-col :span="6">
                                                <label class="float-right mt-6-px">Company: </label>
                                            </el-col>
                                            <el-col :span="16">
                                                <div class="ml-10-px">
                                                    <multiselect
                                                    v-model="surveyData.company"
                                                    placeholder="Search one company"
                                                    :options="companies"
                                                    :clear-on-select="false"
                                                    :close-on-select="false"
                                                    >
                                                    </multiselect>
                                                </div>
                                            </el-col>
                                        </el-row>

                                        <el-row class="mb-10-px">
                                            <el-col :span="6">
                                                <label class="float-right mt-6-px">Name: </label>
                                            </el-col>
                                            <el-col :span="16">
                                                <div class="ml-10-px">
                                                    <span>
                                                        <el-input
                                                        placeholder="Please add name"
                                                        v-model="surveyData.name"
                                                        clearable>
                                                        </el-input>
                                                    </span>
                                                </div>
                                            </el-col>
                                        </el-row>

                                            <el-row class="mb-10-px">
                                            <el-col :span="6">
                                                <label class="float-right mt-6-px">Description: </label>
                                            </el-col>
                                            <el-col :span="16">
                                                <div class="ml-10-px">
                                                    <span>
                                                        <el-input
                                                        placeholder="Please add description"
                                                        v-model="surveyData.description"
                                                        type="textarea"
                                                        rows="5"
                                                        >
                                                        </el-input>
                                                    </span>
                                                </div>
                                            </el-col>
                                        </el-row>
                                    </el-form>
                                </el-card>
                            </el-row>
                        </el-col>
                        <el-col :span="16">
                            <el-card class="box-card survey-promt content-card">
                                <add-quest
                                :visible.sync="addFormLoading"
                                @addQuest="addQuest"/>
                                <div slot="header" class="clearfix">
                                    <svg-icon
                                    class="mr-10-px"
                                    name="list"
                                    width="20"
                                    height="20"
                                    />
                                    <span class="mr-10-px">QUESTS</span>
                                    <el-button type="primary" icon="el-icon-circle-plus" circle class="mb-10-px" @click="addQuestData"></el-button>
                                    <el-table-draggable>
                                        <el-table
                                        :key="tableKey"
                                        ref="listQuests"
                                        v-loading="listLoading"
                                        :data="list"
                                        row-key="id"
                                        @expand-change="showSave"
                                        :expand-row-keys.sync="selectedRow"
                                        border
                                        :show-header="false"
                                        fit
                                        highlight-current-row
                                        style="width: 100%;"
                                        >
                                            <el-table-column type="expand">
                                                <template slot-scope="props">
                                                    <draggable @end="updateItemOrder($event, props.row)" class="c-all-scroll">
                                                        <p><svg-icon name="skill" /> {{ props.row.choice1 }}</p>
                                                        <p><svg-icon name="skill" /> {{ props.row.choice2 }}</p>
                                                        <p><svg-icon name="skill" /> {{ props.row.choice3 }}</p>
                                                        <p><svg-icon name="skill" /> {{ props.row.choice4 }}</p>
                                                        <p><svg-icon name="skill" /> {{ props.row.choice5 }}</p>
                                                    </draggable>
                                                </template>
                                            </el-table-column>
                                            <el-table-column
                                                label="Description"
                                                min-width="150px"
                                            >
                                                <template slot-scope="{row}">
                                                <el-button type="primary" :style="{'display': row.display || 'none'}" class="float-right" circle><svg-icon name="save"></svg-icon></el-button>
                                                <span class="c-all-scroll"
                                                >{{ row.description }}</span>
                                                </template>
                                            </el-table-column>
                                        </el-table>
                                    </el-table-draggable>
                                </div>
                            </el-card>
                        </el-col>
                    </el-row>
                </el-card>
            </el-row>
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { defaultSurveyData, getSurvey, getSurveyQuests } from '@/api/surveys'
import Multiselect from 'vue-multiselect'
import { ISurveyQuestData } from '@/api/types'
import { getCompanies } from '@/api/companies'
import { map } from 'lodash'
import Draggable from 'vuedraggable'
import ElTableDraggable from 'element-ui-el-table-draggable'
import AddQuest from './admin/components/AddQuest.vue'

@Component({
  name: 'SurveyEdit',
  components: {
    Multiselect,
    Draggable,
    ElTableDraggable,
    AddQuest
  }
})
export default class extends Vue {
    private surveyData = defaultSurveyData
    private list: ISurveyQuestData[] = []
    private companies :string[] = []
    private addFormLoading = false
    private selectedRow :number[] = []
    private tableKey = 0
    private total = 0
    private listLoading = true
    private listQuery = {
      page: 1,
      limit: 20,
      title: undefined,
      type: undefined,
      sort: '+id'
    }

    created() {
      const id = this.$route.params && this.$route.params.id
      this.fetchData(parseInt(id))
      this.fetchQuestData(parseInt(id))
    }

    private showSave(row: any) {
      row.display = (row.display && row.display === 'block') ? 'none' : 'block'
    }

    private updateItemOrder(event: any, row: any) {
      this.selectedRow = []
      this.selectedRow.push(row.id)
      const oldIndex = row['choice' + (event.oldIndex + 1)]
      const newIndex = row['choice' + (event.newIndex + 1)]
      row['choice' + (event.oldIndex + 1)] = newIndex
      row['choice' + (event.newIndex + 1)] = oldIndex
    }

    private addQuest(data: any) {
      console.log(data)
    }

    private addQuestData() {
      this.addFormLoading = true
    }

    private async fetchCompanies() {
      try {
        const { data } = await getCompanies({})
        this.companies = map(data.items, 'name')
      } catch (err) {
        console.error(err)
      }
    }

    private async fetchData(id: number) {
      try {
        const { data } = await getSurvey(id, {})
        this.surveyData = data.survey
      } catch (err) {
        console.error(err)
      }
    }

    private async fetchQuestData(id: number) {
      try {
        this.listLoading = true
        const { data } = await getSurveyQuests(id, {})
        this.list = data.surveyQuests
        setTimeout(() => {
          this.listLoading = false
        }, 0.5 * 1000)
      } catch (err) {
        console.error(err)
      }
    }
}
</script>
