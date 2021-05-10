<template>
    <el-dialog
      title="Move Contacts"
      :visible.sync="visible"
      width="40%"
      :before-close="handleClose"
    >
      <el-tabs type="card">
        <el-tab-pane label="Campaigns">Campaigns table need to popup here</el-tab-pane>
        <el-tab-pane label="Workflows">Workflows table need to popup here</el-tab-pane>
      </el-tabs>

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
import Campaign from '@/views/campaigns/index.vue'

@Component({
  name: 'TagsDialog',
  components: { Multiselect, Campaign }
})
export default class extends Vue {
    @Prop({ required: true }) private visible!: boolean

    private tags: string[] = []
    private moveOption = 'Campaigns'

    private close() {
      this.$emit('update:visible', false)
    }

    handleClose() {
      this.$emit('update:visible', false)
    }

    handleClick(tab: any, event: any) {
      console.log(tab, event)
    }
}
</script>

<style lang="scss" scoped>
.move {
  margin-bottom: 13px;
}
</style>
