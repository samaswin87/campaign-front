<template>
  <el-form
  ref="companyForm"
  :model="companySettingData"
  class="form-container"
  >

    <el-row class="mb-10-px">
      <el-col :span="10">
        <label class="float-right mt-6-px">Message Platform: </label>
      </el-col>
      <el-col :span="5" class="ml-10-px">
        <span>
          <el-radio-group v-model="companySettingData.messagingPlatform">
            <el-radio-button label="Twilio" >Twilio</el-radio-button>
            <el-radio-button label="Broadcast" >Broadcast</el-radio-button>
          </el-radio-group>
        </span>
      </el-col>
    </el-row>

    <el-row class="mb-10-px">
      <el-col :span="10">
        <label class="float-right mt-6-px">ShortCode: </label>
      </el-col>
      <el-col :span="5" class="ml-10-px">
        <span>
          <el-radio-group v-model="companySettingData.useShortCode">
            <el-radio-button :label="true" >Enabled</el-radio-button>
            <el-radio-button :label="false" >Disabled</el-radio-button>
          </el-radio-group>
        </span>
      </el-col>
    </el-row>

    <el-row class="mb-10-px">
      <el-col :span="10">
        <label class="float-right mt-6-px">Destination Link: </label>
      </el-col>
      <el-col :span="5" class="ml-10-px">
        <span>
          <el-radio-group v-model="companySettingData.useDestinationLink" class="w-100-ratio">
            <el-radio-button :label="true" >Enabled</el-radio-button>
            <el-radio-button :label="false" >Disabled</el-radio-button>
          </el-radio-group>
        </span>
      </el-col>
    </el-row>

    <el-row class="mb-10-px">
      <el-col :span="10">
        <label class="float-right mt-8-px">Message Length: </label>
      </el-col>
      <el-col :span="5" class="ml-10-px">
        <span>
          <el-input-number v-model="companySettingData.messageLength" :min="300" :step="100"></el-input-number>
        </span>
      </el-col>
    </el-row>

    <el-row class="mb-10-px">
      <el-col :span="14">
        <el-button class="float-right mx-25-px" type="primary">Update</el-button>
        <el-button class="float-right">Cancel</el-button>
      </el-col>
    </el-row>

  </el-form>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { defaultCompanySettingData, getCompany } from '@/api/companies'

@Component({
  name: 'CompanyCommonSettings',
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
