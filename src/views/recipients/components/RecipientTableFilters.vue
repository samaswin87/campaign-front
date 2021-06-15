<template>
    <el-dialog
      title="Recipient Filter"
      :visible.sync="visible"
      :before-close="close"
    >
      <el-form
        ref="recipientFilterForm"
        :model="filterRecord"
        label-position="left"
        label-width="30%"
        style="width: 80%; margin-left:10%;"
      >
        <el-form-item label="Status">
            <el-radio-group v-model="filterRecord.status" size="small" class="mb-10-px">
              <el-radio-button label="">All</el-radio-button>
              <el-radio-button label="active">Active</el-radio-button>
              <el-radio-button label="inactive">In Active</el-radio-button>
            </el-radio-group>
        </el-form-item>
        <el-form-item label="Tags">
            <multiselect
              v-model="filterRecord.tagNames"
              :options="tags"
              :multiple="true"
              :clear-on-select="false"
              :close-on-select="false"
            >
            </multiselect>
        </el-form-item>
        <el-form-item label="Phone Number">
            <el-radio-group v-model="filterRecord.phoneOption" class="mb-10-px">
              <el-radio-button label="equal">In Equal</el-radio-button>
              <el-radio-button label="not_equal">Is Not Equal</el-radio-button>
              <el-radio-button label="start_with">Strat With</el-radio-button>
              <el-radio-button label="end_with">End With</el-radio-button>
            </el-radio-group>
            <el-input type="text" v-model="filterRecord.phoneNumber"></el-input>
        </el-form-item>
        <el-form-item label="Template Key and Value">
            <el-input type="text" v-model="filterRecord.templateKey" class="w-50-ratio" placeholder="Key"></el-input>
            <el-input type="text" v-model="filterRecord.templateValue" class="w-50-ratio" placeholder="Value"></el-input>
        </el-form-item>
        <el-form-item label="Template Keys">
            <el-select
              v-model="filterRecord.templateKeys"
              multiple
              filterable
              allow-create
              class="w-100-ratio"
              default-first-option
              placeholder="Add keys to search">
              <el-option
                v-for="item in filterRecord.templateKeys"
                :key="item"
                :label="item"
                :value="item">
              </el-option>
            </el-select>
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
          @click="filterRecipient"
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
import { getTags } from '@/api/contacts'
import { isEmpty } from 'lodash'

@Component({
  name: 'RecipientTableFilter',
  components: { Multiselect }
})
export default class extends Vue {
    @Prop({ required: true }) private visible!: boolean
    private tags:string[] = []
    private clear = false

    private filterRecord = {
      status: '',
      tagNames: [],
      phoneNumber: null,
      phoneOption: '',
      templateKeys: [],
      templateKey: '',
      templateValue: ''
    }

    private filterrific = {
      status_with: '',
      with_phone: '',
      with_email: '',
      with_tags: '',
      with_data_keys: '',
      with_data: ''
    }

    created() {
      this.fetchTags()
    }

    private async fetchTags() {
      const { data } = await getTags()
      this.tags = data
    }

    private filterRecipient() {
      (this.$refs.recipientFilterForm as Form).validate(async(valid) => {
        if (valid) {
          this.clear = true
          this.filterrific.status_with = this.filterRecord.status
          if (!isEmpty(this.filterRecord.phoneOption) && !isEmpty(this.filterRecord.phoneNumber)) {
            this.filterrific.with_phone = this.filterRecord.phoneOption + '_eq_' + this.filterRecord.phoneNumber
          }

          if (!isEmpty(this.filterRecord.templateKey) && !isEmpty(this.filterRecord.templateValue)) {
            this.filterrific.with_data = this.filterRecord.templateKey + '_b_' + this.filterRecord.templateValue
          }

          if (!isEmpty(this.filterRecord.tagNames)) {
            this.filterrific.with_data_keys = this.filterRecord.templateKeys.join('_b_')
          }

          if (!isEmpty(this.filterRecord.tagNames)) {
            this.filterrific.with_tags = this.filterRecord.tagNames.join('_')
          }
          this.$emit('recipientFiltered', this.filterrific)
        }
      })
      this.$emit('update:visible', false)
    }

    private close() {
      this.$emit('update:visible', false)
    }

    private clearFilter() {
      this.filterRecord = {
        status: '',
        tagNames: [],
        phoneNumber: null,
        phoneOption: '',
        templateKeys: [],
        templateKey: '',
        templateValue: ''
      }

      this.filterrific = {
        status_with: '',
        with_phone: '',
        with_email: '',
        with_tags: '',
        with_data_keys: '',
        with_data: ''
      }
      this.clear = false
      this.$emit('clearFilter')
      this.$emit('update:visible', false)
    }
}
</script>
