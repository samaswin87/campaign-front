<template>
  <el-form
  ref="companyForm"
  :model="companySettingData"
  class="form-container"
  >
    <el-alert
    title="Remember"
    description="We will notify the company email based on the company settings only. All settings are disabled by default"
    type="warning"
    effect="dark"
    class="mb-20-px"
    center
    show-icon
    :closable="false"
    >
    </el-alert>

    <el-row class="mb-10-px">
      <el-col :span="10">
        <label class="float-right mt-10-px">Credit Limit Notfication: </label>
      </el-col>
      <el-col :span="5" class="ml-10-px">
        <span>
          <el-radio-group v-model="companySettingData.notifyCreditLimit">
            <el-radio-button :label="true" >Enable</el-radio-button>
            <el-radio-button :label="false" >Disable</el-radio-button>
          </el-radio-group>
        </span>
      </el-col>
    </el-row>

    <el-row class="mb-10-px">
      <el-col :span="10">
        <label class="float-right mt-10-px">Add User Notification: </label>
      </el-col>
      <el-col :span="5" class="ml-10-px">
        <span>
          <el-radio-group v-model="companySettingData.notifyUserAdd">
            <el-radio-button :label="true" >Enable</el-radio-button>
            <el-radio-button :label="false" >Disable</el-radio-button>
          </el-radio-group>
        </span>
      </el-col>
    </el-row>

    <el-row class="mb-10-px">
      <el-col :span="10">
        <label class="float-right mt-10-px">Add Campaign Notification: </label>
      </el-col>
      <el-col :span="5" class="ml-10-px">
        <span>
          <el-radio-group v-model="companySettingData.notifyCampaignCreation">
            <el-radio-button :label="true" >Enable</el-radio-button>
            <el-radio-button :label="false" >Disable</el-radio-button>
          </el-radio-group>
        </span>
      </el-col>
    </el-row>

    <el-row class="mb-10-px">
      <el-col :span="10">
        <label class="float-right mt-10-px">Add Workflow Notification: </label>
      </el-col>
      <el-col :span="5" class="ml-10-px">
        <span>
          <el-radio-group v-model="companySettingData.notifyWorkflowCreation">
            <el-radio-button :label="true" >Enable</el-radio-button>
            <el-radio-button :label="false" >Disable</el-radio-button>
          </el-radio-group>
        </span>
      </el-col>
    </el-row>

    <el-row class="mb-10-px">
      <el-col :span="10">
        <label class="float-right mt-10-px">Add Menu Notification: </label>
      </el-col>
      <el-col :span="5" class="ml-10-px">
        <span>
          <el-radio-group v-model="companySettingData.notifyMenuCreation">
            <el-radio-button :label="true" >Enable</el-radio-button>
            <el-radio-button :label="false" >Disable</el-radio-button>
          </el-radio-group>
        </span>
      </el-col>
    </el-row>

  </el-form>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { defaultCompanySettingData, getCompany } from '@/api/companies'

@Component({
  name: 'CompanyNotifySettings',
  components: {
  }
})
export default class extends Vue {
    private companySettingData = defaultCompanySettingData

    created() {
      const id = this.$route.params && this.$route.params.id
      this.fetchData(parseInt(id))
    }

    private async fetchData(id: number) {
      try {
        const { data } = await getCompany(id, {})
        this.companySettingData = data.companySetting
      } catch (err) {
        console.error(err)
      }
    }
}
</script>
