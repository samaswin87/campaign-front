<template>
    <div class="app-container">
        <div class="campaign-container">
            <el-row>
                <el-card class="box-card">
                    <div slot="header" class="clearfix">
                        <span>Edit Campaign</span>
                    </div>
                    <el-form
                    ref="campaignForm"
                    :model="campaignData"
                    class="form-container"
                    >
                        <el-row class="content-row">
                            <el-col :span="10" class="content-label">
                                <div class="grid-content"><label class="label-space">{{$t('table.company')}}:</label></div>
                            </el-col>
                            <el-col :span="8" class="content-vlaue">
                                <div class="grid-vlaue">
                                    <multiselect
                                    v-model="campaignData.company"
                                    placeholder="Search one company"
                                    :options="companies"
                                    :clear-on-select="false"
                                    :close-on-select="false"
                                    >
                                    </multiselect>
                                </div>
                            </el-col>
                        </el-row>

                        <el-row class="content-row">
                            <el-col :span="10" class="content-label">
                                <div class="grid-content"><label class="label-space">{{$t('table.name')}}: </label></div>
                            </el-col>
                            <el-col :span="8" class="content-vlaue">
                                <div class="grid-vlaue">
                                    <span>
                                        <el-input
                                        placeholder="Please add name"
                                        v-model="campaignData.name"
                                        clearable>
                                        </el-input>
                                    </span>
                                </div>
                            </el-col>
                        </el-row>

                        <el-row class="content-row">
                            <el-col :span="10" class="content-label">
                                <div class="grid-content"><label class="label-space">{{$t('table.type')}}: </label></div>
                            </el-col>
                            <el-col :span="8" class="content-vlaue">
                                <div class="grid-vlaue">
                                    <span>
                                        <multiselect
                                        v-model="campaignData.type"
                                        placeholder="Search one type"
                                        :options="types"
                                        :clear-on-select="false"
                                        :close-on-select="false"
                                        @input="changeType"
                                        >
                                        </multiselect>
                                    </span>
                                </div>
                            </el-col>
                        </el-row>

                        <el-row class="content-row" v-if="scheduled">
                            <el-col :span="10" class="content-label">
                                <div class="grid-content"><label class="label-space">{{$t('table.campaign.scheduledOn')}}: </label></div>
                            </el-col>
                            <el-col :span="8" class="content-vlaue">
                                <div class="grid-vlaue">
                                    <span>
                                        <el-date-picker
                                        v-model="campaignData.scheduledOn"
                                        type="datetime"
                                        format="yyyy-MM-dd HH:mm:ss"
                                        placeholder="Select date and time"
                                        class="timestamp-form"
                                        :picker-options="datePickerOptions"
                                        />
                                    </span>
                                </div>
                            </el-col>
                        </el-row>

                        <el-row class="content-row" v-if="recurring">
                            <el-col :span="10" class="content-label">
                                <div class="grid-content"><label class="label-space">{{$t('table.campaign.recurringDays')}}: </label></div>
                            </el-col>
                            <el-col :span="8" class="content-vlaue">
                                <div class="grid-vlaue">
                                    <span>
                                        <el-checkbox-group v-model="campaignData.recurringDays">
                                            <el-checkbox-button v-for="day in recurringDays" :label="day" :key="day">
                                                {{day}}
                                            </el-checkbox-button>
                                        </el-checkbox-group>
                                    </span>
                                </div>
                            </el-col>
                        </el-row>

                        <el-row class="content-row" v-if="recurring">
                            <el-col :span="10" class="content-label">
                                <div class="grid-content"><label class="label-space">{{$t('table.campaign.recurringAt')}}: </label></div>
                            </el-col>
                            <el-col :span="8" class="content-vlaue">
                                <div class="grid-vlaue">
                                    <span>
                                        <el-date-picker
                                        v-model="campaignData.recurringAt"
                                        type="datetime"
                                        format="yyyy-MM-dd HH:mm:ss"
                                        placeholder="Select date and time"
                                        class="timestamp-form"
                                        />
                                    </span>
                                </div>
                            </el-col>
                        </el-row>

                        <el-row class="content-row">
                            <el-col :span="10" class="content-label">
                                <div class="grid-content"><label class="label-space">{{$t('table.body')}}: </label></div>
                            </el-col>
                            <el-col :span="8" class="content-vlaue">
                                <div class="grid-vlaue">
                                    <span>
                                        <el-input
                                        type="textarea"
                                        :rows="10"
                                        placeholder="Message"
                                        v-model="campaignData.body">
                                        </el-input>
                                    </span>
                                </div>
                            </el-col>
                        </el-row>

                        <el-row class="content-row">
                            <el-col :span="17"  class="content-label">
                                <div class="grid-vlaue">
                                    <router-link :to="'/campaigns'">
                                        <el-button>
                                            Cancel
                                        </el-button>
                                    </router-link>
                                </div>
                            </el-col>
                            <el-col :span="2"  class="content-button">
                                <el-button type="primary">
                                    Submit
                                </el-button>
                            </el-col>
                        </el-row>
                    </el-form>
                </el-card>
            </el-row>
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { defaultCampaignData, getCampaign } from '@/api/campaigns'
import { getCompanies } from '@/api/companies'
import Multiselect from 'vue-multiselect'
import { map } from 'lodash'

@Component({
  name: 'CampaignEdit',
  components: { Multiselect }
})
export default class extends Vue {
    private campaignData = defaultCampaignData
    private companies :string[] = []
    private types :string[] = ['immediate', 'recurring', 'scheduled']
    private recurringDays :string[] = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
    private scheduled = false
    private recurring = false

    created() {
      const id = this.$route.params && this.$route.params.id
      this.fetchData(parseInt(id))
      this.fetchCompanies()
    }

    private async fetchData(id: number) {
      try {
        const { data } = await getCampaign(id, { /* Your params here */ })
        this.campaignData = data.campaign
        this.scheduled = (this.campaignData.type === 'scheduled')
        this.recurring = (this.campaignData.type === 'recurring')
      } catch (err) {
        console.error(err)
      }
    }

    private async fetchCompanies() {
      try {
        const { data } = await getCompanies({ /* Your params here */ })
        this.companies = map(data.items, 'name')
      } catch (err) {
        console.error(err)
      }
    }

    private changeType(value: string) {
      if (value === 'scheduled') {
        this.scheduled = true
        this.recurring = false
      } else if (value === 'recurring') {
        this.scheduled = false
        this.recurring = true
      }
    }

    private datePickerOptions = {
      disabledDate(time: Date) {
        return time.getTime() < Date.now() - 8.64e7
      }
    }
}
</script>

<style lang="scss" scoped>
.content-label {
    text-align: end;
}

.content-vlaue {
    margin-left: 3%;
}

.content-row {
    margin-bottom: 1%;
}

.tags {
    margin-left: 6px;
}

.content-button {
    margin-left: 28px;
}

.timestamp-form {
    width: 100%
}
</style>
