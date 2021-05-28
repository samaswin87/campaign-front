<template>
    <el-dialog
      title="Survey Filter"
      :visible.sync="visible"
      :before-close="handleClose"
    >
      <el-form
        ref="surveyFilterForm"
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
        <el-form-item label="Name">
            <el-radio-group v-model="filterRecord.surveyOption">
              <el-radio label="In Equal"></el-radio>
              <el-radio label="Is Not Equal"></el-radio>
              <el-radio label="In Not Empty"></el-radio>
              <el-radio label="Is Empty"></el-radio>
            </el-radio-group>
            <el-input type="text" v-model="filterRecord.name"></el-input>
        </el-form-item>
        <el-form-item label="Posted">
            <el-radio-group v-model="filterRecord.posted">
              <el-radio label="Email"></el-radio>
              <el-radio label="Twitter"></el-radio>
              <el-radio label="Facebook"></el-radio>
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
        <el-button
          type="primary"
          @click="filterSurvey"
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
  name: 'SurveyTableFilter',
  components: { Multiselect }
})
export default class extends Vue {
    @Prop({ required: true }) private visible!: boolean

    private tags = ['vue', 'element', 'cooking', 'mint-ui', 'vuex', 'vue-router', 'babel']

    private filterRecord = {
      status: 'Active',
      name: '',
      schduledOn: '',
      posted: 'Twitter',
      surveyOption: 'In Equal'
    }

    private filterSurvey() {
      (this.$refs.surveyFilterForm as Form).validate(async(valid) => {
        if (valid) {
          this.$emit('surveyFiltered', this.filterRecord)
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
}
</script>
