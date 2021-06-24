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
                <span><i class="el-icon-setting mr-10-px"></i>{{ recipient.phone }}</span>
              </div>
              <el-card class="mb-3-px">
                <div
                  slot="header"
                >
                  <svg-icon name="moustache" class="moustache-icon" width="30" height="17"></svg-icon>
                  Templates
                </div>
                <span v-for="(template, index) in moustacheJson(recipient)" :key="index">
                  <el-tag
                    type="danger"
                    size="mini"
                    class="mb-3-px"
                    effect="plain">
                    {{ template[0] }}
                  </el-tag> - {{ template[1] }} <br>
                </span>
              </el-card>
              <el-input
                placeholder="Tags"
                class="mb-3-px"
                v-model="recipient.tags"
                clearable>
              </el-input>
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
                <span><i class="el-icon-chat-line-square"></i>Messages</span>
              </div>
              <el-timeline class="scroll fixed-height">
                <el-timeline-item
                  v-for="(activity, index) in messages"
                  :key="index"
                  placement="top"
                  :icon="chatStyle(activity.type).icon"
                  :type="chatStyle(activity.type).type"
                  size="large"
                  :timestamp="activity.date | parseTime">
                  <el-card class="border-radius" :body-style="{'background-color': chatStyle(activity.type).color}">
                    {{activity.message}}
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
                <el-button icon="el-icon-s-promotion" type="primary" @click="handleIconClick($event)" class="float-right margin-bottom-10">Send</el-button>
            </el-card>
          </el-col>
        </el-card>
      </el-row>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { getConversations } from '@/api/conversations'
import { getRecipient } from '@/api/recipients'
import { ICampaignConversationsData } from '@/api/types'

@Component({
  name: 'Chat',
  components: { }
})
export default class extends Vue {
  private messages: ICampaignConversationsData[] = []
  private recipient = ''
  private campaignId = -1
  private recipientId = -1
  private message= ''

  created() {
    const campaignId = this.$route.params && this.$route.params.campaignId
    const recipientId = this.$route.query && this.$route.query.recipientId
    this.campaignId = parseInt(campaignId)
    if (typeof recipientId === 'string') {
      this.recipientId = parseInt(recipientId)
      this.getPlatform()
    }
    this.getList()
  }

  private moustacheJson(recipient: any) {
    const moustacheKeys :any [] = []
    moustacheKeys.push(['{first_name}', recipient.first_name])
    moustacheKeys.push(['{last_name}', recipient.last_name])
    if (recipient.middle_name) {
      moustacheKeys.push(['{middle_name}', recipient.middle_name])
    }
    moustacheKeys.push(['{gender}', recipient.gender ? 'Female' : 'Male'])

    Object.keys(recipient.custom_fields).map((key) => {
      moustacheKeys.push(['{' + key + '}', recipient.custom_fields[key]])
    })
    return moustacheKeys
  }

  private async getPlatform() {
    const { data } = await getRecipient(this.recipientId, this.campaignId, {})
    this.recipient = data
  }

  private async getList() {
    const { data } = await getConversations(this.recipientId, this.campaignId)
    this.messages = data
  }

  private chatStyle(type: string) {
    const styleMap: { [key: string]: any } = {
      draft: { type: 'info', icon: 'el-icon-loading', color: '#c0c4cc' },
      sent: { type: 'success', icon: 'el-icon-s-promotion', color: '#65a783' },
      reply: { type: 'primary', icon: 'el-icon-message', color: '#80bcf5' }
    }
    return styleMap[type]
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

.moustache {
  display: flex;
}

.moustache-icon {
  fill: #2C87F0
}

.contact-block {
  .contact,
  .name {
    display: block;
    margin-left: 50px;
    padding: 2px 0;
  }

  .time {
    display: block;
    float: right;
  }

  .contact {
    font-size: 16px;
    color: #000;
  }

  :after {
    clear: both;
  }

  .img-circle {
    float: left;
    margin-right: 10px
  }

  span {
    font-weight: 500;
    font-size: 12px;
  }
  }

  .border-radius {
    border-radius: 22px
  }

  .fixed-height {
    height: 490px;
  }

  ::v-deep textarea {
    min-height: 33px;
    margin-top: 10px;
    margin-bottom: 10px;
    height: 111px;
  }

</style>
