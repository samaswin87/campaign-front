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
                    :rules="rules"
                    label-width="30%"
                    class="form-container">
                        <el-form-item :label="$t('table.company')" label-position="right" prop="companyId">
                            <el-select
                            v-model="campaignData.companyId"
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

                        <el-form-item label="Platform Number" label-position="right" prop="operatorId">
                             <el-select
                            v-model="campaignData.operatorId"
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

                        <el-form-item :label="$t('table.type')" label-position="right" prop="group">
                            <el-radio-group v-model="campaignData.group" @change="changeType">
                                <el-radio-button v-for="name in groupNames" :label="name" :key="name">
                                    {{name | uppercaseFirstChar}}
                                </el-radio-button>
                            </el-radio-group>
                        </el-form-item>

                        <el-form-item :label="$t('table.campaign.scheduledAt')" label-position="right" prop="scheduledAt" v-if="scheduled">
                            <el-date-picker
                            v-model="campaignData.scheduledAt"
                            type="datetime"
                            format="yyyy-MM-dd HH:mm:ss"
                            placeholder="Select date and time"
                            class="w-50-ratio"
                            :picker-options="datePickerOptions"
                            />
                        </el-form-item>

                        <el-form-item :label="$t('table.campaign.recurringDays')" label-position="right" prop="recurringDays" v-if="recurring">
                            <el-checkbox-group v-model="campaignData.recurringDays">
                                <el-checkbox-button v-for="day in recurringDays" :label="day" :key="day">
                                    {{day}}
                                </el-checkbox-button>
                            </el-checkbox-group>
                        </el-form-item>

                        <el-form-item :label="$t('table.campaign.recurringAt')" label-position="right" prop="recurringAt" v-if="recurring">
                            <el-time-select
                            v-model="campaignData.recurringAt"
                            :picker-options="{
                                start: '00:00',
                                step: '00:15',
                                end: '24:00'
                            }"
                            placeholder="Select time"
                            class="w-50-ratio"
                            />
                        </el-form-item>
                        <el-form-item :label="$t('table.body')" label-position="right" prop="message">
                            <el-input
                            type="textarea"
                            :rows="10"
                            placeholder="Message"
                            class="w-50-ratio"
                            v-model="campaignData.message">
                            </el-input>
                        </el-form-item>

                        <el-form-item class="float-right w-66-ratio" >
                            <el-button @click="close">Cancel</el-button>
                            <el-button type="primary" @click="submitForm">Submit</el-button>
                        </el-form-item>
                    </el-form>
                </el-card>
            </el-row>
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { Form } from 'element-ui'
import { createCampaign, defaultCampaignData } from '@/api/campaigns'
import { getCompanyNames } from '@/api/companies'
import { getNumbers } from '@/api/operators'
import Multiselect from 'vue-multiselect'
import { convertToHash } from '@/utils/json'
import { isEmpty, filter } from 'lodash'
import { TagsViewModule } from '@/store/modules/tags-view'

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

    private rules = {
      companyId: [
        { required: true, message: 'Please select a valid company', trigger: 'blur' }
      ],
      name: [
        { required: true, message: 'Please input name', trigger: 'blur' },
        { min: 3, message: 'Length should be more than 3', trigger: 'blur' }
      ],
      operatorId: [
        { required: true, message: 'Please select a valid number', trigger: 'blur' }
      ],
      message: [
        { required: true, message: 'Please add a message', trigger: 'blur' }
      ],
      recurringDays: [
        { required: true, validator: this.validateRecurringDays, trigger: 'blur' }
      ],
      recurringAt: [
        { required: true, validator: this.validateRecurringAt, trigger: 'blur' }
      ],
      scheduledAt: [
        { required: true, validator: this.validateScheduledOn, trigger: 'blur' }
      ]
    }

    created() {
      this.fetchCompanies()
      this.fetchNumbers()
    }

    private validateRecurringDays(rule, value, callback) {
      if (value.length === 0 && this.recurring) {
        callback(new Error('Please select valid recurring days'))
      } else {
        callback()
      }
    }

    private validateRecurringAt(rule, value, callback) {
      if (value === '' && this.recurring) {
        callback(new Error('Please select the time'))
      } else {
        callback()
      }
    }

    private validateScheduledOn(rule, value, callback) {
      if (value === '' && this.scheduled) {
        callback(new Error('Please select the date & time'))
      } else {
        callback()
      }
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

    private async submitForm() {
      (this.$refs.campaignForm as Form).validate(async(valid) => {
        if (valid) {
          const data = await createCampaign({ depository: convertToHash(this.campaignData) })
          console.log(data)
          if (!isEmpty(data)) {
            this.close()
          }
        }
      })
    }

    private close() {
      const name = 'CampaignCreate'
      const view = filter(TagsViewModule.visitedViews, ['name', name])
      TagsViewModule.delView(view[0])
      this.$router.push({ path: '/campaigns' })
    }
}
</script>
