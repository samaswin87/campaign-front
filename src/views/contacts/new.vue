<template>
    <div class="app-container">
        <div class="contact-container">
            <el-row class="mb-10-px">
                <el-card class="box-card">
                    <div slot="header" class="clearfix">
                        <span>New contact</span>
                    </div>
                    <el-form
                    ref="contactForm"
                    :model="contactData"
                    :rules="rules"
                    label-width="40%"
                    class="form-container"
                    >
                        <el-form-item :label="$t('table.company')" label-position="right" prop="company">
                            <el-select
                                v-model="contactData.company"
                                placeholder="Select a company"
                                @change="changeCompany"
                                class="w-30-ratio">
                                <el-option
                                v-for="item in companies"
                                :key="item.id"
                                :label="item.name"
                                :value="item.id">
                                </el-option>
                            </el-select>
                        </el-form-item>

                        <el-form-item :label="$t('table.contact.firstName')" label-position="right" prop="firstName">
                            <el-input
                            placeholder="Please add first name"
                            v-model="contactData.firstName"
                            class="w-30-ratio"
                            clearable>
                            </el-input>
                        </el-form-item>

                        <el-form-item :label="$t('table.contact.lastName')" label-position="right" prop="lastName">
                            <el-input
                            placeholder="Please add last name"
                            v-model="contactData.lastName"
                            class="w-30-ratio"
                            clearable>
                            </el-input>
                        </el-form-item>

                        <el-form-item :label="$t('table.contact.middleName')" label-position="right" prop="middleName">
                            <el-input
                            placeholder="Please add middle name"
                            v-model="contactData.middleName"
                            class="w-30-ratio"
                            clearable>
                            </el-input>
                        </el-form-item>

                        <el-form-item :label="$t('table.contact.email')" label-position="right" prop="email">
                            <el-input
                            placeholder="Please add email"
                            v-model="contactData.email"
                            class="w-30-ratio"
                            clearable>
                            </el-input>
                        </el-form-item>

                        <el-form-item :label="$t('table.phone')" label-position="right" prop="phone">
                            <el-input
                            class="w-30-ratio"
                            placeholder="Please add phone"
                            v-model="contactData.phone"
                            clearable>
                            </el-input>
                        </el-form-item>

                        <el-form-item :label="$t('table.contact.gender')" label-position="right" prop="gender">
                            <el-switch
                            v-model="contactData.gender"
                            active-text="Male"
                            active-color="#13ce66"
                            inactive-color="#ff4949"
                            inactive-text="Female">
                            </el-switch>
                        </el-form-item>

                        <el-form-item :label="$t('table.tags')" label-position="right" prop="tags">
                            <multiselect
                            v-model="contactData.tags"
                            class="w-30-ratio"
                            tag-placeholder="Add this as new tag"
                            placeholder="Search or add a tag"
                            :options="tags"
                            label="name"
                            track-by="name"
                            :multiple="true"
                            :clear-on-select="false"
                            :close-on-select="false"
                            :taggable="true"
                            @tag="addTag"
                            >
                            </multiselect>
                        </el-form-item>

                        <el-form-item :label="$t('table.contact.notes')" label-position="right" prop="notes">
                            <el-input
                            class="w-30-ratio"
                            type="textarea"
                            :rows="2"
                            placeholder="Please add notes"
                            v-model="contactData.notes"
                            clearable>
                            </el-input>
                        </el-form-item>

                        <el-form-item size="large">
                            <router-link :to="'/contacts'">
                                <el-button class="ml-11-ratio mr-10-px">
                                    Cancel
                                </el-button>
                            </router-link>
                            <el-button type="primary" @click="submitForm()">
                                Submit
                            </el-button>
                        </el-form-item>
                    </el-form>
                </el-card>
            </el-row>
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { defaultContactData } from '@/api/contacts'
import { getCompanyNames } from '@/api/companies'
import { Form } from 'element-ui'
import { getTagNames } from '@/api/tags'
import Multiselect from 'vue-multiselect'

@Component({
  name: 'ContactView',
  components: { Multiselect }
})
export default class extends Vue {
    private contactData = defaultContactData
    private companies :string[] = []
    private tags :any[] = []

    // Validation reference: https://programmer.help/blogs/three-ways-of-form-validation-in-element-ui.html
    private rules = {
      company: [
        { required: true, message: 'Please select one company', trigger: 'blur' }
      ],
      firstName: [
        { required: true, message: 'Please input first name', trigger: 'blur' },
        { min: 3, message: 'Length should be more than 3', trigger: 'blur' }
      ],
      lastName: [
        { required: true, message: 'Please input last name', trigger: 'blur' },
        { min: 3, message: 'Length should be more than 3', trigger: 'blur' }
      ],
      email: [
        { required: true, message: 'Please input valid email', trigger: 'blur', pattern: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/ }
      ],
      phone: [
        { required: true, message: 'Please input phone', trigger: 'blur' }
      ]
    }

    created() {
      this.fetchCompanies()
    }

    private async fetchCompanies() {
      try {
        const { data } = await getCompanyNames()
        this.companies = data
      } catch (err) {
        console.error(err)
      }
    }

    private changeCompany(data: any) {
      this.fetchTags(data)
    }

    private async fetchTags(id: number) {
      try {
        const { data } = await getTagNames(id, { })
        this.tags = data
      } catch (err) {
        console.error(err)
      }
    }

    private validEmail(email) {
      var format = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      return format.test(email)
    }

    private submitForm() {
      (this.$refs.contactForm as Form).validate(async(valid) => {
        if (valid) {
          console.log(this.contactData)
        }
      })
    }

    addTag(newTag: string) {
      this.contactData.tags.push(newTag)
      this.contactData.tags.push(newTag)
    }
}
</script>
