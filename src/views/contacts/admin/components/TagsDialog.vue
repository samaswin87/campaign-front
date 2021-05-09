<template>
    <el-dialog
      title="Tags Dialog"
      :visible.sync="visible"
    >
      <div
        slot="footer"
        class="dialog-footer"
      >
        <el-button @click="close">
          {{ $t('table.cancel') }}
        </el-button>
        <el-button
          type="primary"
        >
          {{ $t('table.apply') }}
        </el-button>
      </div>
    </el-dialog>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import Multiselect from 'vue-multiselect'

@Component({
  name: 'TagsDialog',
  components: { Multiselect }
})
export default class extends Vue {
    @Prop({ required: true }) private visible!: boolean

    private close() {
      this.$emit('update:visible', false)
    }
}
</script>
