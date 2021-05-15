<template>
    <div class="app-container">
        <div class="workflow-container">
            <el-row>
                <el-card class="box-card">
                    <div slot="header" class="clearfix">
                        <span>New workflow</span>
                    </div>
                    <el-row>
                            <el-col :span="8">
                                <el-row>
                                    <el-card class="box-card workflow-details">
                                        <el-form
                                        ref="workflowForm"
                                        :model="workflowData"
                                        class="form-container"
                                        >
                                            <el-row class="content-row">
                                                <el-col :span="2">
                                                    <svg-icon name="company" class="svg-icon"/>
                                                </el-col>
                                                <el-col :span="20">
                                                    <div class="grid-value">
                                                        <multiselect
                                                        v-model="workflowData.company"
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
                                                <el-col :span="2">
                                                    <svg-icon name="keyword" class="svg-icon"/>
                                                </el-col>
                                                <el-col :span="20">
                                                    <div class="grid-value">
                                                        <span>
                                                            <el-input
                                                            placeholder="Please add keyword"
                                                            v-model="workflowData.name"
                                                            clearable>
                                                            </el-input>
                                                        </span>
                                                    </div>
                                                </el-col>
                                            </el-row>

                                            <el-row class="content-row">
                                                <el-col :span="2">
                                                    <svg-icon name="phone" class="svg-icon"/>
                                                </el-col>
                                                <el-col :span="20">
                                                    <div class="grid-value">
                                                        <span>
                                                            <el-input
                                                            placeholder="Please add phone"
                                                            v-model="workflowData.phone"
                                                            clearable>
                                                            </el-input>
                                                        </span>
                                                    </div>
                                                </el-col>
                                            </el-row>

                                            <el-row class="content-row">
                                                <el-col :span="20" class="content-vlaue">
                                                    <div class="grid-content">
                                                        <span>
                                                            <el-switch
                                                            v-model="workflowData.confidential"
                                                            active-text="Confidential"
                                                            active-color="#13ce66"
                                                            inactive-color="#ff4949"
                                                            inactive-text="Non Confidential">
                                                            </el-switch>
                                                        </span>
                                                    </div>
                                                </el-col>
                                            </el-row>

                                            <el-button type="success" icon="el-icon-document-add" class="float-right submit">Save</el-button>
                                        </el-form>
                                    </el-card>
                                </el-row>
                            </el-col>
                    </el-row>
                </el-card>
            </el-row>
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { defaultWorkflowData } from '@/api/workflows'
import { getCompanies } from '@/api/companies'
import Multiselect from 'vue-multiselect'
import { map } from 'lodash'

@Component({
  name: 'WorkflowCreate',
  components: { Multiselect }
})
export default class extends Vue {
    private workflowData = defaultWorkflowData
    private companies :string[] = []

    created() {
      this.fetchCompanies()
    }

    private async fetchCompanies() {
      try {
        const { data } = await getCompanies({})
        this.companies = map(data.items, 'name')
      } catch (err) {
        console.error(err)
      }
    }
}
</script>

<style lang="scss" scoped>

.content-row {
    margin-bottom: 5%;
}

.content-button {
    margin-left: 28px;
}

.content-vlaue {
    padding-left: 50px;
}

.svg-icon {
    width: 30px !important;
    height: 30px !important;
    margin-top: 8px;
}

.submit {
    margin-bottom: 20px;
    margin-right: 50px;
}
</style>
