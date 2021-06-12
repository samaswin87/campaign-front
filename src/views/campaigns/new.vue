<template>
    <div class="app-container">
        <div class="campaign-container">
            <el-row>
                <el-card class="box-card">
                    <div slot="header" class="clearfix">
                        <span>New campaign</span>
                    </div>
                    <el-form
                    ref="campaignForm"
                    :model="campaignData"
                    label-width="30%"
                    class="form-container">
                        <el-form-item :label="$t('table.company')" label-position="right" prop="company">
                            <el-select
                            v-model="campaignData.company"
                            filterable
                            placeholder="Select a company"
                            class="w-50-ratio">
                                <el-option
                                v-for="item in companies"
                                :key="item.id"
                                :label="item.name"
                                :value="item.id">
                                </el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item :label="$t('table.name')" label-position="right" prop="name">
                            <el-input
                            placeholder="Please add name"
                            v-model="campaignData.name"
                            class="w-50-ratio"
                            clearable>
                            </el-input>
                        </el-form-item>

                        <el-form-item label="Platform Number" label-position="right" prop="platform">
                             <el-select
                            v-model="campaignData.phone"
                            filterable
                            placeholder="Select a platform number"
                            class="w-50-ratio">
                                <el-option
                                v-for="item in numbers"
                                :key="item.id"
                                :label="item.name"
                                :value="item.id">
                                </el-option>
                            </el-select>
                        </el-form-item>

                        <el-form-item :label="$t('table.type')" label-position="right" prop="type">
                            <el-radio-group v-model="campaignData.group" @change="changeType">
                                <el-radio-button v-for="name in groupNames" :label="name" :key="name">
                                    {{name | uppercaseFirstChar}}
                                </el-radio-button>
                            </el-radio-group>
                        </el-form-item>

                        <el-form-item :label="$t('table.campaign.scheduledOn')" label-position="right" prop="scheduled_on" v-if="scheduled">
                            <el-date-picker
                            v-model="campaignData.scheduledOn"
                            type="datetime"
                            format="yyyy-MM-dd HH:mm:ss"
                            placeholder="Select date and time"
                            class="w-50-ratio"
                            :picker-options="datePickerOptions"
                            />
                        </el-form-item>

                        <el-form-item :label="$t('table.campaign.recurringDays')" label-position="right" prop="recurring_days" v-if="recurring">
                            <el-checkbox-group v-model="campaignData.recurringDays">
                                <el-checkbox-button v-for="day in recurringDays" :label="day" :key="day">
                                    {{day}}
                                </el-checkbox-button>
                            </el-checkbox-group>
                        </el-form-item>

                        <el-form-item :label="$t('table.campaign.recurringAt')" label-position="right" prop="recurring_at" v-if="recurring">
                            <el-date-picker
                            v-model="campaignData.recurringAt"
                            type="datetime"
                            format="yyyy-MM-dd HH:mm:ss"
                            placeholder="Select date and time"
                            class="w-50-ratio"
                            />
                        </el-form-item>
                        <el-form-item :label="$t('table.body')" label-position="right" prop="body">
                            <el-input
                            type="textarea"
                            :rows="10"
                            placeholder="Message"
                            class="w-50-ratio"
                            v-model="campaignData.body">
                            </el-input>
                        </el-form-item>

                        <el-form-item class="float-right w-66-ratio" >
                            <el-button>Cancel</el-button>
                            <el-button type="primary">Submit</el-button>
                        </el-form-item>
                    </el-form>
                </el-card>
            </el-row>
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { defaultCampaignData } from '@/api/campaigns'
import { getCompanyNames } from '@/api/companies'
import { getNumbers } from '@/api/operators'
import Multiselect from 'vue-multiselect'

@Component({
  name: 'CampaignCreate',
  components: { Multiselect }
})
export default class extends Vue {
    private campaignData = defaultCampaignData
    private recurringDays :string[] = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
    private groupNames :string[] = ['immediate', 'recurring', 'scheduled']
    private companies :string[] = []
    private numbers :string[] = []
    private scheduled = false
    private recurring = false

    created() {
      this.fetchCompanies()
      this.fetchNumbers()
    }

    private async fetchCompanies() {
      try {
        const { data } = await getCompanyNames()
        this.companies = data
      } catch (err) {
        console.error(err)
      }
    }

    private async fetchNumbers() {
      try {
        const { data } = await getNumbers()
        this.numbers = data
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
      } else {
        this.scheduled = false
        this.recurring = false
      }
    }

    private datePickerOptions = {
      disabledDate(time: Date) {
        return time.getTime() < Date.now() - 8.64e7
      }
    }
}
</script>
