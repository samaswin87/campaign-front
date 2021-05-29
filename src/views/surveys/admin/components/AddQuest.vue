<template>
    <el-dialog
      title="Add Quest"
      :visible.sync="visible"
      :before-close="handleClose"
    >
      <el-form
        ref="questForm"
        :model="quest"
        label-position="left"
        label-width="30%"
        style="width: 80%; margin-left:10%;"
      >
        <el-form-item label="Description">
            <el-input type="textarea" v-model="quest.description"></el-input>
        </el-form-item>
        <el-form-item label="Choice 1">
            <el-input type="text" v-model="quest.choice1"></el-input>
        </el-form-item>
        <el-form-item label="Choice 2">
            <el-input type="text" v-model="quest.choice2"></el-input>
        </el-form-item>
        <el-form-item label="Choice 3">
            <el-input type="text" v-model="quest.choice3"></el-input>
        </el-form-item>
        <el-form-item label="Choice 4">
            <el-input type="text" v-model="quest.choice4"></el-input>
        </el-form-item>
        <el-form-item label="Choice 5">
            <el-input type="text" v-model="quest.choice5"></el-input>
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
          @click="filterQuest"
        >
          {{ $t('table.apply') }}
        </el-button>
      </div>
    </el-dialog>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import { Form } from 'element-ui'
import Multiselect from 'vue-multiselect'
import { ISurveyQuestData } from '@/api/types'
import { defaultSurveyQuestData } from '@/api/surveys'

@Component({
  name: 'AddQuest',
  components: { Multiselect }
})
export default class extends Vue {
    @Prop({ required: true }) private visible!: boolean

    private tags = ['vue', 'element', 'cooking', 'mint-ui', 'vuex', 'vue-router', 'babel']

    private quest: ISurveyQuestData = defaultSurveyQuestData

    private filterQuest() {
      (this.$refs.questForm as Form).validate(async(valid) => {
        if (valid) {
          this.$emit('addQuest', this.quest)
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
