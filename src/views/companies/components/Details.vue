<template>
    <el-card class="box-card w-ratio-70">
        <div slot="header" class="clearfix">
            <span>Details</span>
        </div>
        <div class="company-details">
            <el-row class="mb-10-px">
                <el-col :span="10" class="text-right fw-b">
                    <span>{{$t('table.name')}}:</span>
                </el-col>
                <el-col :span="12" class="text-left ml-20-px">
                    <span>{{companyData.name}}</span>
                </el-col>
            </el-row>

            <el-row class="mb-10-px">
                <el-col :span="10" class="text-right fw-b">
                    <span>{{$t('table.phone')}}:</span>
                </el-col>
                <el-col :span="12" class="text-left ml-20-px">
                    <span>{{companyData.phone}}</span>
                </el-col>
            </el-row>

            <el-row class="mb-10-px">
                <el-col :span="10" class="text-right fw-b">
                    <span>{{$t('table.email')}}:</span>
                </el-col>
                <el-col :span="12" class="text-left ml-20-px">
                    <span>{{companyData.email}}</span>
                </el-col>
            </el-row>

            <el-divider class="mb-30-px divider-text-color"> Curent Plan </el-divider>
            <el-row class="mb-10-px">
                <el-col :span="10" class="text-right fw-b mt-10-px">
                    <span>{{$t('table.companies.plan')}}:</span>
                </el-col>
                <el-col :span="12" class="text-left ml-20-px">
                    <span>
                        <el-tag
                        :type="planFilter(companyData.plan)"
                        effect="dark">
                            {{companyData.plan}}
                        </el-tag>
                        <el-tooltip class="item" effect="dark" content="Upgrade Plan" placement="top">
                            <el-button class="ml-5-px" circle>
                                <svg-icon name="upgrade"></svg-icon>
                            </el-button>
                        </el-tooltip>
                    </span>
                </el-col>
            </el-row>

            <el-divider class="mb-30-px mt-30-px divider-text-color"> Message Settings </el-divider>
            <el-row class="mb-10-px">
                <el-col :span="10" class="text-right fw-b">
                    <span>{{$t('table.companies.messageForward')}}:</span>
                </el-col>
                <el-col :span="12" class="text-left ml-20-px">
                    <span>
                        <el-switch v-model="companyData.messageForward"></el-switch>
                    </span>
                </el-col>
            </el-row>

            <el-row class="mb-10-px">
                <el-col :span="10" class="text-right fw-b">
                    <span>{{$t('table.companies.callForwarding')}}:</span>
                </el-col>
                <el-col :span="12" class="text-left ml-20-px">
                    <span>
                        <el-switch v-model="companyData.callForwarding"></el-switch>
                    </span>
                </el-col>
            </el-row>

            <el-divider class="mb-30-px mt-30-px divider-text-color"> API Settings </el-divider>
            <el-row class="mb-10-px">
                <el-col :span="10" class="text-right fw-b mt-7-px">
                    <span>{{$t('table.companies.apiToken')}}:</span>
                </el-col>
                <el-col :span="12" class="text-left ml-20-px">
                    <span>
                        <el-tag type="danger" effect="plain">{{companyData.apiToken}}</el-tag>
                        <el-tooltip class="item" effect="dark" content="Generate Token" placement="top">
                            <el-button  class="ml-5-px" icon="el-icon-refresh" circle>
                            </el-button>
                        </el-tooltip>
                    </span>
                </el-col>
            </el-row>
        </div>
    </el-card>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { defaultCompanyData, getCompany } from '@/api/companies'

@Component({
  name: 'CompanyDetails',
  components: {
  }
})
export default class extends Vue {
    private companyData = defaultCompanyData

    created() {
      const id = this.$route.params && this.$route.params.id
      this.fetchData(parseInt(id))
    }

    private handleChange(value: number) {
      console.log(value)
    }

    private async fetchData(id: number) {
      try {
        const { data } = await getCompany(id, {})
        this.companyData = data.company
      } catch (err) {
        console.error(err)
      }
    }

    // Filter for status
    private planFilter = (status: string) => {
      const statusMap: { [key: string]: string } = {
        Tentative: 'info',
        Lite: 'success',
        Plus: '',
        Premium: 'warning',
        Ultimate: 'danger'
      }
      return statusMap[status]
    }
}
</script>
