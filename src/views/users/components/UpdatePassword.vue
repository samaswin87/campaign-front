<template>
    <el-card class="box-card w-ratio-70">
        <div slot="header" class="clearfix">
            <span>Change Password</span>
        </div>
        <div class="user-passwords">
          <el-form
            ref="passwordForm"
            :model="userPassword"
            class="form-container"
            >
                <el-row class="mb-10-px">
                    <el-col :span="10">
                        <div class="float-right mt-8-px"><label class="label-space">Old Password:</label></div>
                    </el-col>
                    <el-col :span="7">
                        <div class="float-left ml-10-px w-100-ratio">
                          <el-input placeholder="Old Password" v-model="userPassword.password"></el-input>
                        </div>
                    </el-col>
                </el-row>

                <el-row class="mb-10-px">
                    <el-col :span="10">
                        <div class="float-right mt-8-px"><label class="label-space">New Password:</label></div>
                    </el-col>
                    <el-col :span="7">
                        <div class="float-left ml-10-px w-100-ratio">
                          <el-input placeholder="New Password" v-model="userPassword.newPassword"></el-input>
                        </div>
                    </el-col>
                </el-row>

                <el-row class="mb-10-px">
                    <el-col :span="10">
                        <div class="float-right mt-8-px"><label class="label-space">Comfirm Password:</label></div>
                    </el-col>
                    <el-col :span="7">
                        <div class="float-left ml-10-px w-100-ratio">
                          <el-input placeholder="Please must be same as new" v-model="userPassword.oldPassword"></el-input>
                        </div>
                    </el-col>
                </el-row>
                <el-row class="mb-10-px">
                    <el-col :span="18">
                        <div class="float-right mr-30-px">
                          <el-button>Cancel</el-button>
                          <el-button type="primary">Submit</el-button>
                        </div>
                    </el-col>
                </el-row>
          </el-form>
        </div>
    </el-card>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'

@Component({
  name: 'UpdatePassword',
  components: {
  }
})
export default class extends Vue {
    @Prop({ required: true }) private userId!: number
    private userPassword: any = {
      password: '',
      newPassword: '',
      confirmPassword: ''
    }
}
</script>
