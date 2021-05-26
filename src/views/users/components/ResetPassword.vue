<template>
    <el-card class="box-card w-ratio-70">
        <div slot="header" class="clearfix">
            <span>Reset Password</span>
        </div>
        <div class="user-passwords">
            <el-row class="mb-10-px">
                <el-col :span="24">
                    <el-alert
                        center
                        title="Password reset email send to the user email and you can use the link to reset the password"
                        type="error">
                    </el-alert>
                </el-col>
            </el-row>
            <el-row class="mb-10-px">
                <el-col :span="15">
                    <div class="float-right mt-8-px">
                        <el-button type="primary">Click here to reset the password</el-button>
                    </div>
                </el-col>
            </el-row>
        </div>
    </el-card>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'

@Component({
  name: 'ResetPassword',
  components: {
  }
})
export default class extends Vue {
    @Prop({ required: true }) private userId!: number
}
</script>
