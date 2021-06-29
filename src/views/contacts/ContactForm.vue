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
                              active-value='male'
                              active-text="Male"
                              active-color="#13ce66"
                              inactive-value='female'
                              inactive-color="#ff4949"
                              inactive-text="Female">
                              </el-switch>
                          </el-form-item>
                        </el-col>
                      </el-row>
                      <el-row align="middle" v-if="this.campaign">
                        <el-col :span="24">
                          <fieldset class="mx-25-ratio mb-10-px">
                            <legend><el-button type="primary" @click="addField" icon="el-icon-circle-plus-outline" circle></el-button> Custom fields</legend>
                            <el-form-item label-width="20%" :label="'Custom Field ' + (index + 1)" label-position="right" v-for="(field, index) in fields" :key="field.key">
                              <el-col :span="10" class="mr-10-px">
                                <el-input
                                placeholder="Please add label name"
                                v-model="field.label"
                                clearable>
                                </el-input>
                              </el-col>
                              <el-col :span="10">
                                <el-input
                                placeholder="Please add value"
                                v-model="field.value"
                                clearable>
                                </el-input>
                              </el-col>
                              <el-col :span="2" class="ml-10-px">
                                <el-button type="primary" class="el-icon-delete" circle @click.prevent="removeField(field)"></el-button>
                              </el-col>
                            </el-form-item>
                          </fieldset>
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
import { createRecipient } from '@/api/recipients'
import { getCompanyNames } from '@/api/companies'
import { Form } from 'element-ui'
import { convertToHash, convertToJSON } from '@/utils/json'
import { getTagNames } from '@/api/tags'
import Multiselect from 'vue-multiselect'
import { map, isEmpty, filter, omit, snakeCase } from 'lodash'
import { TagsViewModule } from '@/store/modules/tags-view'
import VuePhoneNumberInput from 'vue-phone-number-input'

@Component({
  name: 'ContactForm',
  components: { Multiselect, VuePhoneNumberInput }
})
export default class extends Vue {
    @Prop({ required: true }) private title!: string
    @Prop({ default: false }) private campaign!: boolean
    @Prop({ default: false }) private redirect!: string
    private contactData: any = defaultContactData
    private id = -1
    private companies :string[] = []
    private tags :any[] = []
    private isValid = true

    private fields :any[] = []

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
        { validator: this.validatePhone, trigger: 'blur' }
      ]
    }

    created() {
      const id = this.$route.params && this.$route.params.id
      if (id) {
        this.id = parseInt(id)
        this.fetchContact(parseInt(id))
      } else {
        this.contactData = defaultContactData
      }
      this.fetchCompanies()
    }

    private addField() {
      this.fields.push({
        key: this.fields.length + 1,
        value: '',
        label: ''
      })
    }

    private removeField(field) {
      var index = this.fields.indexOf(field)
      if (index !== -1) {
        this.fields.splice(index, 1)
      }
    }

    private updateCountryCode(event) {
      this.contactData.countryCode = event.countryCode
      this.contactData.countryExtension = event.countryCallingCode
      this.isValid = event.isValid
    }

    private validatePhone(rule, value, callback) {
      if (value === '') {
        callback(new Error('Please input the phone'))
      } else if (!this.isValid) {
        callback(new Error('Please enter valid phone number'))
      } else {
        callback()
      }
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
        const { data } = await getTagNames(id)
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
        const customFields = {}
        this.fields.forEach(field => {
          if (!isEmpty(field.label) && !isEmpty(field.value)) {
            customFields[snakeCase(field.label)] = field.value
          }
        })
        this.contactData.customFields = customFields
        if (valid) {
          let data = this.contactData
          if (this.title === 'New Contact') {
            data = await createContact({ recipient: convertToHash(this.contactData) })

            if (this.campaign) {
              const id = this.$route.params && this.$route.params.campaignId
              data = await createRecipient(parseInt(id), { recipient: { recipient_id: data.data.id, data: customFields } })
            }
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
      let name = (this.title === 'New Contact') ? 'ContactCreate' : 'ContactEdit'
      if (this.campaign) {
        name = 'RecipientCreate'
      }
      const view = filter(TagsViewModule.visitedViews, ['name', name])
      TagsViewModule.delView(view[0])
      this.$router.push({ path: this.redirect })
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
