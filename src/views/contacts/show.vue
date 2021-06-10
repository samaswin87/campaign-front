<template>
    <div class="app-container">
        <div class="contact-container">
            <el-row>
                <el-card class="box-card">
                    <div slot="header" class="clearfix">
                        <span>Contact</span>
                    </div>
                    <div>
                        <el-row>
                            <el-col :span="12">
                                <el-row class="mb-10-px">
                                    <el-col :span="6" class="text-right mt-5-px">
                                        <label>{{$t('table.status')}}:</label>
                                    </el-col>
                                    <el-col :span="10">
                                        <span class="ml-10-px"><el-tag type="success">{{contactData.status}}</el-tag></span>
                                    </el-col>
                                </el-row>

                                <el-row class="mb-10-px">
                                    <el-col :span="6"  class="text-right">
                                        <label>{{$t('table.company')}}:</label>
                                    </el-col>
                                    <el-col :span="10">
                                        <span class="ml-10-px">{{contactData.company_name}}</span>
                                    </el-col>
                                </el-row>

                                <el-row class="mb-10-px">
                                    <el-col :span="6" class="text-right">
                                        <label>{{$t('table.contact.email')}}: </label>
                                    </el-col>
                                    <el-col :span="10">
                                        <span class="ml-10-px">{{contactData.email}}</span>
                                    </el-col>
                                </el-row>

                                <el-row class="mb-10-px">
                                    <el-col :span="6" class="text-right">
                                        <label>{{$t('table.phone')}}: </label>
                                    </el-col>
                                    <el-col :span="10">
                                        <span class="ml-10-px">{{contactData.phone}}</span>
                                    </el-col>
                                </el-row>

                                <el-row class="mb-10-px">
                                    <el-col :span="6" class="text-right">
                                        <label>{{$t('table.tags')}}: </label>
                                    </el-col>
                                    <el-col :span="10">
                                        <span class="ml-10-px">
                                            <el-tag
                                            v-for="item in contactData.tags"
                                            class="tags"
                                            :key="item"
                                            >
                                                {{ item }}
                                            </el-tag>
                                        </span>
                                    </el-col>
                                </el-row>

                                <el-row class="mb-10-px">
                                    <el-col :span="6" class="text-right">
                                        <label>{{$t('table.contact.notes')}}: </label>
                                    </el-col>
                                    <el-col :span="10">
                                        <span class="ml-10-px">{{contactData.notes}}</span>
                                    </el-col>
                                </el-row>
                            </el-col>
                            <el-col :span="12">
                                <el-row class="mb-10-px">
                                    <el-col :span="6"  class="text-right">
                                        <label>{{$t('table.contact.firstName')}}: </label>
                                    </el-col>
                                    <el-col :span="10">
                                        <span class="ml-10-px">{{contactData.first_name}}</span>
                                    </el-col>
                                </el-row>

                                <el-row class="mb-10-px">
                                    <el-col :span="6"  class="text-right">
                                        <label>{{$t('table.contact.lastName')}}: </label>
                                    </el-col>
                                    <el-col :span="10">
                                        <span class="ml-10-px">{{contactData.last_name}}</span>
                                    </el-col>
                                </el-row>

                                <el-row class="mb-10-px">
                                    <el-col :span="6"  class="text-right">
                                        <label>{{$t('table.contact.middleName')}}: </label>
                                    </el-col>
                                    <el-col :span="10">
                                        <span class="ml-10-px">{{contactData.middle_name}}</span>
                                    </el-col>
                                </el-row>

                                <el-row class="mb-10-px">
                                    <el-col :span="6" class="text-right mt-1-px">
                                        <label>{{$t('table.contact.gender')}}: </label>
                                    </el-col>
                                    <el-col :span="10">
                                        <span class="ml-10-px">
                                            <el-switch
                                            v-model="contactData.gender"
                                            active-text="Male"
                                            disabled
                                            active-color="#13ce66"
                                            inactive-color="#ff4949"
                                            inactive-text="Female">
                                            </el-switch>
                                        </span>
                                    </el-col>
                                </el-row>

                                <el-row class="mb-10-px">
                                    <el-col :span="6" class="text-right">
                                        <label>{{$t('table.contact.noOfCampaigns')}}: </label>
                                    </el-col>
                                    <el-col :span="10">
                                        <span class="ml-10-px">{{contactData.no_of_campaigns}}</span>
                                    </el-col>
                                </el-row>

                                <el-row class="mb-10-px">
                                    <el-col :span="6" class="text-right">
                                        <label>{{$t('table.contact.keywords')}}: </label>
                                    </el-col>
                                    <el-col :span="10">
                                        <span class="ml-10-px">
                                            <el-tag
                                            v-for="item in contactData.keywords"
                                            class="tags"
                                            :key="item"
                                            >
                                                {{ item }}
                                            </el-tag>
                                        </span>
                                    </el-col>
                                </el-row>

                            </el-col>
                        </el-row>
                        <el-row class="mb-10-px">
                            <el-col :span="12" class="text-right">
                                <el-button type="primary" icon="el-icon-caret-left" @click="back">
                                    Back
                                </el-button>
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
import { filter } from 'lodash'
import { TagsViewModule } from '@/store/modules/tags-view'

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
        const { data } = await getContact(id, {})
        this.contactData = data
      } catch (err) {
        console.error(err)
      }
    }

    private back() {
      const view = filter(TagsViewModule.visitedViews, ['name', 'ContactView'])
      TagsViewModule.delView(view[0])
      this.$router.push({ path: '/contacts' })
    }
}
</script>
