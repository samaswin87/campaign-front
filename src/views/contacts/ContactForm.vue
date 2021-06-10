<template>
    <div class="app-container">
        <div class="contact-container">
            <el-row class="mb-10-px">
                <el-card class="box-card">
                    <div slot="header" class="clearfix">
                        <span>{{title}}</span>
                    </div>
                    <el-form
                    ref="contactForm"
                    :model="contactData"
                    :rules="rules"
                    label-width="40%"
                    class="form-container"
                    >
                      <el-row>
                        <el-col :span="12">
                          <el-form-item :label="$t('table.company')" label-position="right" prop="companyId">
                            <el-select
                                v-model="contactData.companyId"
                                placeholder="Select a company"
                                @change="changeCompany"
                                class="w-100-ratio">
                                <el-option
                                v-for="item in companies"
                                :key="item.id"
                                :label="item.name"
                                :value="item.id">
                                </el-option>
                            </el-select>
                          </el-form-item>

                          <el-form-item :label="$t('table.contact.email')" label-position="right" prop="email">
                            <el-input
                            placeholder="Please add email"
                            v-model="contactData.email"
                            clearable>
                            </el-input>
                          </el-form-item>

                          <el-form-item :label="$t('table.phone')" label-position="right" prop="phone">
                              <VuePhoneNumberInput v-model="contactData.phone" :default-country-code="contactData.countryCode" @update="updateCountryCode($event)"/>
                          </el-form-item>

                          <el-form-item :label="$t('table.tags')" label-position="right" prop="tags">
                            <multiselect
                            v-model="contactData.tags"
                            tag-placeholder="Add this as new tag"
                            placeholder="Search or add a tag"
                            :options="tags"
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
                              type="textarea"
                              :rows="2"
                              placeholder="Please add notes"
                              v-model="contactData.notes"
                              clearable>
                              </el-input>
                          </el-form-item>
                        </el-col>
                        <el-col :span="12">
                          <el-form-item :label="$t('table.contact.firstName')" label-position="right" prop="firstName">
                              <el-input
                              placeholder="Please add first name"
                              v-model="contactData.firstName"
                              clearable>
                              </el-input>
                          </el-form-item>

                          <el-form-item :label="$t('table.contact.lastName')" label-position="right" prop="lastName">
                              <el-input
                              placeholder="Please add last name"
                              v-model="contactData.lastName"
                              clearable>
                              </el-input>
                          </el-form-item>

                          <el-form-item :label="$t('table.contact.middleName')" label-position="right" prop="middleName">
                              <el-input
                              placeholder="Please add middle name"
                              v-model="contactData.middleName"
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
                        </el-col>
                      </el-row>
                      <el-form-item size="large">
                        <el-button class="ml-11-ratio mr-10-px" @click="close">
                            Cancel
                        </el-button>
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
import { Component, Vue, Prop } from 'vue-property-decorator'
import { defaultContactData, createContact, getContact, updateContact } from '@/api/contacts'
import { getCompanyNames } from '@/api/companies'
import { Form } from 'element-ui'
import { convertToHash, convertToJSON } from '@/utils/json'
import { getTagNames } from '@/api/tags'
import Multiselect from 'vue-multiselect'
import { map, isEmpty, filter, omit } from 'lodash'
import { TagsViewModule } from '@/store/modules/tags-view'
import VuePhoneNumberInput from 'vue-phone-number-input'

@Component({
  name: 'ContactForm',
  components: { Multiselect, VuePhoneNumberInput }
})
export default class extends Vue {
    @Prop({ required: true }) private title!: string
    private contactData: any = defaultContactData
    private id = -1
    private companies :string[] = []
    private tags :any[] = []

    // Validation reference: https://programmer.help/blogs/three-ways-of-form-validation-in-element-ui.html
    private rules = {
      companyId: [
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
      console.log(this.contactData.country_code)
      const id = this.$route.params && this.$route.params.id
      if (id) {
        this.id = parseInt(id)
        this.fetchContact(parseInt(id))
      }
      this.fetchCompanies()
    }

    private updateCountryCode(event) {
      this.contactData.country_code = event.countryCode
      this.contactData.country_extension = event.countryCallingCode
    }

    private async fetchCompanies() {
      try {
        const { data } = await getCompanyNames()
        this.companies = data
      } catch (err) {
        console.error(err)
      }
    }

    private async fetchContact(id: number) {
      try {
        const { data } = await getContact(id, {})
        this.contactData = convertToJSON(data)
        this.fetchTags(data.company_id)
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
        this.tags = map(data, 'name')
      } catch (err) {
        console.error(err)
      }
    }

    private validEmail(email) {
      var format = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      return format.test(email)
    }

    private async submitForm() {
      (this.$refs.contactForm as Form).validate(async(valid) => {
        if (valid) {
          let data = this.contactData
          if (this.title === 'New Contact') {
            data = await createContact({ recipient: convertToHash(this.contactData) })
          } else if (this.id > 0) {
            const recipient = omit(convertToHash(this.contactData), ['id', 'archived_at', 'keywords', 'custom_fields', 'created_by_id', 'updated_by_id', 'created_at', 'updated_at', 'company_name'])
            data = await updateContact(this.id, { recipient: recipient })
          }

          if (!isEmpty(data)) {
            this.close()
          }
        }
      })
    }

    private close() {
      const name = (this.title === 'New Contact') ? 'ContactCreate' : 'ContactEdit'
      const view = filter(TagsViewModule.visitedViews, ['name', name])
      TagsViewModule.delView(view[0])
      this.$router.push({ path: '/contacts' })
    }

    addTag(newTag: string) {
      this.contactData.tags.push(newTag)
      this.contactData.tags.push(newTag)
    }
}
</script>

<style scoped>
::v-deep .country-selector__label {
  top: -6px !important;
}

::v-deep .input-tel__label {
  top: -6px !important;
}
</style>
