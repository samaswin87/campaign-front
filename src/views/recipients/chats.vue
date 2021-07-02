<template>
  <div class="app-container">
    <div class="chat-container">
      <el-row>
        <el-card class="box-card">
          <div slot="header" class="clearfix">
              <span>Conversations</span>
          </div>
          <el-col
          :span="6"
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
                :row-style="{'background-color': '#f5f7fa !important', height: '100px'}"
              >
                <el-table-column
                  label="Recipients"
                  header-align="center"
                  style="backgrond-color: green; height: 320px"
                  align="left"
                >
                  <template slot-scope="scope">
                    <div class="contact-block">
                      <img src="/img/common/contact.png" class="w-13-ratio mt-10-ratio b-r-50-p" />
                      <span class="ml-10-px mt-0-px text-muted p-absolute w-100-ratio">
                        {{scope.row.platform_recipient.first_name}} {{scope.row.platform_recipient.last_name}}
                        <div class="ml-15-ratio d-initial"><i class="el-icon-time"></i>{{scope.row.created_at | parseTime }}</div>
                      </span>

                      <span class="ml-10-px d-block"><i class="el-icon-phone"></i>{{scope.row.platform_recipient.phone}}</span>
                      <span v-if="false" class="id">{{scope.row.id}}</span>
                    </div>
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
  private selectedContact = ''
  private recipient: any = {}
  private selectedTemplate = {}
  private status = false
  private showId = false
  private searchContact = ''
  private campaignId = -1
  private recipientId = -1
  private contactId = 1
  private message= ''
  @Ref() readonly chatTable!: any

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
    this.selectedContact = data.contact
  }

  private handleRowClick(row:any) {
    this.getContactDeatils(row.id)
    this.selectedTemplate = { firstName: 'test' }
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

.moustache-title {
  padding-top: 5px;
}

.contact-block {

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