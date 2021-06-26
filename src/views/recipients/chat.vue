<template>
  <div class="app-container">
    <div class="chat-container">
      <el-row>
        <el-card class="box-card">
          <div slot="header">
              <span>Conversations</span>
          </div>
          <el-col
          :span="6"
          :xs="24"
          >
            <el-card>
              <div
                slot="header"
              >
                <span><i class="el-icon-phone mr-10-px"></i>{{ recipient.phone }}</span>
              </div>
              <el-card class="mb-3-px">
                <div
                  slot="header"
                >
                  <i class="el-icon-message"></i>
                  Draft Message
                </div>
                <span class="new-line" v-html="messageDisplay()"></span>
              </el-card>
              <el-card class="mb-3-px">
                <div
                  slot="header"
                >
                  <svg-icon name="moustache" class="moustache-icon" width="30" height="17"></svg-icon>
                  Templates
                </div>
                <span v-for="[key, value] of Object.entries(moustacheJson())" :key="key">
                  <el-tag
                    type="danger"
                    size="mini"
                    class="mb-3-px"
                    effect="plain">
                    {{ key }}
                  </el-tag> - {{ value }} <br>
                </span>
              </el-card>
              <el-select
                v-model="recipient.tags"
                multiple
                filterable
                allow-create
                class="mb-3-px w-100-ratio"
                default-first-option
                placeholder="Choose tags">
                <el-option
                  v-for="item in recipient.tags"
                  :key="item"
                  :label="item"
                  :value="item">
                </el-option>
              </el-select>
              <el-input
                placeholder="Notes"
                v-model="recipient.notes"
                type="textarea"
                clearable>
              </el-input>
            </el-card>
          </el-col>
          <el-col
            :span="15"
            :xs="24"
          >
            <el-card class="margin-bottom">
              <div
                slot="header"
                class="clearfix"
              >
                <span><i class="el-icon-chat-line-square"></i> Messages</span>
              </div>
              <el-timeline class="scroll fixed-height">
                <el-timeline-item
                  v-for="(item, index) in messages"
                  :key="index"
                  placement="top"
                  :icon="chatStyle(item.delivery).icon"
                  :type="chatStyle(item.delivery).type"
                  size="large"
                  :timestamp="item.created_at | parseTime">
                  <el-card class="border-radius" :body-style="{'background-color': chatStyle(item.delivery).color}">
                    <el-tooltip v-if="item.delivery === 'draft'" class="item" effect="light" content="Resend" placement="right">
                      <i class="mr-5-px el-icon-s-promotion icon-resend"></i>
                    </el-tooltip>
                    {{item.message}}
                  </el-card>
                </el-timeline-item>
              </el-timeline>
              <el-input
                  placeholder="Type here"
                  type="textarea"
                  v-model="message"
                  maxlength="300"
                  show-word-limit
                  clearable>
                </el-input>
                <el-button icon="el-icon-s-promotion" type="primary" @click="handleClick()" class="float-right margin-bottom-10">Send</el-button>
            </el-card>
          </el-col>
        </el-card>
      </el-row>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { getConversations, addConversation } from '@/api/conversations'
import { getRecipient } from '@/api/recipients'
import { getCampaign } from '@/api/campaigns'
import { isEmpty } from 'lodash'

@Component({
  name: 'Chat',
  components: { }
})
export default class extends Vue {
  private messages: any[] = []
  private recipient: any = {}
  private campaign: any = {}
  private campaignId = -1
  private recipientId = -1
  private message = ''

  created() {
    const campaignId = this.$route.params && this.$route.params.campaignId
    const recipientId = this.$route.query && this.$route.query.recipientId
    this.campaignId = parseInt(campaignId)
    if (typeof recipientId === 'number' || typeof recipientId === 'string') {
      this.recipientId = parseInt(recipientId)
      this.getContact()
    }
    this.getList()
    this.getDepository()
  }

  private messageDisplay() {
    if (this.campaign.message) {
      return this.campaign.message.replaceAll('{', "<span class='el-tag el-tag--danger el-tag--plain el-tag--mini'>{").replaceAll('}', '}</span>')
    }
  }

  private moustacheJson() {
    const moustacheKeys :any = {}
    if (!this.recipient) {
      return moustacheKeys
    }
    moustacheKeys['{first_name}'] = this.recipient.first_name
    moustacheKeys['{last_name}'] = this.recipient.last_name
    if (this.recipient.middle_name) {
      moustacheKeys['{middle_name}'] = this.recipient.middle_name
    }

    moustacheKeys['{gender}'] = this.recipient.gender ? 'Female' : 'Male'
    if (this.recipient.custom_fields) {
      Object.keys(this.recipient.custom_fields).map((key) => {
        moustacheKeys['{' + key + '}'] = this.recipient.custom_fields[key]
      })
    }
    return moustacheKeys
  }

  private async getContact() {
    const { data } = await getRecipient(this.recipientId, this.campaignId, {})
    this.recipient = data
  }

  private async getDepository() {
    const { data } = await getCampaign(this.campaignId, {})
    this.campaign = data
    console.log(this.messages)
    if (this.messages.length === 0) {
      let message = this.campaign.message
      let moustache = true
      const moustacheKeys = this.moustacheJson()
      while (moustache) {
        const matches = message.match(/\{(.*?)\}/)
        if (matches) {
          message = message.replace(matches[0], moustacheKeys[matches[0]])
        } else {
          moustache = false
        }
      }
      this.message = message
    } else {
      this.message = ''
    }
  }

  private async getList() {
    const { data } = await getConversations(this.recipientId, this.campaignId)
    this.messages = data
  }

  private chatStyle(type: string) {
    const styleMap: { [key: string]: any } = {
      draft: { type: 'info', icon: 'el-icon-loading', color: '#c0c4cc' },
      outbound: { type: 'success', icon: 'el-icon-s-promotion', color: '#65a783' },
      inbound: { type: 'primary', icon: 'el-icon-message', color: '#80bcf5' }
    }
    return styleMap[type]
  }

  private async handleClick() {
    if (!isEmpty(this.message)) {
      const { data } = await addConversation(this.recipientId, this.campaignId, { message: this.convertMessage(this.message) })
      this.messages.push(data)
      this.message = ''
    }
  }

  private convertMessage(message: string) {
    let moustache = true
    const moustacheKeys = this.moustacheJson()
    while (moustache) {
      const matches = message.match(/\{(.*?)\}/)
      if (matches) {
        message = message.replace(matches[0], moustacheKeys[matches[0]])
      } else {
        moustache = false
      }
    }
    return message
  }
}
</script>

<style lang="scss" scoped>
.scroll {
  overflow: auto
}

 /* is used to set the current page element global table. The background color when a line is selected*/
::v-deep .el-table__body tr.current-row>td{
  background-color: rgb(206 237 245) !important;
}

::v-deep .el-table--enable-row-hover  .el-table__body tr:hover>td {
  background-color: rgb(206 237 245);
}

::v-deep .el-timeline-item__node--large {
  left: -12px;
  width: 33px;
  height: 34px;
}

.new-line {
  white-space: pre-line;
}
.moustache {
  display: flex;
}

.moustache-icon {
  fill: #2C87F0
}

.border-radius {
  border-radius: 22px
}

.fixed-height {
  height: 490px;
}

.icon-resend {
  font-size: 20px;
  cursor: pointer;
}

::v-deep textarea {
  min-height: 33px;
  margin-top: 10px;
  margin-bottom: 10px;
  height: 111px;
}

</style>
