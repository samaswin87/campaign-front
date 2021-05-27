<template>
    <el-dialog
      title="Add Tag"
      :visible.sync="visible"
      :before-close="handleClose"
      class="w-ratio-70"
    >
      <el-form
        ref="tagForm"
        :model="tagRecord"
        label-position="left"
        label-width="30%"
        style="width: 80%; margin-left:10%;"
      >
        <el-form-item label="Name">
          <el-input v-model="tagRecord.name"></el-input>
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
          @click="addTag"
        >
          {{ $t('common.add') }}
        </el-button>
      </div>
    </el-dialog>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import { Form } from 'element-ui'
import { defaultTagData } from '@/api/tags'

@Component({
  name: 'AddTag',
  components: { }
})
export default class extends Vue {
    @Prop({ required: true }) private visible!: boolean

    private tagRecord = defaultTagData

    private addTag() {
      (this.$refs.tagForm as Form).validate(async(valid) => {
        if (valid) {
          this.$emit('tagRecord', this.tagRecord)
          this.tagRecord = defaultTagData
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
