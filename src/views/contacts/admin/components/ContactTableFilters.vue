<template>
    <el-dialog
      title="Contact Filter"
      :visible.sync="visible"
    >
      <div
        slot="footer"
        class="dialog-footer"
      >
        <el-button @click="disableDialog">
          {{ $t('table.cancel') }}
        </el-button>
        <el-button
          type="primary"
          @click="disableDialog"
        >
          {{ $t('table.apply') }}
        </el-button>
      </div>
    </el-dialog>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'

@Component({
  name: 'ContactTableFilter'
})
export default class extends Vue {
    @Prop({ required: true }) private visible!: boolean
    @Prop({ required: true }) private page!: object

    private disableDialog() {
      this.$emit('update:visible', false)
    }
}
</script>
