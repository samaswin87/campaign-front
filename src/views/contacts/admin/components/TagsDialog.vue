<template>
    <el-dialog
      title="Tags Dialog"
      :visible.sync="visible"
      width="30%"
      :before-close="handleClose"
    >
      <multiselect
        v-model="tags"
        tag-placeholder="Add this as new tag"
        placeholder="Search or add a tag"
        :options="tags"
        :multiple="true"
        :clear-on-select="false"
        :close-on-select="false"
        :taggable="true"
        @tag="addTag"
        >
      </multiselect>
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

    private tags: string[] = []

    private close() {
      this.$emit('update:visible', false)
    }

    handleClose() {
      this.$emit('update:visible', false)
    }

    addTag(newTag: string) {
      this.tags.push(newTag)
    }
}
</script>
