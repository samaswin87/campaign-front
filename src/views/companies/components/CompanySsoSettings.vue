<template>
  <el-form
  ref="companyForm"
  :model="companySettingData"
  class="form-container"
  >

    <el-row class="mb-10-px">
      <el-col :span="10">
        <label class="float-right mt-10-px">SSO: </label>
      </el-col>
      <el-col :span="5" class="ml-10-px">
        <span>
          <el-radio-group v-model="companySettingData.sso">
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
  name: 'CompanySsoSettings',
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
