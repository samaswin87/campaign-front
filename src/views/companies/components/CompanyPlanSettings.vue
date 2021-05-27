<template>
  <el-form
  ref="companyForm"
  :model="companySettingData"
  class="form-container"
  >
    <el-row class="mb-10-px">
      <el-col :span="10">
        <label class="float-right mt-10-px">Max Campaign: </label>
      </el-col>
      <el-col :span="5" class="ml-10-px">
        <span>
          <el-input-number v-model="companySettingData.maxCampaign" :min="100" :step="100"></el-input-number>
        </span>
      </el-col>
    </el-row>

    <el-row class="mb-10-px">
      <el-col :span="10">
        <label class="float-right mt-10-px">Max Workflow: </label>
      </el-col>
      <el-col :span="5" class="ml-10-px">
        <span>
          <el-input-number v-model="companySettingData.maxWorkflow" :min="100" :step="100"></el-input-number>
        </span>
      </el-col>
    </el-row>

    <el-row class="mb-10-px">
      <el-col :span="10">
        <label class="float-right mt-10-px">Max Menu: </label>
      </el-col>
      <el-col :span="5" class="ml-10-px">
        <span>
          <el-input-number v-model="companySettingData.maxMenu" :min="100" :step="100"></el-input-number>
        </span>
      </el-col>
    </el-row>

    <el-row class="mb-10-px">
      <el-col :span="10">
        <label class="float-right mt-10-px">Max Contacts In Campaign: </label>
      </el-col>
      <el-col :span="5" class="ml-10-px">
        <span>
          <el-input-number v-model="companySettingData.maxContactsInCampaign" :min="100" :step="100"></el-input-number>
        </span>
      </el-col>
    </el-row>

    <el-row class="mb-10-px">
      <el-col :span="10">
        <label class="float-right mt-10-px">Import Workflow: </label>
      </el-col>
      <el-col :span="5" class="ml-10-px">
        <span>
          <el-radio-group v-model="companySettingData.importWorkflows">
            <el-radio-button :label="true" >Enable</el-radio-button>
            <el-radio-button :label="false" >Disable</el-radio-button>
          </el-radio-group>
        </span>
      </el-col>
    </el-row>

    <el-row class="mb-10-px">
      <el-col :span="10">
        <label class="float-right mt-10-px">Import Menu: </label>
      </el-col>
      <el-col :span="5" class="ml-10-px">
        <span>
          <el-radio-group v-model="companySettingData.importMenus">
            <el-radio-button :label="true" >Enable</el-radio-button>
            <el-radio-button :label="false" >Disable</el-radio-button>
          </el-radio-group>
        </span>
      </el-col>
    </el-row>

    <el-row class="mb-10-px">
      <el-col :span="10">
        <label class="float-right mt-10-px">Import User: </label>
      </el-col>
      <el-col :span="5" class="ml-10-px">
        <span>
          <el-radio-group v-model="companySettingData.importUsers">
            <el-radio-button :label="true" >Enable</el-radio-button>
            <el-radio-button :label="false" >Disable</el-radio-button>
          </el-radio-group>
        </span>
      </el-col>
    </el-row>

    <el-row class="mb-10-px">
      <el-col :span="10">
        <label class="float-right mt-10-px">Import Contact: </label>
      </el-col>
      <el-col :span="5" class="ml-10-px">
        <span>
          <el-radio-group v-model="companySettingData.importContacts">
            <el-radio-button :label="true" >Enable</el-radio-button>
            <el-radio-button :label="false" >Disable</el-radio-button>
          </el-radio-group>
        </span>
      </el-col>
    </el-row>

    <el-row class="mb-10-px">
      <el-col :span="10">
        <label class="float-right mt-10-px">Import Campaign: </label>
      </el-col>
      <el-col :span="5" class="ml-10-px">
        <span>
          <el-radio-group v-model="companySettingData.importCampaigns">
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
  name: 'CompanyPlanSettings',
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
