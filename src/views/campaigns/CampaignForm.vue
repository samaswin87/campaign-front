<template>
    <div class="app-container">
        <div class="campaign-container">
            <el-row>
                <el-card class="box-card">
                    <div slot="header" class="clearfix">
                        <span>{{title}}</span>
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

                        <el-form-item :label="$t('table.campaign.scheduledOn')" label-position="right" prop="scheduledAt" v-if="scheduled">
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

                        <el-form-item :label="$t('table.campaign.recurringAt')" label-position="right" prop="recurringAt" v-if="recurring" >
                            <el-time-select
                            v-model="campaignData.recurringAt"
                            :picker-options="{
                                start: '00:00',
                                step: '00:15',
                                end: '24:00'
                            }"
                            placeholder="Select time"
                            class="w-50-ratio-i"
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
import { Component, Vue, Prop } from 'vue-property-decorator'
import { Form } from 'element-ui'
import { createCampaign, updateCampaign, defaultCampaignData, getCampaign } from '@/api/campaigns'
import { getCompanyNames } from '@/api/companies'
import { getNumbers } from '@/api/operators'
import Multiselect from 'vue-multiselect'
import { convertToHash, convertToJSON } from '@/utils/json'
import { isEmpty, filter, omit } from 'lodash'
import { TagsViewModule } from '@/store/modules/tags-view'

@Component({
  name: 'CampaignForm',
  components: { Multiselect }
})
export default class extends Vue {
    @Prop({ required: true }) private title!: string
    private campaignData:any = defaultCampaignData
    private recurringDays :string[] = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
    private groupNames :string[] = ['immediate', 'recurring', 'scheduled']
    private companies :string[] = []
    private numbers :string[] = []
    private scheduled = false
    private recurring = false
    private id = -1

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
      const id = this.$route.params && this.$route.params.id
      if (id) {
        this.id = parseInt(id)
        this.fetchCampaign()
      } else {
        this.campaignData = {
          name: '',
          scheduledAt: '',
          createdOn: '',
          message: '',
          noOfContacts: 0,
          group: 'immediate',
          recurringDays: [],
          recurringAt: ''
        }
      }
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

    private async fetchCampaign() {
      try {
        const { data } = await getCampaign(this.id, {})
        this.campaignData = convertToJSON(data)
        this.changeType(data.group)
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
        let data = this.campaignData
        if (valid) {
          if (this.title === 'New Campaign') {
            data = await createCampaign({ depository: convertToHash(this.campaignData) })
          } else if (this.id > 0) {
            const depository = omit(convertToHash(this.campaignData), ['id', 'archived_at', 'state', 'created_by_id', 'updated_by_id', 'created_at', 'updated_at', 'company_name', 'no_of_contacts', 'published_at', 'unpublished_at', 'operator', 'created_on'])
            data = await updateCampaign(this.id, { depository: depository })
          }

          if (!isEmpty(data)) {
            this.close()
          }
        }
      })
    }

    private close() {
      const name = (this.title === 'New Campaign') ? 'CampaignCreate' : 'CampaignEdit'
      const view = filter(TagsViewModule.visitedViews, ['name', name])
      TagsViewModule.delView(view[0])
      this.$router.push({ path: '/campaigns' })
    }
}
</script>
