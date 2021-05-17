<template>
    <div class="app-container">
        <div class="workflow-container">
            <el-row>
                <el-card class="box-card">
                    <div slot="header" class="clearfix">
                        <span>Show workflow</span>
                        <el-button type="primary" class="float-right"><svg-icon name="save" /></el-button>
                    </div>
                    <el-row>
                        <el-col :span="8">
                            <el-row>
                                <el-card class="box-card workflow-details">
                                    <el-form
                                    ref="workflowForm"
                                    :model="workflowData"
                                    class="form-container"
                                    >
                                        <el-row class="content-row">
                                            <el-col :span="2">
                                                <svg-icon name="company" class="svg-icon-botton"/>
                                            </el-col>
                                            <el-col :span="20">
                                                <div class="grid-value">
                                                    <el-input
                                                    v-model="workflowData.company"
                                                    disabled>
                                                    </el-input>
                                                </div>
                                            </el-col>
                                        </el-row>

                                        <el-row class="content-row">
                                            <el-col :span="2">
                                                <svg-icon name="keyword" class="svg-icon-botton"/>
                                            </el-col>
                                            <el-col :span="20">
                                                <div class="grid-value">
                                                    <span>
                                                        <el-input
                                                        v-model="workflowData.name"
                                                        disabled>
                                                        </el-input>
                                                    </span>
                                                </div>
                                            </el-col>
                                        </el-row>

                                        <el-row class="content-row">
                                            <el-col :span="2">
                                                <svg-icon name="phone" class="svg-icon-botton"/>
                                            </el-col>
                                            <el-col :span="20">
                                                <div class="grid-value">
                                                    <span>
                                                        <el-input
                                                        v-model="workflowData.phone"
                                                        disabled>
                                                        </el-input>
                                                    </span>
                                                </div>
                                            </el-col>
                                        </el-row>

                                        <el-row class="content-row">
                                            <el-col :span="20" class="content-vlaue">
                                                <div class="grid-content">
                                                    <span>
                                                        <el-switch
                                                        v-model="workflowData.confidential"
                                                        active-text="Confidential"
                                                        active-color="#ff4949"
                                                        inactive-color="#13ce66"
                                                        inactive-text="Non Confidential"
                                                        disabled
                                                        >
                                                        </el-switch>
                                                    </span>
                                                </div>
                                            </el-col>
                                        </el-row>
                                    </el-form>
                                </el-card>
                            </el-row>
                        </el-col>
                        <el-col :span="16">
                            <el-card class="box-card workflow-promt content-card">
                                <div slot="header" class="clearfix">
                                    <el-tooltip class="item" effect="dark" content="Add Promts" placement="bottom">
                                        <el-button type="primary" icon="el-icon-circle-plus" @click="addPromt"></el-button>
                                    </el-tooltip>
                                    <span class="content-space">Prompts are sent in the order they appear.</span>
                                </div>
                                <draggable
                                    :list="promtList"
                                    :key.sync="draggableList"
                                    class="dragArea"
                                    @end="updateItemOrder($event)"
                                >
                                    <div
                                    v-for="element in promtList"
                                    :key="element.order"
                                    class="list-complete-item"
                                    >
                                        <el-card shadow="hover" class="all-scroll">
                                            <svg-icon
                                            class="margin-right-10"
                                            name="drag"
                                            width="20"
                                            height="20"
                                            />
                                            <span>{{ element.body }} Order: [{{element.order}}]</span>
                                            <i class="el-icon-delete-solid float-right pointer" @click="removePromt(element)"/>
                                        </el-card>
                                    </div>
                                </draggable>
                            </el-card>
                                <el-card class="box-card workflow-promt">
                                    <div slot="header" class="clearfix">
                                        <el-button
                                            type="primary"
                                            @click="addDestination"
                                        >
                                            <svg-icon name="add-url" />
                                        </el-button>
                                        <span class="content-space">Final Response</span>
                                    </div>
                                    <span v-html="displayResponse(finalResponseData.body)"></span>
                                </el-card>
                        </el-col>
                    </el-row>
                </el-card>
            </el-row>

            <AddPromt
            :visible.sync="promtLoading"
            :order.sync="order"
            @promtRecord="addPromtRecord"
            />

            <AddDestinationURL
            :visible.sync="destinationLoading"
            @addDestinationURL="addDestinationURL"
            />
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { defaultWorkflowData, defaultFinalResponseData, getWorkflow } from '@/api/workflows'
import { getCompanies } from '@/api/companies'
import Multiselect from 'vue-multiselect'
import { map } from 'lodash'
import AddPromt from './components/AddPromt.vue'
import AddDestinationURL from './components/AddDestinationURL.vue'
import Draggable from 'vuedraggable'

@Component({
  name: 'WorkflowCreate',
  components: {
    Multiselect,
    AddPromt,
    Draggable,
    AddDestinationURL
  }
})
export default class extends Vue {
    private workflowData = defaultWorkflowData
    private finalResponseData = defaultFinalResponseData
    private companies :string[] = []
    private promtLoading = false
    private destinationLoading = false
    private promtList:any[] = []
    private draggableList = 0
    private order = 0

    created() {
      this.fetchCompanies()
      const id = this.$route.params && this.$route.params.id
      this.fetchData(parseInt(id))
    }

    private async fetchCompanies() {
      try {
        const { data } = await getCompanies({})
        this.companies = map(data.items, 'name')
      } catch (err) {
        console.error(err)
      }
    }

    private addPromt() {
      this.promtLoading = true
    }

    private addDestination() {
      this.destinationLoading = true
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

    private addDestinationURL(data: any) {
      console.log('Add destination URL to object :' + data)
    }

    private async fetchData(id: number) {
      try {
        const { data } = await getWorkflow(id, { /* Your params here */ })
        this.workflowData = data.workflow
        this.finalResponseData = data.workflow.finalResponse
        this.promtList = data.workflow.promts
        this.order = this.promtList.length
      } catch (err) {
        console.error(err)
      }
    }

    private displayResponse(body: string) {
      return body.replace('{destinationURL}', '<span class="el-tag el-tag--danger el-tag--medium el-tag--light">{destinationURL}</span>')
    }
}
</script>

<style lang="scss" scoped>

.content-card {
    margin-bottom: 2%;
}

.content-row {
    margin-bottom: 5%;
}

.content-space {
    margin-left: 10px;
}

.content-button {
    margin-left: 28px;
}

.content-vlaue {
    padding-left: 50px;
}

.svg-icon-botton {
    width: 30px !important;
    height: 30px !important;
    margin-top: 8px;
}

.all-scroll {
    cursor: all-scroll;
}

.pointer {
    cursor: pointer;
}
</style>
