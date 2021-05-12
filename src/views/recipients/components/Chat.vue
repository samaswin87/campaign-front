<template>
    <el-dialog
      title="Contact: "
      :visible.sync="visible"
      :before-close="handleClose"
    >
      <div
        slot="footer"
        class="dialog-footer"
      >
        <el-button @click="close">
          {{ $t('common.close') }}
        </el-button>
        <el-button
          type="primary"
        >
          {{ $t('common.next') }}
        </el-button>
      </div>
    </el-dialog>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'

@Component({
  name: 'RecipientTableFilter',
  components: { }
})
export default class extends Vue {
    @Prop({ required: true }) private visible!: boolean

    private close() {
      this.$emit('update:visible', false)
    }

    handleClose() {
      this.$emit('update:visible', false)
    }
}
</script>
