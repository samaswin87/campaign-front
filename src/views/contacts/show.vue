<template>
    <div class="app-container">
        <div class="contact-container">
            <el-row>
                <el-card class="box-card">
                    <div slot="header" class="clearfix">
                        <span>Contact</span>
                    </div>
                    <div>
                        <el-row class="content-row">
                            <el-col :span="10" class="content-label">
                                <div class="grid-content"><label class="label-space">{{$t('table.status')}}:</label></div>
                            </el-col>
                            <el-col :span="10" class="content-vlaue">
                                <div class="grid-content"><span><el-tag type="success">{{contactData.status}}</el-tag></span></div>
                            </el-col>
                        </el-row>
                        <el-row class="content-row">
                            <el-col :span="10" class="content-label">
                                <div class="grid-content"><label class="label-space">{{$t('table.company')}}:</label></div>
                            </el-col>
                            <el-col :span="10" class="content-vlaue">
                                <div class="grid-content"><span>{{contactData.company}}</span></div>
                            </el-col>
                        </el-row>

                        <el-row class="content-row">
                            <el-col :span="10" class="content-label">
                                <div class="grid-content"><label class="label-space">{{$t('table.contact.firstName')}}: </label></div>
                            </el-col>
                            <el-col :span="10" class="content-vlaue">
                                <div class="grid-content"><span>{{contactData.firstName}}</span></div>
                            </el-col>
                        </el-row>

                        <el-row class="content-row">
                            <el-col :span="10" class="content-label">
                                <div class="grid-content"><label class="label-space">{{$t('table.contact.lastName')}}: </label></div>
                            </el-col>
                            <el-col :span="10" class="content-vlaue">
                                <div class="grid-content"><span>{{contactData.lastName}}</span></div>
                            </el-col>
                        </el-row>

                        <el-row class="content-row">
                            <el-col :span="10" class="content-label">
                                <div class="grid-content"><label class="label-space">{{$t('table.contact.middleName')}}: </label></div>
                            </el-col>
                            <el-col :span="10" class="content-vlaue">
                                <div class="grid-content"><span>{{contactData.middleName}}</span></div>
                            </el-col>
                        </el-row>

                        <el-row class="content-row">
                            <el-col :span="10" class="content-label">
                                <div class="grid-content"><label class="label-space">{{$t('table.contact.gender')}}: </label></div>
                            </el-col>
                            <el-col :span="10" class="content-vlaue">
                                <div class="grid-content"><span>{{contactData.gender}}</span></div>
                            </el-col>
                        </el-row>

                        <el-row class="content-row">
                            <el-col :span="10" class="content-label">
                                <div class="grid-content"><label class="label-space">{{$t('table.contact.email')}}: </label></div>
                            </el-col>
                            <el-col :span="10" class="content-vlaue">
                                <div class="grid-content"><span>{{contactData.email}}</span></div>
                            </el-col>
                        </el-row>

                        <el-row class="content-row">
                            <el-col :span="10" class="content-label">
                                <div class="grid-content"><label class="label-space">{{$t('table.contact.tags')}}: </label></div>
                            </el-col>
                            <el-col :span="10" class="content-vlaue">
                                <div class="grid-content">
                                    <span>
                                        <el-tag
                                        v-for="item in contactData.tags"
                                        class="tags"
                                        :key="item"
                                        >
                                            {{ item }}
                                        </el-tag>
                                    </span>
                                </div>
                            </el-col>
                        </el-row>

                        <el-row class="content-row">
                            <el-col :span="10" class="content-label">
                                <div class="grid-content"><label class="label-space">{{$t('table.contact.noOfCampaigns')}}: </label></div>
                            </el-col>
                            <el-col :span="10" class="content-vlaue">
                                <div class="grid-content"><span>{{contactData.noOfCampaigns}}</span></div>
                            </el-col>
                        </el-row>

                        <el-row class="content-row">
                            <el-col :span="10" class="content-label">
                                <div class="grid-content"><label class="label-space">{{$t('table.contact.keywords')}}: </label></div>
                            </el-col>
                            <el-col :span="10" class="content-vlaue">
                                <div class="grid-content">
                                    <span>
                                        <el-tag
                                        v-for="item in contactData.keywords"
                                        class="tags"
                                        :key="item"
                                        >
                                            {{ item }}
                                        </el-tag>
                                    </span>
                                </div>
                            </el-col>
                        </el-row>

                        <el-row class="content-row">
                            <el-col :span="10" class="content-label">
                                <div class="grid-content"><label class="label-space">{{$t('table.contact.phone')}}: </label></div>
                            </el-col>
                            <el-col :span="10" class="content-vlaue">
                                <div class="grid-content"><span>{{contactData.phone}}</span></div>
                            </el-col>
                        </el-row>

                        <el-row class="content-row">
                            <el-col :span="10" class="content-label">
                                <div class="grid-content"><label class="label-space">{{$t('table.contact.notes')}}: </label></div>
                            </el-col>
                            <el-col :span="10" class="content-vlaue">
                                <div class="grid-content"><span>{{contactData.notes}}</span></div>
                            </el-col>
                        </el-row>

                        <el-row class="content-row">
                            <el-col :span="12"  class="content-label">
                                <div class="grid-content">
                                    <router-link :to="'/contacts'">
                                        <el-button type="primary" icon="el-icon-caret-left">
                                            Back
                                        </el-button>
                                    </router-link>
                                </div>
                            </el-col>
                        </el-row>
                    </div>
                </el-card>
            </el-row>
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { defaultContactData, getContact } from '@/api/contacts'

@Component({
  name: 'ContactView'
})
export default class extends Vue {
    private contactData = defaultContactData

    created() {
      const id = this.$route.params && this.$route.params.id
      this.fetchData(parseInt(id))
    }

    private async fetchData(id: number) {
      try {
        const { data } = await getContact(id, { /* Your params here */ })
        this.contactData = data.contact
      } catch (err) {
        console.error(err)
      }
    }
}
</script>

<style lang="scss" scoped>
.content-label {
    text-align: end;
}

.content-vlaue {
    margin-left: 3%;
}

.content-row {
    margin-bottom: 1%;
}

.tags {
  margin-left: 6px;
}
</style>
