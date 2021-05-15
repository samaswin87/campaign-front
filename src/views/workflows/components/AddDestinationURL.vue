<template>
    <el-dialog
      title="Add Destination URL"
      :visible.sync="visible"
      :before-close="handleClose"
    >
      <el-form
        ref="destinationForm"
        :model="responseRecord"
        label-position="left"
        label-width="30%"
        style="width: 80%; margin-left:10%;"
      >
        <el-form-item label="Destination Url">
          <el-input type="textarea" placeholder="Need to complete the params mappeing UI later" :rows="4" v-model="responseRecord.destinationURL"></el-input>
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
          @click="addResponse"
        >
          {{ $t('common.add') }}
        </el-button>
      </div>
    </el-dialog>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import { Form } from 'element-ui'
import { defaultFinalResponseData } from '@/api/workflows'

@Component({
  name: 'AddPromt',
  components: { }
})
export default class extends Vue {
    @Prop({ required: true }) private visible!: boolean
    @Prop({ required: false }) private order!: number

    private responseRecord = defaultFinalResponseData

    private addResponse() {
      (this.$refs.destinationForm as Form).validate(async(valid) => {
        if (valid) {
          this.$emit('addDestinationURL', this.responseRecord)
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
