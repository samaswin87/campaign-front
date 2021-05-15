<template>
    <el-dialog
      title="Add Promt"
      :visible.sync="visible"
      :before-close="handleClose"
    >
      <el-form
        ref="promtForm"
        :model="promtRecord"
        label-position="left"
        label-width="30%"
        style="width: 80%; margin-left:10%;"
      >
        <el-form-item label="Moustachu Name">
          <el-input v-model="promtRecord.name"></el-input>
        </el-form-item>
        <el-form-item label="Default Value">
          <el-input v-model="promtRecord.default"></el-input>
        </el-form-item>
        <el-form-item label="body">
          <el-input type="textarea" :rows="6" v-model="promtRecord.body"></el-input>
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
          @click="addPromt"
        >
          {{ $t('common.add') }}
        </el-button>
      </div>
    </el-dialog>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import { Form } from 'element-ui'

@Component({
  name: 'AddPromt',
  components: { }
})
export default class extends Vue {
    @Prop({ required: true }) private visible!: boolean
    @Prop({ required: false }) private order!: number

    private promtRecord = {
      name: '',
      body: '',
      default: '',
      order: this.order
    }

    private addPromt() {
      (this.$refs.promtForm as Form).validate(async(valid) => {
        if (valid) {
          this.promtRecord.order = this.order
          this.$emit('promtRecord', this.promtRecord)
          this.promtRecord = {
            name: '',
            body: '',
            default: '',
            order: 0
          }
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
