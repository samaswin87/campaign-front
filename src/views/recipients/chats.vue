<template>
  <div class="app-container">
    <div class="chat-container">
      <el-row>
        <el-card class="box-card">
          <div slot="header" class="clearfix">
              <span>Conversations</span>
          </div>
          <el-col
          :span="5"
          :xs="24"
          >
            <el-card class="margin-bottom" :body-style="{padding: '10px'}">
              <div
                slot="header"
                class="clearfix"
              >
                <el-input
                  placeholder="Search contact"
                  v-model="searchContact"
                  clearable>
                  <i slot="prefix" class="el-input__icon el-icon-search"></i>
                </el-input>
              </div>
              <el-table
                ref="chatTable"
                :key="0"
                :data="tableData"
                height="650"
                border
                fit
                highlight-current-row
                @row-click="handleRowClick"
                cell-class-name="c-pointer b-r-10"
              >
                <el-table-column
                  label="Recipients"
                  header-align="center"
                  align="left"
                >
                  <template slot-scope="scope">
                      <div>
                        <i class="el-icon-user mr-10-px"></i>{{scope.row.platform_recipient.first_name}} {{scope.row.platform_recipient.last_name}}
                      </div>
                      <div>
                        <i class="el-icon-phone mr-10-px"></i>{{scope.row.platform_recipient.phone}}
                      </div>
                      <div>
                        <i class="el-icon-time mr-10-px"></i>{{scope.row.created_at | parseTime }}
                      </div>
                      <span v-if="false" class="id">{{scope.row.id}}</span>
                  </template>
                </el-table-column>
              </el-table>
            </el-card>
          </el-col>
          <el-col
            :span="12"
            :xs="24"
          >
            <el-card class="margin-bottom">
              <div
                slot="header"
                class="clearfix"
              >
                <span><i class="el-icon-chat-line-square"></i>Messages</span>
                <span class="float-right">
                  <el-button type="primary" icon="el-icon-caret-left" circle></el-button>
                  <el-button type="primary" icon="el-icon-caret-right" circle></el-button>
                </span>
              </div>
              <el-timeline class="scroll fixed-height">
                <el-timeline-item
                  v-for="(item, index) in messages"
                  :key="index"
                  ref="timelineMessage"
                  placement="top"
                  :icon="getStyle(item.delivery).icon"
                  :type="getStyle(item.delivery).type"
                  size="large"
                  :timestamp="item.created_at | parseTime">
                  <el-card class="border-radius" :body-style="{'background-color': getStyle(item.delivery).color}">
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
                <el-button icon="el-icon-s-promotion" type="primary" @click="handleIconClick($event)" class="float-right margin-bottom-10">Send</el-button>
            </el-card>
          </el-col>
          <el-col
            :span="6"
            :xs="24"
          >
            <el-card class="margin-bottom">
              <div
                slot="header"
                class="clearfix"
              >
                <span><i class="el-icon-setting"></i>Settings</span>
              </div>
              <el-card class="margin-bottom">
                <div
                  slot="header"
                  class="clearfix"
                >
                  <span class="moustache"><svg-icon name="moustache" class="moustache-icon" width="30" height="30"/><span class="moustache-title">Templates</span></span>
                </div>
                <span v-for="[key, value] of Object.entries(getMoustacheJson(recipient))" :key="key">
                  <el-tag
                    type="danger"
                    size="mini"
                    class="mb-3-px"
                    effect="plain">
                    {{ key }}
                  </el-tag> - {{ value }} <br>
                </span>
              </el-card>
              <el-input
                placeholder="Tags"
                v-model="searchContact"
                clearable>
              </el-input>
              <el-input
                placeholder="Notes"
                v-model="searchContact"
                type="textarea"
                clearable>
              </el-input>
            </el-card>
          </el-col>
        </el-card>
      </el-row>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Watch, Vue, Ref } from 'vue-property-decorator'
import { getConversations } from '@/api/conversations'
import { chatStyle, moustacheJson } from './components/chat-utils'
import { getContact } from '@/api/contacts'
import { getRecipients } from '@/api/recipients'
import { ICampaignConversationsData } from '@/api/types'

@Component({
  name: 'Chat',
  components: { }
})
export default class extends Vue {
  private listItems: ICampaignConversationsData[] = []
  private recipient: any = {}
  private status = false
  private showId = false
  private searchContact = ''
  private campaignId = -1
  private recipientId = -1
  private contactId = 1
  private message = ''
  @Ref() readonly chatTable!: any
  private messages:any[] = []
  private tableData:any[] = []

  created() {
    const campaignId = this.$route.params && this.$route.params.campaignId
    this.campaignId = parseInt(campaignId)
    this.getList()
    this.getContacts()
  }

  @Watch('tableData')
  selectFirstRow() {
    this.$nextTick(function() {
      this.chatTable.setCurrentRow(this.tableData[0])
    })
  }

  private async getList() {
    const { data } = await getConversations(1, this.campaignId)
    this.listItems = data
  }

  private async getContacts() {
    const { data } = await getRecipients(this.campaignId, { limit: 'all' })
    this.tableData = data
    this.recipientId = this.tableData[0].id
    this.getMessages()
  }

  private async getMessages() {
    const { data } = await getConversations(this.recipientId, this.campaignId)
    this.messages = data
  }

  private getStyle(type: string) {
    return chatStyle(type)
  }

  private getMoustacheJson(recipient: string) {
    return moustacheJson(recipient)
  }

  private handleIconClick() {
    console.log('send')
  }

  private async getContactDeatils(contactId: number) {
    const { data } = await getContact(contactId, {})
    this.recipientId = contactId
    this.getMessages()
  }

  private handleRowClick(row:any) {
    this.getContactDeatils(row.id)
  }
}
</script>

<style lang="scss" scoped>
.scroll {
  overflow: auto
}

 /* is used to set the current page element global table. The background color when a line is selected*/
::v-deep .el-table__body tr.current-row>td{
  background-color: #dcdfe6 !important;
}

::v-deep .el-table--enable-row-hover  .el-table__body tr:hover>td {
  background-color: #dcdfe6;
}

::v-deep .el-timeline-item__node--large {
  left: -12px;
  width: 33px;
  height: 34px;
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
