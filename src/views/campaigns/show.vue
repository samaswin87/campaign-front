<template>
    <div class="app-container">
        <div class="campaign-container">
            <el-row>
                <el-card class="box-card">
                    <div slot="header" class="clearfix">
                        <span>Campaign</span>
                    </div>
                    <div>
                        <el-row>
                            <el-col :span="6">
                                <el-row>
                                    <el-card class="box-card campaign-details">
                                        <div slot="header" class="clearfix">
                                            <el-tooltip class="item" effect="dark" content="Start/Publish campaign" placement="bottom">
                                                <el-button type="success" size="mini" icon="el-icon-video-play"></el-button>
                                            </el-tooltip>
                                            <el-tooltip class="item" effect="dark" content="Edit" placement="bottom">
                                                <el-button type="info" size="mini" icon="el-icon-edit-outline" class="right-button"></el-button>
                                            </el-tooltip>
                                        </div>
                                        <div>
                                            <div class="grid-campaign">
                                                <el-tooltip class="item" effect="dark" content="Company" placement="right">
                                                    <i class="el-icon-office-building icon-padding"></i>
                                                </el-tooltip>
                                                <span>{{campaignData.company}}</span>
                                            </div>
                                            <div class="grid-campaign">
                                                <el-tooltip class="item" effect="dark" content="Campaign Type" placement="right">
                                                    <i :class="typeIcon(campaignData.type)"></i>
                                                </el-tooltip>
                                                <span>{{typeName(campaignData.type)}}</span>
                                            </div>
                                            <div class="grid-campaign">
                                                <el-tooltip class="item" effect="dark" content="Contact count" placement="right">
                                                    <i class="el-icon-s-data icon-padding"></i>
                                                </el-tooltip>
                                                <span>{{campaignData.noOfContacts}}</span>
                                            </div>
                                            <div class="grid-campaign">
                                                <el-tooltip class="item" effect="dark" content="Phone" placement="right">
                                                    <i class="el-icon-office-building icon-padding"></i>
                                                </el-tooltip>
                                                <span>{{campaignData.phone}}</span>
                                            </div>
                                        </div>
                                    </el-card>
                                </el-row>
                                <el-row>
                                    <el-card class="box-card campaign-details">
                                        <div slot="header" class="clearfix">
                                            <i class="el-icon-message icon-padding"></i>
                                            <span>Message</span>
                                        </div>
                                        <div>
                                            {{campaignData.body}}
                                        </div>
                                    </el-card>
                                </el-row>
                            </el-col>
                            <el-col :span="18">
                                <el-card class="box-card campaign-recipients">
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
import { defaultCampaignData, getCampaign } from '@/api/campaigns'
import RecipientsTable from '@/views/recipients/index.vue'

@Component({
  name: 'CampaignView',
  components: {
    RecipientsTable
  }
})
export default class extends Vue {
    private campaignData = defaultCampaignData

    created() {
      const id = this.$route.params && this.$route.params.id
      this.fetchData(parseInt(id))
    }

    private async fetchData(id: number) {
      try {
        const { data } = await getCampaign(id, { /* Your params here */ })
        this.campaignData = data.campaign
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
}
</script>

<style lang="scss" scoped>
.tags {
  margin-left: 6px;
}

.campaign-details {
    margin-right: 1%;
}

.icon-padding {
    padding-right: 10px
}

.right-button {
    float: right;
}

.grid-campaign {
    margin-bottom: 10px;
}
</style>
