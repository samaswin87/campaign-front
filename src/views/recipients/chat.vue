<template>
  <div class="app-container">
    <div class="chat-container">
      <el-row>
        <el-card class="box-card">
          <div slot="header" class="clearfix">
              <span>Conversations</span>
          </div>
          <el-col
          :span="8"
          :xs="24"
          >
            <el-card style="margin-bottom:20px;" :body-style="{padding: '10px'}">
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
                :show-header="status"
                border
                fit
                highlight-current-row
                :row-style="{'background-color': '#f5f7fa !important', height: '100px'}"
                style="width: 100%;"
              >
                <el-table-column
                  label="Contacts"
                  style="backgrond-color: green; height: 320px"
                  align="left"
                >
                  <template slot-scope="scope">
                    <div class="contact-block">
                      <el-avatar :size="50" src="https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png" class="img-circle"></el-avatar>
                      <span class="time">{{scope.row.lastReplyAt | parseTime }}</span>
                      <span class="name text-muted">{{scope.row.name}}</span>
                      <span class="contact">{{scope.row.contact}}</span>
                    </div>
                  </template>
                </el-table-column>
              </el-table>
            </el-card>
          </el-col>
          <el-col
            :span="14"
            :xs="24"
          >
            <el-card style="margin-bottom:20px;">
              <div
                slot="header"
                class="clearfix"
              >
                <span>Messages</span>
              </div>
            </el-card>
          </el-col>
        </el-card>
      </el-row>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Watch, Vue, Ref } from 'vue-property-decorator'
import faker from 'faker'

@Component({
  name: 'Chat',
  components: { }
})
export default class extends Vue {
  private currentItem = 1
  private status = false
  private searchContact = ''
  @Ref() readonly chatTable!: any

  private tableData:any[] = []

  created() {
    this.list()
  }

  @Watch('tableData')
  selectFirstRow() {
    this.$nextTick(function() {
      this.chatTable.setCurrentRow(this.tableData[0])
    })
  }

  private list() {
    for (let i = 0; i < 100; i++) {
      this.tableData.push({
        contact: faker.phone.phoneNumberFormat(2),
        name: faker.name.findName(),
        lastReplyAt: faker.date.past().getTime()
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.float-right {
  float: right;
}

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
    margin-right: 30px
  }

  span {
    font-weight: 500;
    font-size: 12px;
  }
  }

</style>
