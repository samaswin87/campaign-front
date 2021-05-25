<template>
    <el-dialog
      title="Platform Filter"
      :visible.sync="visible"
      :before-close="handleClose"
    >
      <el-form
        ref="platformFilterForm"
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
            <el-radio-group v-model="filterRecord.nameOption">
              <el-radio label="In Equal"></el-radio>
              <el-radio label="Is Not Equal"></el-radio>
              <el-radio label="Strat With"></el-radio>
              <el-radio label="End With"></el-radio>
            </el-radio-group>
            <el-input type="text" v-model="filterRecord.name"></el-input>
        </el-form-item>
        <el-form-item label="Created On">
            <el-radio-group v-model="filterRecord.createdOnOption">
              <el-radio label="In Equal"></el-radio>
              <el-radio label="Is Not Equal"></el-radio>
              <el-radio label="Strat With"></el-radio>
              <el-radio label="End With"></el-radio>
            </el-radio-group>
            <el-input type="text" v-model="filterRecord.createdOn"></el-input>
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
          @click="filterPlatform"
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
  name: 'PlatformTableFilter',
  components: { }
})
export default class extends Vue {
    @Prop({ required: true }) private visible!: boolean

    private filterRecord = {
      status: 'Active',
      name: '',
      createdOn: null,
      nameOption: 'In Equal',
      createdOnOption: 'In Equal'
    }

    private filterPlatform() {
      (this.$refs.platformFilterForm as Form).validate(async(valid) => {
        if (valid) {
          this.$emit('platformFiltered', this.filterRecord)
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
