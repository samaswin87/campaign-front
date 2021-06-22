<template>
    <el-dialog
      title="Campaign Filter"
      :visible.sync="visible"
      :before-close="handleClose"
    >
      <el-form
        ref="campaignFilterForm"
        :model="filterRecord"
        label-width="30%"
      >
        <el-form-item>
          <el-radio-group v-model="filterRecord.status" size="small" class="mb-10-px" required>
              <el-radio-button label="">All</el-radio-button>
              <el-radio-button label="active">Active</el-radio-button>
              <el-radio-button label="inactive">In Active</el-radio-button>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="Platform Number">
            <el-radio-group v-model="filterRecord.phoneOption" size="small" class="mb-10-px" required>
              <el-radio-button label="equal">In Equal</el-radio-button>
              <el-radio-button label="not_equal">Is Not Equal</el-radio-button>
              <el-radio-button label="start_with">Strat With</el-radio-button>
              <el-radio-button label="end_with">End With</el-radio-button>
            </el-radio-group>
            <el-input type="text" v-model="filterRecord.phoneNumber" class="w-60-ratio"></el-input>
        </el-form-item>
        <el-form-item label="Type">
            <el-radio-group v-model="filterRecord.group" size="small" class="mb-5-px">
              <el-radio-button label="immediate">Immediate</el-radio-button>
              <el-radio-button label="scheduled">Scheduled</el-radio-button>
              <el-radio-button label="recurring">Recurring</el-radio-button>
            </el-radio-group>
        </el-form-item>
        <el-form-item label="Name">
            <el-radio-group v-model="filterRecord.nameOption" size="small" class="mb-10-px">
              <el-radio-button label="equal">In Equal</el-radio-button>
              <el-radio-button label="not_equal">Is Not Equal</el-radio-button>
              <el-radio-button label="start_with">Strat With</el-radio-button>
              <el-radio-button label="end_with">End With</el-radio-button>
            </el-radio-group>
            <el-input type="text" v-model="filterRecord.name" class="w-60-ratio"></el-input>
        </el-form-item>
        <el-form-item label="Sort By">
            <el-radio-group v-model="filterRecord.sortedBy" size="small" class="mb-10-px">
              <el-radio-button label="created_at">CreatedOn</el-radio-button>
              <el-radio-button label="scheduled_at">Scheduled At</el-radio-button>
              <el-radio-button label="recurring_at">Recurring At</el-radio-button>
              <el-radio-button label="group">Group</el-radio-button>
              <el-radio-button label="name">Name</el-radio-button>
              <el-radio-button label="company_name">Company Name</el-radio-button>
            </el-radio-group>
            <el-radio-group v-model="filterRecord.sortedOption" size="small" class="mb-10-px">
              <el-radio-button label="asc">Ascending</el-radio-button>
              <el-radio-button label="desc">Descending</el-radio-button>
            </el-radio-group>
        </el-form-item>
      </el-form>
      <div
        slot="footer"
        class="dialog-footer"
      >
        <el-button @click="close">
          {{ $t('table.cancel') }}
        </el-button>
        <el-button @click="clearFilter" type="warning" v-if="clear">
          {{ $t('table.clearFilter') }}
        </el-button>
        <el-button
          type="primary"
          @click="filterCampaign"
        >
          {{ $t('table.apply') }}
        </el-button>
      </div>
    </el-dialog>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import { Form } from 'element-ui'
import Multiselect from 'vue-multiselect'
import { getTags } from '@/api/contacts'
import { isEmpty } from 'lodash'

@Component({
  name: 'CampaignTableFilter',
  components: { Multiselect }
})
export default class extends Vue {
    @Prop({ required: true }) private visible!: boolean

    private tags:string[] = []
    private clear = false

    private filterRecord = {
      status: '',
      group: '',
      recurringDays: [],
      phoneNumber: '',
      name: '',
      sortedBy: '',
      sortedOption: 'asc',
      recurringDaysOption: '',
      phoneOption: '',
      nameOption: ''
    }

    private filterrific = {
      status_with: '',
      group_with: '',
      with_phone: '',
      with_name: '',
      with_recurring_days: '',
      sorted_by: ''
    }

    created() {
      this.fetchTags()
    }

    private async fetchTags() {
      const { data } = await getTags()
      this.tags = data
    }

    private filterCampaign() {
      (this.$refs.campaignFilterForm as Form).validate(async(valid) => {
        if (valid) {
          this.clear = true
          this.filterrific.status_with = this.filterRecord.status
          this.filterrific.group_with = this.filterRecord.group
          if (!isEmpty(this.filterRecord.sortedBy) && !isEmpty(this.filterRecord.sortedOption)) {
            this.filterrific.sorted_by = this.filterRecord.sortedBy + '_' + this.filterRecord.sortedOption
          }

          if (!isEmpty(this.filterRecord.phoneOption) && !isEmpty(this.filterRecord.phoneNumber)) {
            this.filterrific.with_phone = this.filterRecord.phoneOption + '_eq_' + this.filterRecord.phoneNumber
          }

          if (!isEmpty(this.filterRecord.nameOption) && !isEmpty(this.filterRecord.name)) {
            this.filterrific.with_name = this.filterRecord.nameOption + '_eq_' + this.filterRecord.name
          }

          if (!isEmpty(this.filterRecord.recurringDays)) {
            this.filterrific.with_recurring_days = this.filterRecord.recurringDays.join('_')
          }

          this.$emit('campaignFiltered', this.filterrific)
        }
      })
      this.$emit('update:visible', false)
    }

    private close() {
      this.$emit('update:visible', false)
    }

    handleClose() {
      this.$emit('update:visible', false)
    }

    private clearFilter() {
      this.filterRecord = {
        status: '',
        group: '',
        recurringDays: [],
        phoneNumber: '',
        name: '',
        sortedBy: '',
        sortedOption: 'asc',
        recurringDaysOption: '',
        phoneOption: '',
        nameOption: ''
      }

      this.filterrific = {
        status_with: '',
        group_with: '',
        with_phone: '',
        with_name: '',
        with_recurring_days: '',
        sorted_by: ''
      }
      this.clear = false
      this.$emit('clearFilter')
      this.$emit('update:visible', false)
    }
}
</script>

<style scoped>
  ::v-deep .multiselect__tags {
    padding: 2px 0px 0px 8px !important;
  }

  ::v-deep .multiselect__placeholder {
    margin-bottom: 0px !important;
  }
</style>
