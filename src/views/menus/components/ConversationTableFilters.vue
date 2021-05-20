<template>
    <el-dialog
      title="Conversation Filter"
      :visible.sync="visible"
      :before-close="handleClose"
    >
      <el-form
        ref="conversationFilterForm"
        :model="filterRecord"
        label-position="left"
        label-width="30%"
        style="width: 80%; margin-left:10%;"
      >
        <el-form-item label="Phone Number">
            <el-radio-group v-model="filterRecord.phoneOption">
              <el-radio label="In Equal"></el-radio>
              <el-radio label="Is Not Equal"></el-radio>
              <el-radio label="Strat With"></el-radio>
              <el-radio label="End With"></el-radio>
            </el-radio-group>
            <el-input type="textarea" v-model="filterRecord.phoneNumber"></el-input>
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
          @click="filterConversation"
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

@Component({
  name: 'ConversationTableFilter',
  components: { Multiselect }
})
export default class extends Vue {
    @Prop({ required: true }) private visible!: boolean

    private tags = ['vue', 'element', 'cooking', 'mint-ui', 'vuex', 'vue-router', 'babel']

    private filterRecord = {
      phoneNumber: null
    }

    private filterConversation() {
      (this.$refs.conversationFilterForm as Form).validate(async(valid) => {
        if (valid) {
          this.$emit('conversationFiltered', this.filterRecord)
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
