<template>
  <div class="app-container">
    <div>
      <el-row :gutter="20">
        <el-col
          :span="6"
          :xs="24"
        >
          <user-card />
        </el-col>
        <el-col
          :span="18"
          :xs="24"
        >
          <el-card>
            <el-tabs v-model="activeTab">
              <el-tab-pane
                label="Timeline"
                name="timeline"
              >
                <timeline />
              </el-tab-pane>
              <el-tab-pane
                label="Account"
                name="account"
              >
                <account/>
              </el-tab-pane>
            </el-tabs>
          </el-card>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import Account from './components/Account.vue'
import Timeline from './components/Timeline.vue'
import UserCard from './components/UserCard.vue'

@Component({
  name: 'Profile',
  components: {
    Account,
    Timeline,
    UserCard
  }
})
export default class extends Vue {
  private activeTab = 'timeline'
}
</script>
