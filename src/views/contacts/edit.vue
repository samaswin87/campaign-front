<template>
    <div class="app-container">
        <div class="contact-container">
            <el-row>
                <el-card class="box-card">
                    <div slot="header" class="clearfix">
                        <span>Contact</span>
                    </div>
                    <el-form
                    ref="contactForm"
                    :model="contactData"
                    class="form-container"
                    >
                        <el-row class="content-row">
                            <el-col :span="10" class="content-label">
                                <div class="grid-content"><label class="label-space">{{$t('table.company')}}:</label></div>
                            </el-col>
                            <el-col :span="10" class="content-vlaue">
                                <div class="grid-content">
                                    <el-select v-model="contactData.company" clearable filterable placeholder="Select Company">
                                        <el-option
                                        v-for="item in companies"
                                        :key="item.id"
                                        :label="item.name"
                                        :value="item.id">
                                        </el-option>
                                    </el-select>
                                </div>
                            </el-col>
                        </el-row>

                        <el-row class="content-row">
                            <el-col :span="10" class="content-label">
                                <div class="grid-content"><label class="label-space">{{$t('table.contact.firstName')}}: </label></div>
                            </el-col>
                            <el-col :span="5" class="content-vlaue">
                                <div class="grid-content">
                                    <span>
                                        <el-input
                                        placeholder="Please add first name"
                                        v-model="contactData.firstName"
                                        clearable>
                                        </el-input>
                                    </span>
                                </div>
                            </el-col>
                        </el-row>

                        <el-row class="content-row">
                            <el-col :span="10" class="content-label">
                                <div class="grid-content"><label class="label-space">{{$t('table.contact.lastName')}}: </label></div>
                            </el-col>
                            <el-col :span="5" class="content-vlaue">
                                <div class="grid-content">
                                    <span>
                                        <el-input
                                        placeholder="Please add last name"
                                        v-model="contactData.lastName"
                                        clearable>
                                        </el-input>
                                    </span>
                                </div>
                            </el-col>
                        </el-row>

                        <el-row class="content-row">
                            <el-col :span="10" class="content-label">
                                <div class="grid-content"><label class="label-space">{{$t('table.contact.middleName')}}: </label></div>
                            </el-col>
                            <el-col :span="5" class="content-vlaue">
                                <div class="grid-content">
                                    <span>
                                         <el-input
                                        placeholder="Please add middle name"
                                        v-model="contactData.middleName"
                                        clearable>
                                        </el-input>
                                    </span>
                                </div>
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
                            <el-col :span="5" class="content-vlaue">
                                <div class="grid-content">
                                    <span>
                                        <el-input
                                        placeholder="Please add email"
                                        v-model="contactData.email"
                                        clearable>
                                        </el-input>
                                    </span>
                                </div>
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
                                <div class="grid-content"><label class="label-space">{{$t('table.contact.phone')}}: </label></div>
                            </el-col>
                            <el-col :span="5" class="content-vlaue">
                                <div class="grid-content">
                                    <span>
                                        <el-input
                                        placeholder="Please add phone"
                                        v-model="contactData.phone"
                                        clearable>
                                        </el-input>
                                    </span>
                                </div>
                            </el-col>
                        </el-row>

                        <el-row class="content-row">
                            <el-col :span="10" class="content-label">
                                <div class="grid-content"><label class="label-space">{{$t('table.contact.notes')}}: </label></div>
                            </el-col>
                            <el-col :span="5" class="content-vlaue">
                                <div class="grid-content">
                                    <span>
                                        <el-input
                                        type="textarea"
                                        :rows="2"
                                        placeholder="Notes"
                                        v-model="contactData.notes">
                                        </el-input>
                                    </span>
                                </div>
                            </el-col>
                        </el-row>
                    </el-form>

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
                </el-card>
            </el-row>
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { defaultContactData, getContact } from '@/api/contacts'
import { getCompanies } from '@/api/companies'

@Component({
  name: 'ContactView'
})
export default class extends Vue {
    private contactData = defaultContactData
    private companies = null;

    created() {
      const id = this.$route.params && this.$route.params.id
      this.fetchData(parseInt(id))
      this.fetchCompany()
    }

    private async fetchData(id: number) {
      try {
        const { data } = await getContact(id, { /* Your params here */ })
        this.contactData = data.contact
      } catch (err) {
        console.error(err)
      }
    }

    private async fetchCompany() {
      try {
        const { data } = await getCompanies({ /* Your params here */ })
        this.companies = data.items
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
