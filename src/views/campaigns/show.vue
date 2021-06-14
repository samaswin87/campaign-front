<template>
    <div class="app-container">
        <div class="campaign-container">
            <el-row>
                <el-card class="box-card">
                    <div slot="header">
                        <span>Campaign - {{this.campaignData.name}}</span>
                    </div>
                    <div>
                        <el-row>
                            <el-col :span="6">
                                <el-row>
                                    <el-card class="box-card">
                                        <div slot="header">
                                            <el-tooltip class="item" effect="dark" :content="stateIcon(campaignData.state).content" placement="bottom">
                                                <el-button
                                                    :type="stateIcon(campaignData.state).type"
                                                    size="mini"
                                                    :icon="stateIcon(campaignData.state).icon"
                                                    @click="changeState">
                                                </el-button>
                                            </el-tooltip>
                                            <el-tooltip class="item" effect="dark" content="Edit" placement="bottom">
                                                <el-button type="info" size="mini" icon="el-icon-edit-outline" class="float-right"></el-button>
                                            </el-tooltip>
                                        </div>
                                        <div>
                                            <el-tooltip class="item" effect="dark" content="Company" placement="right">
                                                <i class="el-icon-office-building mr-10-px mb-10-px"></i>
                                            </el-tooltip>
                                            <span>{{campaignData.companyName}}</span>
                                        </div>
                                        <div>
                                            <el-tooltip class="item" effect="dark" content="Campaign Type" placement="right">
                                                <i :class="typeIcon(campaignData.group)"></i>
                                            </el-tooltip>
                                            <span>{{typeName(campaignData.group)}}</span>
                                        </div>
                                        <div v-if="campaignData.type === 'scheduled'">
                                            <el-tooltip class="item" effect="dark" content="Scheduled On" placement="right">
                                                <i class="el-icon-timer mr-10-px mb-10-px"></i>
                                            </el-tooltip>
                                            <span>{{campaignData.scheduledOn | parseTime }}</span>
                                        </div>
                                        <div v-if="campaignData.type === 'recurring'">
                                            <el-tooltip class="item" effect="dark" content="Recurring Days" placement="right">
                                                <i class="el-icon-date mr-10-px mb-10-px"></i>
                                            </el-tooltip>
                                            <span class="svg-container" v-for="day in recurringDays" :key="day">
                                                <svg-icon :name="dayIcon(day)" :class="dayIconEnable(day, campaignData.recurringDays)"/>
                                            </span>
                                        </div>
                                        <div v-if="campaignData.type === 'recurring'">
                                            <el-tooltip class="item" effect="dark" content="Recurring At" placement="right">
                                                <i class="el-icon-timer mr-10-px mb-10-px"></i>
                                            </el-tooltip>
                                            <span>{{campaignData.recurringAt | parseTime('{h}:{i}:{s}') }}</span>
                                        </div>
                                        <div>
                                            <el-tooltip class="item" effect="dark" content="Contact count" placement="right">
                                                <i class="el-icon-s-data mr-10-px mb-10-px"></i>
                                            </el-tooltip>
                                            <span>{{campaignData.noOfContacts}}</span>
                                        </div>
                                        <div>
                                            <el-tooltip class="item" effect="dark" content="Platform Number" placement="right">
                                                <i class="el-icon-phone mr-10-px mb-10-px"></i>
                                            </el-tooltip>
                                            <span>{{campaignData.operator}}</span>
                                        </div>
                                    </el-card>
                                </el-row>
                                <el-row>
                                    <el-card class="box-card campaign-details">
                                        <div slot="header">
                                            <i class="el-icon-message mr-10-px"></i>
                                            <span>Message</span>
                                        </div>
                                        <div>
                                            {{campaignData.message}}
                                        </div>
                                    </el-card>
                                </el-row>
                            </el-col>
                            <el-col :span="18">
                                <el-card class="box-card campaign-recipients">
                                    <recipients-table />
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
import { defaultCampaignData, getCampaign, updateCampaign } from '@/api/campaigns'
import RecipientsTable from '@/views/recipients/index.vue'
import { convertToJSON } from '@/utils/json'

@Component({
  name: 'CampaignView',
  components: {
    RecipientsTable
  }
})
export default class extends Vue {
    private campaignData:any = defaultCampaignData
    private recurringDays :string[] = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']

    created() {
      const id = this.$route.params && this.$route.params.id
      this.fetchData(parseInt(id))
    }

    private async fetchData(id: number) {
      try {
        const { data } = await getCampaign(id, {})
        this.campaignData = convertToJSON(data)
      } catch (err) {
        console.error(err)
      }
    }

    private typeIcon(type: string) {
      const typeMap: { [key: string]: string } = {
        scheduled: 'el-icon-time mr-10-px mb-10-px',
        immediate: 'el-icon-s-promotion mr-10-px mb-10-px',
        recurring: 'el-icon-date mr-10-px mb-10-px',
        one_by_one: 'el-icon-s-comment mr-10-px mb-10-px'
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

    private stateIcon(state: string) {
      if (!state) {
        return { icon: 'el-icon-video-play', type: 'info', content: 'Start/Publish campaign' }
      }

      const stateMap: { [key: string]: any } = {
        draft: { icon: 'el-icon-video-play', type: 'info', content: 'Start/Publish campaign' },
        published: { icon: 'el-icon-video-play', type: 'success', content: 'Stop/Unpublish campaign' },
        unpublished: { icon: 'el-icon-video-pause', type: 'danger', content: 'Start/Publish campaign again' }
      }
      return stateMap[state]
    }

    private dayIconEnable(day: any, recurringDays: string[]) {
      return recurringDays.includes(day) ? 'svg-padding svg-color' : 'svg-padding'
    }

    private async changeState() {
      try {
        const { data } = await updateCampaign(this.campaignData.id, { state: true })
        this.campaignData = convertToJSON(data)
      } catch (err) {
        console.error(err)
      }
    }
}
</script>
