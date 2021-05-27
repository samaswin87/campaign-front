<template>
    <el-row>
        <el-col :span="24">
          <el-tabs tab-position="top" class="details-header" type="border-card">
            <el-tab-pane label="Settings">
              <el-form
              ref="companyForm"
              :model="companySettingData"
              class="form-container"
              >

                <el-row class="mb-10-px">
                  <el-col :span="10">
                    <label class="float-right mt-80-px">Logo: </label>
                  </el-col>
                  <el-col :span="5" class="ml-10-px">
                    <span>
                        <el-upload
                          drag
                          action="#">
                          <i class="el-icon-upload"></i>
                          <div class="el-upload__text">Drop file here or <em>click to upload</em></div>
                          <div class="el-upload__tip" slot="tip">jpg/png files with a size less than 500kb</div>
                        </el-upload>
                    </span>
                  </el-col>
                </el-row>

                <el-row class="mb-10-px">
                  <el-col :span="10">
                    <label class="float-right mt-6-px">Plan Start Date: </label>
                  </el-col>
                  <el-col :span="5" class="ml-10-px">
                    <span>
                        <el-date-picker
                        class="w-ratio-100-i"
                        suffix-icon="el-icon-date"
                        v-model="companySettingData.planStartDate">
                        </el-date-picker>
                    </span>
                  </el-col>
                </el-row>

                <el-row class="mb-10-px">
                  <el-col :span="10">
                    <label class="float-right mt-6-px">Plan End Date: </label>
                  </el-col>
                  <el-col :span="5" class="ml-10-px">
                    <span>
                        <el-date-picker
                        class="w-ratio-100-i"
                        suffix-icon="el-icon-date"
                        v-model="companySettingData.planEndDate"
                        clearable>
                        </el-date-picker>
                    </span>
                  </el-col>
                </el-row>

                <el-row class="mb-10-px">
                  <el-col :span="10">
                    <label class="float-right mt-6-px">Address: </label>
                  </el-col>
                  <el-col :span="5" class="ml-10-px">
                    <span>
                        <el-input
                        type="textarea"
                        rows="5"
                        v-model="companySettingData.companyAddress"
                        clearable>
                        </el-input>
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
            </el-tab-pane>
            <el-tab-pane label="Platfrom">Platform</el-tab-pane>
            <el-tab-pane label="SSO">SSO</el-tab-pane>
            <el-tab-pane label="Notification">Notify</el-tab-pane>
            <el-tab-pane label="Plan">Plan</el-tab-pane>
            <el-tab-pane label="TimeZone">TimeZone</el-tab-pane>
          </el-tabs>
        </el-col>
    </el-row>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { defaultCompanySettingData, getCompany } from '@/api/companies'

@Component({
  name: 'CompanySettings',
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

<style lang="scss" scoped>
::v-deep .el-upload-dragger {
  width: 141% !important;
}
</style>
