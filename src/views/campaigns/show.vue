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
                                            <el-button type="success" size="mini">Start</el-button>
                                            <el-button type="primary" size="mini">Edit</el-button>
                                            <el-button type="danger" size="mini" icon="el-icon-delete" class="right-button"></el-button>
                                        </div>
                                        <div>
                                            <div class="grid-campaign"><i class="el-icon-office-building icon-padding"></i><span>{{campaignData.company}}</span></div>
                                            <div class="grid-campaign"><i class="el-icon-office-building icon-padding"></i><span>{{campaignData.type}}</span></div>
                                            <div class="grid-campaign"><i class="el-icon-office-building icon-padding"></i><span>{{campaignData.createdOn | parseDate}}</span></div>
                                            <div class="grid-campaign"><i class="el-icon-office-building icon-padding"></i><span>{{campaignData.createdOn | parseDate}}</span></div>
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
import RecipientsTable from '@/views/campaign-recipients/index.vue'

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
}
</script>

<style lang="scss" scoped>
.tags {
  margin-left: 6px;
}

.right-button {
    float: right;
}

.campaign-details {
    margin-right: 1%;
}

.icon-padding {
    padding-right: 10px
}

.grid-campaign {
    margin-bottom: 10px;
}
</style>
