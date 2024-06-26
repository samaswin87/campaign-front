<template>
  <el-card style="margin-bottom:20px;">
    <div
      slot="header"
      class="clearfix"
    >
      <span>About me</span>
    </div>

    <div class="user-profile">
      <div class="box-center">
        <pan-thumb
          :image="user.avatar"
          :height="'100px'"
          :width="'100px'"
          :hoverable="false"
        >
          <div>Hello</div>
          {{ user.roles.join(', ') }}
        </pan-thumb>
      </div>
      <div class="box-center">
        <div class="user-name text-center">
          {{ user.name }}
        </div>
        <div class="user-role text-center text-muted">
          {{ user.roles.join(', ') | uppercaseFirstChar }}
        </div>
      </div>
    </div>

    <div class="user-bio">
      <div class="user-education user-bio-section">
        <div class="user-bio-section-header">
          <svg-icon name="account" width="17" height="17"/><span>Personal Details</span>
        </div>
        <div class="user-bio-section-body">
          <div class="text-muted margin-bottom-10">
            <svg-icon name="company" /> {{this.company.name}}
          </div>
          <div class="text-muted margin-bottom-10">
            <svg-icon name="email" /> {{this.user.email}}
          </div>
          <div class="text-muted margin-bottom-10">
            <svg-icon name="phone" /> {{this.user.phone}}
          </div>
        </div>
      </div>

      <div class="user-accounts user-bio-section">
        <div class="user-bio-section-header">
          <svg-icon name="role" /><span>Current Plan</span>
        </div>
        <div class="user-bio-section-body">
          <div class="progress-item">
            <span>
              <el-tag
              type="primary"
              effect="plain">
                {{this.plans[4]}}
              </el-tag>
            </span>
          </div>
        </div>
      </div>
    </div>
  </el-card>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { getCompany, defaultCompanyData } from '@/api/companies'
import { defaultUserData } from '@/api/users'
import PanThumb from '@/components/PanThumb/index.vue'
import { UserModule } from '@/store/modules/user'
import { ICompanyData } from '@/api/types'

@Component({
  name: 'UserCard',
  components: {
    PanThumb
  }
})
export default class extends Vue {
  private user: any = defaultUserData
  private company :ICompanyData = defaultCompanyData
  private plans = ['Tentative', 'Lite', 'Plus', 'Premium', 'Ultimate']

  created() {
    this.user = UserModule
    this.fetchCompany(UserModule.companyId)
  }

  private async fetchCompany(id: number) {
    const { data } = await getCompany(id, {})
    this.company = data.company
  }
}
</script>

<style lang="scss" scoped>
.box-center {
  margin: 0 auto;
  display: table;
}

.text-muted {
  color: #777;
}

.user-profile {
  .user-name {
    font-weight: bold;
  }

  .box-center {
    padding-top: 10px;
  }

  .user-role {
    padding-top: 10px;
    font-weight: 400;
    font-size: 14px;
  }

  .box-social {
    padding-top: 30px;

    .el-table {
      border-top: 1px solid #dfe6ec;
    }
  }

  .user-follow {
    padding-top: 20px;
  }
}

.user-bio {
  margin-top: 20px;
  color: #606266;

  span {
    padding-left: 4px;
  }

  .user-bio-section {
    font-size: 14px;
    padding: 15px 0;

    .user-bio-section-header {
      border-bottom: 1px solid #dfe6ec;
      padding-bottom: 10px;
      margin-bottom: 10px;
      font-weight: bold;
    }
  }
}
</style>
