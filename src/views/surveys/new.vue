<template>
    <div class="app-container">
        <div class="survey-container">
            <el-row>
                <el-card class="box-card">
                    <div slot="header" class="clearfix">
                        <span>New Survey</span>
                    </div>
                    <el-row>
                        <el-col :span="24">
                            <el-row>
                                <el-form
                                ref="surveyForm"
                                :model="surveyData"
                                class="form-container"
                                >
                                    <el-row class="mb-10-px">
                                        <el-col :span="8">
                                            <label class="float-right mt-6-px">Company: </label>
                                        </el-col>
                                        <el-col :span="6">
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
                                        <el-col :span="8">
                                            <label class="float-right mt-6-px">Name: </label>
                                        </el-col>
                                        <el-col :span="6">
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
                                        <el-col :span="8">
                                            <label class="float-right mt-6-px">Description: </label>
                                        </el-col>
                                        <el-col :span="6">
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

                                    <el-row class="mb-10-px">
                                        <el-col :span="14">
                                            <div class="ml-10-px">
                                                <span class="float-right">
                                                    <el-button >Cancel</el-button>
                                                    <el-button type="primary">Primary</el-button>
                                                </span>
                                            </div>
                                        </el-col>
                                    </el-row>
                                </el-form>
                            </el-row>
                        </el-col>
                    </el-row>
                </el-card>
            </el-row>
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { defaultSurveyData } from '@/api/surveys'
import { getCompanies } from '@/api/companies'
import Multiselect from 'vue-multiselect'
import { map } from 'lodash'
import Draggable from 'vuedraggable'

@Component({
  name: 'SurveyCreate',
  components: {
    Multiselect,
    Draggable
  }
})
export default class extends Vue {
    private surveyData = defaultSurveyData
    private companies :string[] = []
    private destinationLoading = false
    private promtList:any[] = []
    private draggableList = 0
    private order = 0

    created() {
      this.fetchCompanies()
      this.promtList.push({
        name: 'Name',
        defualt: '',
        body: 'Keyword1',
        order: 0
      })

      this.promtList.push({
        name: 'Gender',
        defualt: 'Male',
        body: 'Keyword2',
        order: 1
      })

      this.promtList.push({
        name: 'Country',
        defualt: '',
        body: 'Keyword3',
        order: 2
      })
      this.order = this.promtList.length
    }

    private async fetchCompanies() {
      try {
        const { data } = await getCompanies({})
        this.companies = map(data.items, 'name')
      } catch (err) {
        console.error(err)
      }
    }

    private addPromtRecord(data: any) {
      this.promtList.push(data)
      this.order = this.promtList.length
      this.draggableList += 1
    }

    private removePromt(element: any) {
      const index = this.promtList.indexOf(element)
      this.promtList.splice(index, 1)
      this.order = this.promtList.length
    }

    private updateItemOrder(event: any) {
      console.log('Old Index: ' + event.oldIndex)
      console.log('New Index: ' + event.newIndex)
    }
}
</script>
