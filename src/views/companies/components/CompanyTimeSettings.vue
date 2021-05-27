<template>
  <el-form
  ref="companyForm"
  :model="companySettingData"
  class="form-container"
  >

    <el-alert
    title="Remember"
    description="Batch time must be in UTC"
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
        <label class="float-right mt-10-px">Time Zone: </label>
      </el-col>
      <el-col :span="5" class="ml-10-px">
        <span>
          <el-input placeholder="Please input" v-model="companySettingData.timeZone"></el-input>
        </span>
      </el-col>
    </el-row>

    <el-row class="mb-10-px">
      <el-col :span="10">
        <label class="float-right mt-10-px">Batch Time: </label>
      </el-col>
      <el-col :span="5" class="ml-10-px">
        <span>
          <el-input placeholder="Please input" v-model="companySettingData.batchProcessDefaultTime"></el-input>
        </span>
      </el-col>
    </el-row>

    <el-row class="mb-10-px">
      <el-col :span="15" class="ml-10-px">
        <el-button class="float-right ml-10-px" type="primary">Update</el-button>
        <el-button class="float-right">Cancel</el-button>
      </el-col>
    </el-row>

  </el-form>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { defaultCompanySettingData, getCompany } from '@/api/companies'

@Component({
  name: 'CompanyTimeSettings',
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
