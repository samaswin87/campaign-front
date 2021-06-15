<template>
    <el-dialog
      title="Contact Filter"
      :visible.sync="visible"
      :before-close="handleClose"
    >
      <el-form
        ref="contactFilterForm"
        :model="filterRecord"
        label-width="30%"
      >
        <el-form-item>
          <el-radio-group v-model="filterRecord.status" size="small" class="mb-10-px" required>
              <el-radio-button label="">All</el-radio-button>
              <el-radio-button label="active">Active</el-radio-button>
              <el-radio-button label="inactive">In Active</el-radio-button>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="Tags">
            <multiselect
              v-model="filterRecord.tagNames"
              :options="tags"
              placeholder="Select tags"
              :multiple="true"
              :clear-on-select="false"
              :close-on-select="false"
              class="w-60-ratio"
            >
            </multiselect>
        </el-form-item>
        <el-form-item label="Keywords">
            <multiselect
              v-model="filterRecord.keywords"
              :options="keywords"
              placeholder="Select keywords"
              :multiple="true"
              :clear-on-select="false"
              :close-on-select="false"
              class="w-60-ratio"
            >
            </multiselect>
        </el-form-item>
        <el-form-item label="Phone Number">
            <el-radio-group v-model="filterRecord.phoneOption" size="small" class="mb-10-px">
              <el-radio-button label="equal">In Equal</el-radio-button>
              <el-radio-button label="not_equal">Is Not Equal</el-radio-button>
              <el-radio-button label="start_with">Strat With</el-radio-button>
              <el-radio-button label="end_with">End With</el-radio-button>
            </el-radio-group>
            <el-input type="text" v-model="filterRecord.phoneNumber" class="w-60-ratio"></el-input>
        </el-form-item>
        <el-form-item label="Email">
            <el-radio-group v-model="filterRecord.emailOption" size="small" class="mb-10-px">
              <el-radio-button label="equal">In Equal</el-radio-button>
              <el-radio-button label="not_equal">Is Not Equal</el-radio-button>
              <el-radio-button label="start_with">Strat With</el-radio-button>
              <el-radio-button label="end_with">End With</el-radio-button>
            </el-radio-group>
            <el-input type="text" v-model="filterRecord.email" class="w-60-ratio"></el-input>
        </el-form-item>
        <el-form-item label="Sort By">
            <el-radio-group v-model="filterRecord.sortedBy" size="small" class="mb-10-px">
              <el-radio-button label="created_at">CreatedOn</el-radio-button>
              <el-radio-button label="phone">Phone</el-radio-button>
              <el-radio-button label="email">Email</el-radio-button>
              <el-radio-button label="name">Name</el-radio-button>
              <el-radio-button label="company_name">Company Name</el-radio-button>
            </el-radio-group>
            <el-radio-group v-model="filterRecord.sortedOption" size="small" class="mb-10-px">
              <el-radio-button label="asc">Ascending</el-radio-button>
              <el-radio-button label="desc">Descending</el-radio-button>
            </el-radio-group>
        </el-form-item>
      </el-form>
      <div
        slot="footer"
        class="dialog-footer"
      >
        <el-button @click="close">
          {{ $t('table.cancel') }}
        </el-button>
        <el-button @click="clearFilter" type="warning" v-if="clear">
          {{ $t('table.clearFilter') }}
        </el-button>
        <el-button
          type="primary"
          @click="filterContact"
        >
          {{ $t('table.apply') }}
        </el-button>
      </div>
    </el-dialog>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import { Form } from 'element-ui'
import Multiselect from 'vue-multiselect'
import { getTags, getKeywords } from '@/api/contacts'
import { isEmpty } from 'lodash'

@Component({
  name: 'ContactTableFilter',
  components: { Multiselect }
})
export default class extends Vue {
    @Prop({ required: true }) private visible!: boolean

    private tags:string[] = []
    private keywords:string[] = []
    private clear = false

    private filterRecord = {
      status: '',
      keywords: [],
      schduledOn: '',
      tagNames: [],
      phoneNumber: '',
      email: '',
      sortedBy: '',
      sortedOption: '',
      tagOption: '',
      workflowOption: '',
      phoneOption: '',
      emailOption: ''
    }

    private filterrific = {
      status_with: '',
      with_phone: '',
      with_email: '',
      with_tags: '',
      with_keywords: '',
      sorted_by: ''
    }

    created() {
      this.fetchTags()
      this.fetchKeywords()
    }

    private async fetchTags() {
      const { data } = await getTags()
      this.tags = data
    }

    private async fetchKeywords() {
      const { data } = await getKeywords({})
      this.keywords = data
    }

    private filterContact() {
      (this.$refs.contactFilterForm as Form).validate(async(valid) => {
        if (valid) {
          this.clear = true
          this.filterrific.status_with = this.filterRecord.status
          if (!isEmpty(this.filterRecord.sortedBy) && !isEmpty(this.filterRecord.sortedOption)) {
            this.filterrific.sorted_by = this.filterRecord.sortedBy + ',' + this.filterRecord.sortedOption
          }

          if (!isEmpty(this.filterRecord.phoneOption) && !isEmpty(this.filterRecord.phoneNumber)) {
            this.filterrific.with_phone = this.filterRecord.phoneOption + ',' + this.filterRecord.phoneNumber
          }

          if (!isEmpty(this.filterRecord.emailOption) && !isEmpty(this.filterRecord.email)) {
            this.filterrific.with_email = this.filterRecord.emailOption + ',' + this.filterRecord.email
          }

          if (!isEmpty(this.filterRecord.tagNames)) {
            this.filterrific.with_tags = this.filterRecord.tagNames.join(',')
          }

          if (!isEmpty(this.filterRecord.keywords)) {
            this.filterrific.with_keywords = this.filterRecord.keywords.join(',')
          }

          this.$emit('contactFiltered', this.filterrific)
        }
      })
      this.$emit('update:visible', false)
    }

    private close() {
      this.$emit('update:visible', false)
    }

    handleClose() {
      this.$emit('update:visible', false)
    }

    private clearFilter() {
      this.filterRecord = {
        status: '',
        schduledOn: '',
        tagNames: [],
        keywords: [],
        phoneNumber: '',
        email: '',
        sortedBy: '',
        sortedOption: '',
        tagOption: '',
        workflowOption: '',
        phoneOption: '',
        emailOption: ''
      }

      this.filterrific = {
        status_with: '',
        with_phone: '',
        with_email: '',
        with_tags: '',
        with_keywords: '',
        sorted_by: ''
      }
      this.clear = false
      this.$emit('clearFilter')
      this.$emit('update:visible', false)
    }
}
</script>

<style scoped>
  ::v-deep .multiselect__tags {
    padding: 2px 0px 0px 8px !important;
  }

  ::v-deep .multiselect__placeholder {
    margin-bottom: 0px !important;
  }
</style>
