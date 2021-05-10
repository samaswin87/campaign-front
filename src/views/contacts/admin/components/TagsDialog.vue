<template>
    <el-dialog
      title="Tags Dialog"
      :visible.sync="visible"
      width="40%"
      :before-close="handleClose"
    >
      <multiselect
        v-model="tags"
        tag-placeholder="Add this as new tag"
        placeholder="Search or add a tag"
        :options="tagsAvailable"
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
import { Component, Prop, Vue, Watch } from 'vue-property-decorator'
import Multiselect from 'vue-multiselect'
import { map } from 'lodash'
import { getTags } from '@/api/tags'

@Component({
  name: 'TagsDialog',
  components: { Multiselect }
})
export default class extends Vue {
    @Prop({ required: true }) private visible!: boolean
    @Prop() private tagList!: string[]

    private tags: string[] = []
    private tagsAvailable: string[] = []

    private close() {
      this.$emit('update:visible', false)
    }

    handleClose() {
      this.$emit('update:visible', false)
    }

    @Watch('tagList')
    setTagList() {
      this.tags = [...new Set(this.tagList.flat())]
    }

    addTag(newTag: string) {
      this.tags.push(newTag)
    }

    created() {
      this.fetchTags()
    }

    private async fetchTags() {
      try {
        const { data } = await getTags({})
        this.tagsAvailable = map(data.items, 'name')
      } catch (err) {
        console.error(err)
      }
    }
}
</script>
