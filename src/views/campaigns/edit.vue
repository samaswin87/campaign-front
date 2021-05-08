<template>
    <div class="app-container">
        <div class="campaign-container">
            <el-row>
                <el-card class="box-card">
                    <div slot="header" class="clearfix">
                        <span>Edit Campaign</span>
                    </div>
                    <el-form
                    ref="campaignForm"
                    :model="campaignData"
                    class="form-container"
                    >
                        <el-row class="content-row">
                            <el-col :span="10" class="content-label">
                                <div class="grid-content-label"><label class="label-space">{{$t('table.company')}}:</label></div>
                            </el-col>
                            <el-col :span="5" class="content-vlaue">
                                <div class="grid-content">
                                    <multiselect
                                    v-model="campaignData.company"
                                    placeholder="Search one company"
                                    :options="companies"
                                    :clear-on-select="false"
                                    :close-on-select="false"
                                    >
                                    </multiselect>
                                </div>
                            </el-col>
                        </el-row>

                        <el-row class="content-row">
                            <el-col :span="10" class="content-label">
                                <div class="grid-content-label"><label class="label-space">{{$t('table.name')}}: </label></div>
                            </el-col>
                            <el-col :span="5" class="content-vlaue">
                                <div class="grid-content">
                                    <span>
                                        <el-input
                                        placeholder="Please add name"
                                        v-model="campaignData.name"
                                        clearable>
                                        </el-input>
                                    </span>
                                </div>
                            </el-col>
                        </el-row>

                        <el-row class="content-row">
                            <el-col :span="10" class="content-label">
                                <div class="grid-content-label"><label class="label-space">{{$t('table.type')}}: </label></div>
                            </el-col>
                            <el-col :span="5" class="content-vlaue">
                                <div class="grid-content">
                                    <span>
                                        <multiselect
                                        v-model="campaignData.type"
                                        placeholder="Search one type"
                                        :options="types"
                                        :clear-on-select="false"
                                        :close-on-select="false"
                                        >
                                        </multiselect>
                                    </span>
                                </div>
                            </el-col>
                        </el-row>

                        <el-row class="content-row">
                            <el-col :span="10" class="content-label">
                                <div class="grid-content-label"><label class="label-space">{{$t('table.campaign.body')}}: </label></div>
                            </el-col>
                            <el-col :span="5" class="content-vlaue">
                                <div class="grid-content">
                                    <span>
                                        <el-input
                                        type="textarea"
                                        :rows="10"
                                        placeholder="Notes"
                                        v-model="campaignData.body">
                                        </el-input>
                                    </span>
                                </div>
                            </el-col>
                        </el-row>

                        <el-row class="content-row">
                            <el-col :span="14"  class="content-label">
                                <div class="grid-content">
                                    <router-link :to="'/campaigns'">
                                        <el-button>
                                            Cancel
                                        </el-button>
                                    </router-link>
                                </div>
                            </el-col>
                            <el-col :span="2"  class="content-button">
                                <el-button type="primary">
                                    Submit
                                </el-button>
                            </el-col>
                        </el-row>
                    </el-form>
                </el-card>
            </el-row>
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { defaultCampaignData, getCampaign } from '@/api/campaigns'
import { getCompanies } from '@/api/companies'
import Multiselect from 'vue-multiselect'
import { map } from 'lodash'

@Component({
  name: 'CampaignView',
  components: { Multiselect }
})
export default class extends Vue {
    private campaignData = defaultCampaignData
    private companies :string[] = []
    private types :string[] = ['immediate', 'recurring', 'scheduled']

    created() {
      const id = this.$route.params && this.$route.params.id
      this.fetchData(parseInt(id))
      this.fetchCompanies()
    }

    private async fetchData(id: number) {
      try {
        const { data } = await getCampaign(id, { /* Your params here */ })
        this.campaignData = data.campaign
      } catch (err) {
        console.error(err)
      }
    }

    private async fetchCompanies() {
      try {
        const { data } = await getCompanies({ /* Your params here */ })
        this.companies = map(data.items, 'name')
      } catch (err) {
        console.error(err)
      }
    }
}
</script>

<style lang="scss" scoped>
.content-label {
    text-align: end;
}

.content-vlaue {
    margin-left: 3%;
}

.content-row {
    margin-bottom: 1%;
}

.tags {
  margin-left: 6px;
}

.grid-content-label {
    margin-top: 1%;
}

.content-button {
    margin-left: 28px;
}
</style>
