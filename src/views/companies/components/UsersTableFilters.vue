<template>
    <el-dialog
      title="User Filter"
      :visible.sync="visible"
      :before-close="handleClose"
    >
      <el-form
        ref="userFilterForm"
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
        <el-form-item label="First Name">
            <el-radio-group v-model="filterRecord.firstNameOption">
              <el-radio label="In Equal"></el-radio>
              <el-radio label="Is Not Equal"></el-radio>
              <el-radio label="Strat With"></el-radio>
              <el-radio label="End With"></el-radio>
            </el-radio-group>
            <el-input type="text" v-model="filterRecord.firstName"></el-input>
        </el-form-item>
        <el-form-item label="Last Name">
            <el-radio-group v-model="filterRecord.lastNameOption">
              <el-radio label="In Equal"></el-radio>
              <el-radio label="Is Not Equal"></el-radio>
              <el-radio label="Strat With"></el-radio>
              <el-radio label="End With"></el-radio>
            </el-radio-group>
            <el-input type="text" v-model="filterRecord.lastName"></el-input>
        </el-form-item>
        <el-form-item label="Email">
            <el-radio-group v-model="filterRecord.emailOption">
              <el-radio label="In Equal"></el-radio>
              <el-radio label="Is Not Equal"></el-radio>
              <el-radio label="Strat With"></el-radio>
              <el-radio label="End With"></el-radio>
            </el-radio-group>
            <el-input type="text" v-model="filterRecord.email"></el-input>
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
          @click="filterUser"
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
  name: 'UserTableFilter',
  components: { }
})
export default class extends Vue {
    @Prop({ required: true }) private visible!: boolean

    private filterRecord = {
      status: 'Active',
      firstName: '',
      lastName: '',
      email: '',
      firstNameOption: 'In Equal',
      lastNameOption: 'In Equal',
      emailOption: 'In Equal'
    }

    private filterUser() {
      (this.$refs.userFilterForm as Form).validate(async(valid) => {
        if (valid) {
          this.$emit('userFiltered', this.filterRecord)
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
