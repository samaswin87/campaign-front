<template>
    <div class="app-container">
        <div class="company-container">
            <el-row>
                <el-card class="box-card">
                    <div slot="header" class="clearfix">
                        <span>New Company</span>
                    </div>
                    <el-form
                    ref="companyForm"
                    :model="companyData"
                    class="form-container"
                    >
                        <el-row class="content-row">
                            <el-col :span="10" class="content-label content-style">
                                <div class="grid-content-label"><label class="label-space">{{$t('table.name')}}: </label></div>
                            </el-col>
                            <el-col :span="5" class="content-vlaue">
                                <div class="grid-content">
                                    <span>
                                        <el-input
                                        placeholder="Please add name"
                                        v-model="companyData.name"
                                        clearable>
                                        </el-input>
                                    </span>
                                </div>
                            </el-col>
                        </el-row>

                        <el-row class="content-row">
                            <el-col :span="10" class="content-label content-style">
                                <div class="grid-content-label"><label class="label-space">{{$t('table.phone')}}: </label></div>
                            </el-col>
                            <el-col :span="5" class="content-vlaue">
                                <div class="grid-content">
                                    <span>
                                        <el-input
                                        placeholder="Please add phone"
                                        v-model="companyData.phone"
                                        clearable>
                                        </el-input>
                                    </span>
                                </div>
                            </el-col>
                        </el-row>

                        <el-row class="content-row">
                            <el-col :span="10" class="content-label content-style">
                                <div class="grid-content-label"><label class="label-space">{{$t('table.email')}}: </label></div>
                            </el-col>
                            <el-col :span="5" class="content-vlaue">
                                <div class="grid-content">
                                    <span>
                                        <el-input
                                        placeholder="Please add email"
                                        v-model="companyData.email"
                                        clearable>
                                        </el-input>
                                    </span>
                                </div>
                            </el-col>
                        </el-row>

                         <el-row class="content-row">
                            <el-col :span="10" class="content-label content-style">
                                <div class="grid-content-label"><label class="label-space">{{$t('table.companies.plan')}}: </label></div>
                            </el-col>
                            <el-col :span="10" class="content-vlaue">
                                <div class="grid-content">
                                    <span>
                                        <el-radio-group v-model="companyData.plan" size="small">
                                            <el-radio-button label="Tentative"></el-radio-button>
                                            <el-radio-button label="Lite"></el-radio-button>
                                            <el-radio-button label="Plus"></el-radio-button>
                                            <el-radio-button label="Premium"></el-radio-button>
                                            <el-radio-button label="Ultimate"></el-radio-button>
                                        </el-radio-group>
                                    </span>
                                </div>
                            </el-col>
                        </el-row>

                        <el-row class="content-row">
                            <el-col :span="10" class="content-label content-style">
                                <div class="grid-content-label"><label class="label-space">{{$t('table.companies.messageForward')}}: </label></div>
                            </el-col>
                            <el-col :span="10" class="content-vlaue">
                                <div class="grid-content">
                                    <span>
                                        <el-switch
                                            v-model="companyData.messageForward"
                                            active-color="#13ce66"
                                            inactive-color="#ff4949"
                                            active-text="On"
                                            inactive-text="Off">
                                        </el-switch>

                                    </span>
                                </div>
                            </el-col>
                        </el-row>

                        <el-row class="content-row">
                            <el-col :span="10" class="content-label content-style">
                                <div class="grid-content-label"><label class="label-space">{{$t('table.companies.callForwarding')}}: </label></div>
                            </el-col>
                            <el-col :span="10" class="content-vlaue">
                                <div class="grid-content">
                                    <span>
                                        <el-switch
                                            v-model="companyData.callForwarding"
                                            active-color="#13ce66"
                                            inactive-color="#ff4949"
                                            active-text="On"
                                            inactive-text="Off">
                                        </el-switch>

                                    </span>
                                </div>
                            </el-col>
                        </el-row>

                        <el-row class="content-row">
                            <el-col :span="14"  class="content-label">
                                <router-link :to="'/companies'">
                                    <el-button>
                                        Cancel
                                    </el-button>
                                </router-link>
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
import { defaultCompanyData } from '@/api/companies'
import Multiselect from 'vue-multiselect'

@Component({
  name: 'CompanyNew',
  components: { Multiselect }
})
export default class extends Vue {
    private companyData = defaultCompanyData
}
</script>

<style lang="scss" scoped>
.content-label {
    text-align: end;
}

.content-style {
    padding-top: 1em;
}

.content-vlaue {
    margin-left: 3%;
}

.content-row {
    margin-bottom: 1%;
}

.content-button {
    margin-left: 28px;
}
</style>
