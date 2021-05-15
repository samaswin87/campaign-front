<template>
    <div class="app-container">
        <div class="workflow-container">
            <el-row>
                <el-card class="box-card">
                    <div slot="header" class="clearfix">
                        <span>New workflow</span>
                    </div>
                    <el-form
                    ref="workflowForm"
                    :model="workflowData"
                    class="form-container"
                    >
                        <el-row class="content-row">
                            <el-col :span="10" class="content-label">
                                <div class="grid-content"><label class="label-space">{{$t('table.company')}}:</label></div>
                            </el-col>
                            <el-col :span="5" class="content-vlaue">
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
                            <el-col :span="10" class="content-label">
                                <div class="grid-content"><label class="label-space">{{$t('table.name')}}: </label></div>
                            </el-col>
                            <el-col :span="5" class="content-vlaue">
                                <div class="grid-value">
                                    <span>
                                        <el-input
                                        placeholder="Please add first name"
                                        v-model="workflowData.name"
                                        clearable>
                                        </el-input>
                                    </span>
                                </div>
                            </el-col>
                        </el-row>

                        <el-row class="content-row">
                            <el-col :span="14"  class="content-label">
                                <router-link :to="'/workflows'">
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
.content-label {
    text-align: end;
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
