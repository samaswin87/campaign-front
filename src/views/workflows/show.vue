<template>
    <div class="app-container">
        <div class="workflow-container">
            <el-row>
                <el-card class="box-card">
                    <div slot="header" class="clearfix">
                        <span>Workflow</span>
                    </div>
                    <div>
                        <el-row>
                            <el-col :span="6">
                                <el-row>
                                    <el-card class="box-card workflow-details">
                                        <div slot="header" class="clearfix">
                                            <el-tooltip class="item" effect="dark" content="Start/Publish workflow" placement="bottom">
                                                <el-button type="success" size="mini" icon="el-icon-video-play"></el-button>
                                            </el-tooltip>
                                            <el-tooltip class="item" effect="dark" content="Edit" placement="bottom">
                                                <el-button type="info" size="mini" icon="el-icon-edit-outline" class="right-button"></el-button>
                                            </el-tooltip>
                                        </div>
                                        <div>
                                            <div class="grid-workflow">
                                                <el-tooltip class="item" effect="dark" content="Company" placement="right">
                                                    <i class="el-icon-office-building icon-padding"></i>
                                                </el-tooltip>
                                                <span>{{workflowData.company}}</span>
                                            </div>
                                            <div class="grid-workflow">
                                                <el-tooltip class="item" effect="dark" content="Workflow Type" placement="right">
                                                    <i :class="typeIcon(workflowData.type)"></i>
                                                </el-tooltip>
                                                <span>{{typeName(workflowData.type)}}</span>
                                            </div>
                                            <div class="grid-workflow" v-if="workflowData.type === 'scheduled'">
                                                <el-tooltip class="item" effect="dark" content="Scheduled On" placement="right">
                                                    <i class="el-icon-timer icon-padding"></i>
                                                </el-tooltip>
                                                <span>{{workflowData.scheduledOn | parseTime }}</span>
                                            </div>
                                            <div class="grid-workflow" v-if="workflowData.type === 'recurring'">
                                                <el-tooltip class="item" effect="dark" content="Recurring Days" placement="right">
                                                    <i class="el-icon-date icon-padding"></i>
                                                </el-tooltip>
                                                <span class="svg-container" v-for="day in recurringDays" :key="day">
                                                    <svg-icon :name="dayIcon(day)" :class="dayIconEnable(day, workflowData.recurringDays)"/>
                                                </span>
                                            </div>
                                            <div class="grid-workflow" v-if="workflowData.type === 'recurring'">
                                                <el-tooltip class="item" effect="dark" content="Recurring At" placement="right">
                                                    <i class="el-icon-timer icon-padding"></i>
                                                </el-tooltip>
                                                <span>{{workflowData.recurringAt | parseTime('{h}:{i}:{s}') }}</span>
                                            </div>
                                            <div class="grid-workflow">
                                                <el-tooltip class="item" effect="dark" content="Contact count" placement="right">
                                                    <i class="el-icon-s-data icon-padding"></i>
                                                </el-tooltip>
                                                <span>{{workflowData.noOfContacts}}</span>
                                            </div>
                                            <div class="grid-workflow">
                                                <el-tooltip class="item" effect="dark" content="Platform Number" placement="right">
                                                    <i class="el-icon-phone icon-padding"></i>
                                                </el-tooltip>
                                                <span>{{workflowData.phone}}</span>
                                            </div>
                                        </div>
                                    </el-card>
                                </el-row>
                                <el-row>
                                    <el-card class="box-card workflow-details">
                                        <div slot="header" class="clearfix">
                                            <i class="el-icon-message icon-padding"></i>
                                            <span>Message</span>
                                        </div>
                                        <div>
                                            {{workflowData.body}}
                                        </div>
                                    </el-card>
                                </el-row>
                            </el-col>
                            <el-col :span="18">
                                <el-card class="box-card workflow-recipients">
                                    <RecipientsTable />
                                </el-card>
                            </el-col>
                        </el-row>
                    </div>
                </el-card>
            </el-row>
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { defaultWorkflowData, getWorkflow } from '@/api/workflows'
import RecipientsTable from '@/views/recipients/index.vue'

@Component({
  name: 'WorkflowView',
  components: {
    RecipientsTable
  }
})
export default class extends Vue {
    private workflowData = defaultWorkflowData
    private recurringDays :string[] = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']

    created() {
      const id = this.$route.params && this.$route.params.id
      this.fetchData(parseInt(id))
    }

    private async fetchData(id: number) {
      try {
        const { data } = await getWorkflow(id, { /* Your params here */ })
        this.workflowData = data.workflow
      } catch (err) {
        console.error(err)
      }
    }

    private typeIcon(type: string) {
      const typeMap: { [key: string]: string } = {
        scheduled: 'el-icon-time icon-padding',
        immediate: 'el-icon-s-promotion icon-padding',
        recurring: 'el-icon-date icon-padding',
        one_by_one: 'el-icon-s-comment icon-padding'
      }
      return typeMap[type]
    }

    private typeName(type: string) {
      const typeMap: { [key: string]: string } = {
        scheduled: 'Schedule: Pick a date and time to send',
        immediate: 'Immediate: Send all messages now',
        recurring: 'Recurring: Send a message over and over',
        one_by_one: 'One-by-One: Send each message manually'
      }
      return typeMap[type]
    }

    private dayIcon(day: string) {
      const dayMap: { [key: string]: string } = {
        Mon: 'Monday',
        Tue: 'Tuesday',
        Wed: 'Wednesday',
        Thu: 'Thursday',
        Fri: 'Friday',
        Sat: 'Saturday',
        Sun: 'Sunday'
      }
      return dayMap[day]
    }

    private dayIconEnable(day: any, recurringDays: string[]) {
      return recurringDays.includes(day) ? 'svg-padding svg-color' : 'svg-padding'
    }
}
</script>

<style lang="scss" scoped>
.tags {
  margin-left: 6px;
}

.workflow-details {
    margin-right: 1%;
}

.icon-padding {
    padding-right: 10px
}

.right-button {
    float: right;
}

.grid-workflow {
    margin-bottom: 10px;
}

.svg-container {
    padding: 6px 5px 6px 0px;
    vertical-align: middle;
    width: 40px;
    display: inline-block;
  }

.svg-color {
    color: #42b983;
}

.svg-padding {
    width: 2.5em !important;
    height: 2.5em !important;
}
</style>
