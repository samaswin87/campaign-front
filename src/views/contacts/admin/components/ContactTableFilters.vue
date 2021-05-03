<template>
    <el-dialog
      title="Contact Filter"
      :visible.sync="visible"
    >
      <el-form
        ref="contactFilterForm"
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
            <el-input type="textarea" v-model="filterRecord.keywords"></el-input>
        </el-form-item>
        <el-form-item label="Campaigns">
            <el-input type="textarea" v-model="filterRecord.campaigns"></el-input>
        </el-form-item>
        <el-form-item label="Scheduled On">
            <el-date-picker type="date" placeholder="Pick a date" v-model="filterRecord.schduledOn" style="width: 100%;"></el-date-picker>
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

@Component({
  name: 'ContactTableFilter'
})
export default class extends Vue {
    @Prop({ required: true }) private visible!: boolean

    private filterRecord = {
      status: 'active',
      keywords: '',
      campaigns: '',
      schduledOn: ''
    }

    private filterContact() {
      (this.$refs.contactFilterForm as Form).validate(async(valid) => {
        if (valid) {
          this.$emit('contactFiltered', this.filterRecord)
        }
      })
      this.$emit('update:visible', false)
    }

    private close() {
      this.$emit('update:visible', false)
    }
}
</script>
