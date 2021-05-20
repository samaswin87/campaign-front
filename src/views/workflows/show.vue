<template>
    <div class="app-container">
        <div class="workflow-container">
            <el-row>
                <el-card class="box-card">
                    <div slot="header" class="clearfix">
                        <span>Show workflow</span>
                    </div>
                    <el-row>
                        <el-col :span="24" class="margin-bottom-20">
                            <el-button :disabled="workflowSelected" @click.native="selectWorkflow"><svg-icon name="nested" /> Workflow</el-button>
                            <el-button :disabled="conversationsSelected" @click.native="selectConversation"><svg-icon name="message" /> Conversations</el-button>
                        </el-col>
                    </el-row>
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
                                                <svg-icon name="company"/>
                                            </el-col>
                                            <el-col :span="20">
                                                <div class="grid-value">
                                                    {{workflowData.company}}
                                                </div>
                                            </el-col>
                                        </el-row>

                                        <el-row class="content-row">
                                            <el-col :span="2">
                                                <svg-icon name="keyword"/>
                                            </el-col>
                                            <el-col :span="20">
                                                <div class="grid-value">
                                                    <span>
                                                        <el-tag effect="plain">
                                                            {{workflowData.name}}
                                                        </el-tag>
                                                    </span>
                                                </div>
                                            </el-col>
                                        </el-row>

                                        <el-row class="content-row">
                                            <el-col :span="2">
                                                <svg-icon name="phone"/>
                                            </el-col>
                                            <el-col :span="20">
                                                <div class="grid-value">
                                                    <span>
                                                        {{workflowData.phone}}
                                                    </span>
                                                </div>
                                            </el-col>
                                        </el-row>

                                        <el-row class="content-row">
                                            <el-col :span="2">
                                                <svg-icon :name="workflowData.confidential ? 'eye-cross' : 'eye-on'"/>
                                            </el-col>
                                            <el-col :span="20">
                                                <div class="grid-value">
                                                    <span>
                                                        {{workflowData.confidential ? 'Confidential' : 'Non Confidential'}}
                                                    </span>
                                                </div>
                                            </el-col>
                                        </el-row>

                                        <el-row class="content-row">
                                            <el-col :span="2">
                                                <svg-icon :name="workflowData.status"/>
                                            </el-col>
                                            <el-col :span="20">
                                                <div class="grid-value">
                                                    <span>
                                                        {{workflowData.status | uppercaseFirstChar}}
                                                    </span>
                                                </div>
                                            </el-col>
                                        </el-row>
                                    </el-form>
                                </el-card>
                            </el-row>
                        </el-col>
                        <el-col :span="16" v-show="workflowSelected">
                            <el-card class="box-card workflow-promt content-card">
                                <div slot="header" class="clearfix">
                                    <i class="el-icon-s-order" />
                                    <span class="content-space">PROMTS</span>
                                </div>
                                <draggable
                                    :list="promtList"
                                    :key.sync="draggableList"
                                    class="dragArea"
                                >
                                    <div
                                    v-for="element in promtList"
                                    :key="element.order"
                                    class="list-complete-item"
                                    >
                                        <el-card shadow="hover" class="all-scroll">
                                            <i class="el-icon-s-promotion margin-right-10" />
                                            <span>{{ element.body }}</span>
                                        </el-card>
                                    </div>
                                </draggable>
                            </el-card>
                                <el-card class="box-card workflow-promt">
                                    <div slot="header" class="clearfix">
                                        <i class="el-icon-message-solid" />
                                        <span class="content-space">FINAL RESPONSE</span>
                                    </div>
                                    <span v-html="displayResponse(finalResponseData.body)"></span>
                                </el-card>
                        </el-col>
                        <el-col :span="16" v-show="conversationsSelected">
                            <Conversations
                                :workFlowId.sync="workFlowId"
                            />
                        </el-col>
                    </el-row>
                </el-card>
            </el-row>
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { defaultWorkflowData, defaultFinalResponseData, getWorkflow } from '@/api/workflows'
import { getCompanies } from '@/api/companies'
import { map } from 'lodash'
import Conversations from './components/WorkflowConversations.vue'
import Draggable from 'vuedraggable'

@Component({
  name: 'WorkflowCreate',
  components: {
    Draggable,
    Conversations
  }
})
export default class extends Vue {
    private workflowData = defaultWorkflowData
    private finalResponseData = defaultFinalResponseData
    private companies :string[] = []
    private promtList:any[] = []
    private conversationList:any[] = []
    private draggableList = 0
    private order = 0
    private conversationsSelected = false
    private workflowSelected = true
    private workFlowId = 0

    created() {
      this.fetchCompanies()
      const id = this.$route.params && this.$route.params.id
      this.fetchData(parseInt(id))
      this.workFlowId = parseInt(id)
    }

    private async fetchCompanies() {
      try {
        const { data } = await getCompanies({})
        this.companies = map(data.items, 'name')
      } catch (err) {
        console.error(err)
      }
    }

    private selectWorkflow() {
      this.workflowSelected = true
      this.conversationsSelected = false
    }

    private selectConversation() {
      this.workflowSelected = false
      this.conversationsSelected = true
    }

    private async fetchData(id: number) {
      try {
        const { data } = await getWorkflow(id, { /* Your params here */ })
        this.workflowData = data.workflow
        this.finalResponseData = data.workflow.finalResponse
        this.promtList = data.workflow.promts
        this.order = this.promtList.length
        this.conversationList = data.workflow.conversations
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
</style>
