<template>
    <el-dialog
      title="Update Tags"
      :visible.sync="visible"
      width="40%"
      :before-close="handleClose"
    >
      <multiselect
        v-model="existingTags"
        tag-placeholder="Add this as new tag"
        placeholder="Search or add a tag"
        :options="tagsApplicable"
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
          @click="handleSubmit"
        >
          {{ $t('table.apply') }}
        </el-button>
      </div>
    </el-dialog>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator'
import Multiselect from 'vue-multiselect'
import { map, difference } from 'lodash'
import { getTagsByCompany } from '@/api/tags'

@Component({
  name: 'TagsDialog',
  components: { Multiselect }
})
export default class extends Vue {
    @Prop({ required: true }) private visible!: boolean
    @Prop() private companyId!: number
    @Prop() private tags!: string[]

    private tagsAvailable: string[] = []
    private existingTags: string[] = []
    private tagsApplicable: string[] = []

    private close() {
      this.$emit('update:visible', false)
    }

    handleClose() {
      this.$emit('update:visible', false)
    }

    created() {
      this.fetchTags()
    }

    @Watch('companyId')
    setCompanyId() {
      this.tagsAvailable = this.tags
      this.existingTags = this.tags
      this.fetchTags()
    }

    addTag(newTag: string) {
      this.existingTags.push(newTag)
    }

    private async fetchTags() {
      try {
        const { data } = await getTagsByCompany(this.companyId, {})
        this.tagsApplicable = difference(map(data, 'name'), this.existingTags)
      } catch (err) {
        console.error(err)
      }
    }

    private handleSubmit() {
      const addedTags: string[] = difference(this.existingTags, this.tagsAvailable)
      const removedTags: string[] = difference(this.tagsAvailable, this.existingTags)
      this.$emit('updateTags', { added: addedTags, removed: removedTags })
      this.$emit('update:visible', false)
    }
}
</script>
