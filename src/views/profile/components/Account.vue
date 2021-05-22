<template>
  <el-form>
    <el-row>
      <el-col :span="4">
        <el-button type="primary">Change password</el-button>
      </el-col>
      <el-col :span="6">
        <el-button type="primary">Upgrade Plan</el-button>
      </el-col>
    </el-row>
    <el-form-item label="Name">
      <el-input v-model.trim="user.name" />
    </el-form-item>
    <el-form-item label="Phone">
      <el-input v-model.trim="user.phone" />
    </el-form-item>
    <el-form-item label="Email">
      <el-input v-model.trim="user.email" />
    </el-form-item>
    <el-form-item>
      <el-button
        type="primary"
        @click="submit"
      >
        Update
      </el-button>
    </el-form-item>
  </el-form>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { UserModule } from '@/store/modules/user'
import { IUserData } from '@/api/types'
import { defaultUserData } from '@/api/users'

@Component({
  name: 'Account'
})
export default class extends Vue {
  private user:IUserData = defaultUserData

  created() {
    this.user.name = UserModule.name
    this.user.phone = UserModule.phone.toString()
    this.user.email = UserModule.email
  }

  private submit() {
    this.$message({
      message: 'User information has been updated successfully',
      type: 'success',
      duration: 5 * 1000
    })
  }
}
</script>
