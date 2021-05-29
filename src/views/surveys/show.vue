<template>
    <div class="app-container">
        <div class="survey-container">
            <el-row>
                <el-card class="box-card">
                    <div slot="header" class="clearfix">
                        <span>Show Survey</span>
                    </div>
                    <el-row>
                        <el-col :span="24" class="mb-20-px">
                            <el-button :disabled="surveySelected" @click.native="selectSurvey"><svg-icon name="nested" /> Survey</el-button>
                            <el-button :disabled="conversationsSelected" @click.native="selectConversation"><svg-icon name="message" /> Conversations</el-button>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="8">
                            <el-row>
                                <el-card class="box-card survey-details">
                                    <el-row class="mb-10-px">
                                        <el-col :span="6">
                                            <label class="float-right">Company: </label>
                                        </el-col>
                                        <el-col :span="16">
                                            <div class="ml-10-px">
                                                {{surveyData.company}}
                                            </div>
                                        </el-col>
                                    </el-row>

                                    <el-row class="mb-10-px">
                                        <el-col :span="6">
                                            <label class="float-right">Name: </label>
                                        </el-col>
                                        <el-col :span="16">
                                            <div class="ml-10-px">
                                                <span>
                                                    {{surveyData.name}}
                                                </span>
                                            </div>
                                        </el-col>
                                    </el-row>

                                        <el-row class="mb-10-px">
                                        <el-col :span="6">
                                            <label class="float-right">Description: </label>
                                        </el-col>
                                        <el-col :span="16">
                                            <div class="ml-10-px">
                                                <span>
                                                    {{surveyData.description}}
                                                </span>
                                            </div>
                                        </el-col>
                                    </el-row>
                                </el-card>
                            </el-row>
                        </el-col>
                        <el-col :span="16" v-show="surveySelected">
                            <el-card class="box-card survey-promt content-card">
                                <div slot="header" class="clearfix">
                                    <i class="el-icon-s-order" />
                                    <span class="ml-10-px">QUESTS</span>
                                </div>
                                <el-table
                                :key="tableKey"
                                ref="listQuests"
                                v-loading="listLoading"
                                :data="list"
                                row-key="id"
                                border
                                :show-header="false"
                                fit
                                highlight-current-row
                                style="width: 100%;"
                                >
                                    <el-table-column type="expand">
                                        <template slot-scope="props">
                                            <p><svg-icon name="skill" /> {{ props.row.choice1 }}</p>
                                            <p><svg-icon name="skill" /> {{ props.row.choice2 }}</p>
                                            <p><svg-icon name="skill" /> {{ props.row.choice3 }}</p>
                                            <p><svg-icon name="skill" /> {{ props.row.choice4 }}</p>
                                            <p><svg-icon name="skill" /> {{ props.row.choice5 }}</p>
                                        </template>
                                    </el-table-column>
                                    <el-table-column
                                        label="Description"
                                        min-width="150px"
                                    >
                                        <template slot-scope="{row}">
                                        <span>{{ row.description }}</span>
                                        </template>
                                    </el-table-column>
                                </el-table>
                            </el-card>
                        </el-col>
                        <el-col :span="16" v-show="conversationsSelected">
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
import { ISurveyQuestData } from '@/api/types'

@Component({
  name: 'SurveyCreate',
  components: {
  }
})
export default class extends Vue {
    private surveyData = defaultSurveyData
    private list: ISurveyQuestData[] = []
    private tableKey = 0
    private listLoading = true

    private conversationsSelected = false
    private surveySelected = true

    created() {
      const id = this.$route.params && this.$route.params.id
      this.fetchData(parseInt(id))
      this.fetchQuestData(parseInt(id))
    }

    private selectSurvey() {
      this.surveySelected = true
      this.conversationsSelected = false
    }

    private selectConversation() {
      this.surveySelected = false
      this.conversationsSelected = true
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
