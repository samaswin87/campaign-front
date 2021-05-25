<template>
    <div class="app-container">
        <div class="user-container">
            <el-row>
                <el-card class="box-card">
                    <div slot="header" class="clearfix">
                        <span>New User</span>
                    </div>
                    <el-form
                    ref="userForm"
                    :model="userData"
                    class="form-container"
                    >
                        <el-row class="content-row">
                            <el-col :span="10" class="content-label content-style">
                                <div class="grid-content-label"><label class="label-space">{{$t('table.contact.firstName')}}: </label></div>
                            </el-col>
                            <el-col :span="5" class="content-vlaue">
                                <div class="grid-content">
                                    <span>
                                        <el-input
                                        placeholder="Please add first name"
                                        v-model="userData.firstName"
                                        clearable>
                                        </el-input>
                                    </span>
                                </div>
                            </el-col>
                        </el-row>

                        <el-row class="content-row">
                            <el-col :span="10" class="content-label content-style">
                                <div class="grid-content-label"><label class="label-space">{{$t('table.contact.lastName')}}: </label></div>
                            </el-col>
                            <el-col :span="5" class="content-vlaue">
                                <div class="grid-content">
                                    <span>
                                        <el-input
                                        placeholder="Please add last name"
                                        v-model="userData.lastName"
                                        clearable>
                                        </el-input>
                                    </span>
                                </div>
                            </el-col>
                        </el-row>

                        <el-row class="content-row">
                            <el-col :span="10" class="content-label content-style">
                                <div class="grid-content-label"><label class="label-space">{{$t('table.phone')}}: </label></div>
                            </el-col>
                            <el-col :span="5" class="content-vlaue">
                                <div class="grid-content">
                                    <span>
                                        <el-input
                                        placeholder="Please add phone"
                                        v-model="userData.phone"
                                        clearable>
                                        </el-input>
                                    </span>
                                </div>
                            </el-col>
                        </el-row>

                        <el-row class="content-row">
                            <el-col :span="10" class="content-label content-style">
                                <div class="grid-content-label"><label class="label-space">{{$t('table.email')}}: </label></div>
                            </el-col>
                            <el-col :span="5" class="content-vlaue">
                                <div class="grid-content">
                                    <span>
                                        <el-input
                                        placeholder="Please add email"
                                        v-model="userData.email"
                                        clearable>
                                        </el-input>
                                    </span>
                                </div>
                            </el-col>
                        </el-row>

                        <el-row class="content-row">
                            <el-col :span="10" class="content-label content-style">
                                <div class="grid-content-label"><label class="label-space">{{$t('table.user.username')}}: </label></div>
                            </el-col>
                            <el-col :span="5" class="content-vlaue">
                                <div class="grid-content">
                                    <span>
                                        <el-input
                                        placeholder="Please add username"
                                        v-model="userData.username"
                                        clearable>
                                        </el-input>
                                    </span>
                                </div>
                            </el-col>
                        </el-row>

                        <el-row class="content-row">
                            <el-col :span="14"  class="content-label">
                                <router-link :to="'/users'">
                                    <el-button>
                                        Cancel
                                    </el-button>
                                </router-link>
                            </el-col>
                            <el-col :span="2"  class="content-button">
                                <el-button type="primary">
                                    Submit
                                </el-button>
                            </el-col>
                        </el-row>
                    </el-form>
                </el-card>
            </el-row>
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { defaultUserData } from '@/api/users'
import Multiselect from 'vue-multiselect'

@Component({
  name: 'UserNew',
  components: { Multiselect }
})
export default class extends Vue {
    private userData = defaultUserData
}
</script>

<style lang="scss" scoped>
.content-label {
    text-align: end;
}

.content-style {
    padding-top: 1em;
}

.content-vlaue {
    margin-left: 3%;
}

.content-row {
    margin-bottom: 1%;
}

.content-button {
    margin-left: 28px;
}
</style>
