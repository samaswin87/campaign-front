<template>
    <el-dialog
      title="Campaign Filter"
      :visible.sync="visible"
    >
      <el-form
        ref="campaignFilterForm"
        :model="filterRecord"
        label-position="left"
        label-width="30%"
        style="width: 80%; margin-left:10%;"
      >
        <el-form-item label="Status">
            <el-radio-group v-model="filterRecord.status">
              <el-radio label="Active" name="status"></el-radio>
              <el-radio label="In Active" name="status"></el-radio>
            </el-radio-group>
        </el-form-item>
        <el-form-item label="Keywords">
            <el-radio-group v-model="filterRecord.workflowOption">
              <el-radio label="In Equal"></el-radio>
              <el-radio label="Is Not Equal"></el-radio>
              <el-radio label="In Not Empty"></el-radio>
              <el-radio label="Is Empty"></el-radio>
            </el-radio-group>
            <el-input type="textarea" v-model="filterRecord.keywords"></el-input>
        </el-form-item>
        <el-form-item label="Posted">
            <el-radio-group v-model="filterRecord.posted">
              <el-radio label="Email"></el-radio>
              <el-radio label="Twitter"></el-radio>
              <el-radio label="Facebook"></el-radio>
            </el-radio-group>
        </el-form-item>
        <el-form-item label="Phone Number">
            <el-radio-group v-model="filterRecord.phoneOption">
              <el-radio label="In Equal"></el-radio>
              <el-radio label="Is Not Equal"></el-radio>
            </el-radio-group>
            <el-input type="text" v-model="filterRecord.phoneNumber"></el-input>
        </el-form-item>
      </el-form>
      <div
        slot="footer"
        class="dialog-footer"
      >
        <el-button @click="close">
          {{ $t('table.cancel') }}
        </el-button>
        <el-button
          type="primary"
          @click="filterCampaign"
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

@Component({
  name: 'CampaignTableFilter',
  components: { Multiselect }
})
export default class extends Vue {
    @Prop({ required: true }) private visible!: boolean

    private tags = ['vue', 'element', 'cooking', 'mint-ui', 'vuex', 'vue-router', 'babel']

    private filterRecord = {
      status: 'Active',
      keywords: '',
      campaigns: '',
      schduledOn: '',
      tags: null,
      phoneNumber: null,
      tagOption: 'In Equal',
      posted: 'Twitter',
      workflowOption: 'In Equal',
      phoneOption: 'In Equal'
    }

    private filterCampaign() {
      (this.$refs.campaignFilterForm as Form).validate(async(valid) => {
        if (valid) {
          this.$emit('campaignFiltered', this.filterRecord)
        }
      })
      this.$emit('update:visible', false)
    }

    private close() {
      this.$emit('update:visible', false)
    }
}
</script>