<template>
    <div class="app-container">
        <div class="campaign-container">
            <el-row>
                <el-card class="box-card">
                    <div slot="header" class="clearfix">
                        <span>Campaign</span>
                    </div>
                    <div>
                        <el-row class="campaign-row">
                            <el-col :span="10" class="campaign-label">
                                <div class="grid-campaign"><label class="label-space">{{$t('table.status')}}:</label></div>
                            </el-col>
                            <el-col :span="10" class="campaign-vlaue">
                                <div class="grid-campaign">
                                    <span>
                                        <el-tag effect="dark" :type="campaignData.status | statusFilter">
                                            {{ campaignData.status }}
                                        </el-tag>
                                    </span>
                                </div>
                            </el-col>
                        </el-row>
                        <el-row class="campaign-row">
                            <el-col :span="10" class="campaign-label">
                                <div class="grid-campaign"><label class="label-space">{{$t('table.company')}}:</label></div>
                            </el-col>
                            <el-col :span="10" class="campaign-vlaue">
                                <div class="grid-campaign"><span>{{campaignData.company}}</span></div>
                            </el-col>
                        </el-row>

                        <el-row class="campaign-row">
                            <el-col :span="10" class="campaign-label">
                                <div class="grid-campaign"><label class="label-space">{{$t('table.name')}}: </label></div>
                            </el-col>
                            <el-col :span="10" class="campaign-vlaue">
                                <div class="grid-campaign"><span>{{campaignData.name}}</span></div>
                            </el-col>
                        </el-row>

                        <el-row class="campaign-row">
                            <el-col :span="10" class="campaign-label">
                                <div class="grid-campaign"><label class="label-space">{{$t('table.campaign.noOfContacts')}}: </label></div>
                            </el-col>
                            <el-col :span="10" class="campaign-vlaue">
                                <div class="grid-campaign"><span>{{campaignData.noOfContacts}}</span></div>
                            </el-col>
                        </el-row>

                        <el-row class="campaign-row">
                            <el-col :span="10" class="campaign-label">
                                <div class="grid-campaign"><label class="label-space">{{$t('table.type')}}: </label></div>
                            </el-col>
                            <el-col :span="10" class="campaign-vlaue">
                                <div class="grid-campaign">
                                    <span>
                                        <el-tag effect="dark" :type="campaignData.type | campaignTypeFilter">
                                            {{ campaignData.type }}
                                        </el-tag>
                                    </span>
                                </div>
                            </el-col>
                        </el-row>

                        <el-row class="campaign-row">
                            <el-col :span="10" class="campaign-label">
                                <div class="grid-campaign"><label class="label-space">{{$t('table.createdOn')}}: </label></div>
                            </el-col>
                            <el-col :span="10" class="campaign-vlaue">
                                <div class="grid-campaign"><span>{{campaignData.createdOn | parseDate}}</span></div>
                            </el-col>
                        </el-row>

                        <el-row class="campaign-row">
                            <el-col :span="10" class="campaign-label">
                                <div class="grid-campaign"><label class="label-space">{{$t('table.campaign.scheduledOn')}}: </label></div>
                            </el-col>
                            <el-col :span="10" class="campaign-vlaue">
                                <div class="grid-campaign"><span>{{campaignData.scheduledOn | parseTime}}</span></div>
                            </el-col>
                        </el-row>

                        <el-row class="campaign-row">
                            <el-col :span="12"  class="campaign-label">
                                <div class="grid-campaign">
                                    <router-link :to="'/campaigns'">
                                        <el-button type="primary" icon="el-icon-caret-left">
                                            Back
                                        </el-button>
                                    </router-link>
                                </div>
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

@Component({
  name: 'CampaignView'
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
.campaign-label {
    text-align: end;
}

.campaign-vlaue {
    margin-left: 3%;
}

.campaign-row {
    margin-bottom: 1%;
}

.tags {
  margin-left: 6px;
}
</style>
