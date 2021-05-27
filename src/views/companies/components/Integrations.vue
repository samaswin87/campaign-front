<template>
    <el-row>
        <el-col :span="24">
            <el-card class="box-card">
                <div slot="header" class="clearfix">
                    <span>Integrations</span>
                </div>
                <el-row :gutter="12" class="panel-group">
                    <el-col :xs="12" :sm="12" :lg="6">
                        <el-card :body-style="{padding: '0px'}" shadow="hover" class="c-pointer">
                        <img src="/img/integrations/classy.png" class="w-100-ratio d-block">
                        </el-card>
                    </el-col>
                    <el-col :xs="12" :sm="12" :lg="6">
                        <el-card :body-style="{padding: '0px'}" shadow="hover" class="c-pointer">
                        <img src="/img/integrations/zapier.png" class="w-100-ratio d-block">
                        </el-card>
                    </el-col>
                    <el-col :xs="12" :sm="12" :lg="6">
                        <el-card :body-style="{padding: '0px'}" shadow="hover" class="c-pointer">
                        <img src="/img/integrations/segment.png" class="w-100-ratio d-block">
                        </el-card>
                    </el-col>
                    <el-col :xs="12" :sm="12" :lg="6">
                        <el-card :body-style="{padding: '0px'}" shadow="hover" class="c-pointer">
                        <img src="/img/integrations/google-analytics.png" class="w-100-ratio d-block">
                        </el-card>
                    </el-col>
                </el-row>
                <el-row :gutter="12" class="mt-20-px">
                    <el-col :xs="12" :sm="12" :lg="6">
                        <el-card :body-style="{padding: '0px'}" shadow="hover" class="c-pointer">
                        <img src="/img/integrations/okta.png" class="w-100-ratio d-block">
                        </el-card>
                    </el-col>
                    <el-col :xs="12" :sm="12" :lg="6">
                        <el-card :body-style="{padding: '0px'}" shadow="hover" class="c-pointer">
                        <img src="/img/integrations/onelogin.png" class="w-100-ratio d-block">
                        </el-card>
                    </el-col>
                    <el-col :xs="12" :sm="12" :lg="6">
                        <el-card :body-style="{padding: '0px'}" shadow="hover" class="c-pointer">
                        <img src="/img/integrations/twitter.png" class="w-100-ratio d-block">
                        </el-card>
                    </el-col>
                    <el-col :xs="12" :sm="12" :lg="6">
                        <el-card :body-style="{padding: '0px'}" shadow="hover" class="c-pointer">
                        <img src="/img/integrations/facebook.png" class="w-100-ratio d-block">
                        </el-card>
                    </el-col>
                </el-row>
            </el-card>
        </el-col>
    </el-row>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { defaultCompanyData, getCompany } from '@/api/companies'

@Component({
  name: 'Credits',
  components: {
  }
})
export default class extends Vue {
    private companyData = defaultCompanyData

    created() {
      const id = this.$route.params && this.$route.params.id
      this.fetchData(parseInt(id))
    }

    private async fetchData(id: number) {
      try {
        const { data } = await getCompany(id, {})
        this.companyData = data.company
      } catch (err) {
        console.error(err)
      }
    }
}
</script>
