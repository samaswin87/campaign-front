<template>
  <div class="app-container">
    <div class="chat-container">
      <el-row>
        <el-card class="box-card">
          <div slot="header">
              <span>Conversation</span>
          </div>
          <el-col
          :span="8"
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
                  <router-link :to="{name: 'CampaignEdit', params: {id: campaignId}}">
                    <el-button
                      icon="el-icon-edit-outline"
                      type="info"
                      class="float-right p-3-px"
                    >
                    </el-button>
                  </router-link>
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
                  <router-link :to="{name: 'ContactEdit', params: {id: recipient.id}}">
                    <el-button
                      icon="el-icon-edit-outline"
                      type="info"
                      class="float-right p-3-px"
                    >
                    </el-button>
                  </router-link>
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
                @change="addTag"
                filterable
                allow-create
                class="mb-3-px w-100-ratio"
                default-first-option
                placeholder="Choose tags">
                <el-option
                  v-for="item in tags"
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
            :span="14"
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
import { updateTags } from '@/api/contacts'
import { getRecipient } from '@/api/recipients'
import { getTagNames } from '@/api/tags'
import { getCampaign } from '@/api/campaigns'
import { isEmpty, map, difference } from 'lodash'
import { UserModule } from '@/store/modules/user'

@Component({
  name: 'RecipientChat',
  components: { }
})
export default class extends Vue {
  private messages: any[] = []
  private recipient: any = {}
  private campaign: any = {}
  private campaignId = -1
  private recipientId = -1
  private message = ''
  private tags :any[] = []
  private existingTags :any[] = []

  created() {
    const campaignId = this.$route.params && this.$route.params.campaignId
    const recipientId = this.$route.params && this.$route.params.recipientId
    if (parseInt(campaignId) > 0) {
      this.campaignId = parseInt(campaignId)
    }

    if ((typeof recipientId === 'number' || typeof recipientId === 'string') && parseInt(recipientId) > 0) {
      this.recipientId = parseInt(recipientId)
      this.getContact()
    }
    this.getList()
    this.fetchTags(UserModule.companyId)
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
    this.existingTags = data.tags
  }

  private async getDepository() {
    const { data } = await getCampaign(this.campaignId, {})
    this.campaign = data
    if (this.messages.length === 0) {
      this.message = this.convertMessage(this.campaign.message)
    } else {
      this.message = ''
    }
  }

  private async getList() {
    const { data } = await getConversations(this.recipientId, this.campaignId)
    this.getDepository()
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
      this.messages.unshift(data)
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

  private async fetchTags(id: number) {
    try {
      const { data } = await getTagNames(id)
      this.tags = map(data, 'name')
    } catch (err) {
      console.error(err)
    }
  }

  async addTag(newTags: any) {
    const addedTags = difference(newTags, this.existingTags)
    let removedTags :any[] = []
    if (addedTags.length === 0) {
      removedTags = difference(this.existingTags, newTags)
    }

    await updateTags({ tags: { added: addedTags, removed: removedTags }, contacts: [this.recipient.id] })
    if (addedTags.length === 0) {
      this.existingTags = this.existingTags.filter(tag => !removedTags.includes(tag))
    } else {
      this.existingTags = this.existingTags.concat(addedTags)
    }
  }
}
</script>

<style lang="scss" scoped>
.scroll {
  overflow: auto
}

::v-deep .el-timeline-item__node--large {
  left: -12px;
  width: 33px;
  height: 34px;
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
