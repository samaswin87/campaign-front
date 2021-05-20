<template>
    <el-dialog
      title="Add Destination URL"
      :visible.sync="visible"
      width="60%"
      :before-close="handleClose"
    >
      <el-form
        ref="destinationForm"
        :model="responseRecord"
      >
        <el-input type="text" v-model="responseRecord.destinationURL">
          <template slot="prepend">https://</template>
        </el-input>

        <el-divider content-position="center">MAP PARAMETERS</el-divider>
        <el-row>
          <el-col :span="12"><el-divider content-position="center">CONTACTS</el-divider></el-col>
          <el-col :span="12"><el-divider content-position="center">GOOGLE ANALYTICS</el-divider></el-col>
        </el-row>
        <el-row>
          <el-col :span="5">
            <el-checkbox v-model="urlParams.phoneNumberOption" label="phone_number" class="full-width" border></el-checkbox>
          </el-col>
          <el-col :span="2" class="align-center">
            <svg-icon name="exchange" class="svg-icon-connect"/>
          </el-col>
          <el-col :span="4" class="margin-right-20">
            <el-input type="text" v-model="urlParams.phoneNumber" placeholder="{phone_number}">
            </el-input>
          </el-col>
          <el-col :span="5">
            <el-checkbox v-model="urlParams.utmSourceOption" label="utm_source" class="full-width" border></el-checkbox>
          </el-col>
          <el-col :span="2" class="align-center">
            <svg-icon name="exchange" class="svg-icon-connect"/>
          </el-col>
          <el-col :span="5">
            <el-input type="text" v-model="urlParams.utmSource">
            </el-input>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="5">
            <el-checkbox v-model="urlParams.firstNameOption" label="first_name" class="full-width" border></el-checkbox>
          </el-col>
          <el-col :span="2" class="align-center">
            <svg-icon name="exchange" class="svg-icon-connect"/>
          </el-col>
          <el-col :span="4" class="margin-right-20">
            <el-input type="text" v-model="urlParams.firstName" placeholder="{first_name}">
            </el-input>
          </el-col>
          <el-col :span="5">
            <el-checkbox v-model="urlParams.utmMediumOption" label="utm_medium" class="full-width" border></el-checkbox>
          </el-col>
          <el-col :span="2" class="align-center">
            <svg-icon name="exchange" class="svg-icon-connect"/>
          </el-col>
          <el-col :span="5">
            <el-input type="text" v-model="urlParams.utmMedium">
            </el-input>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="5">
            <el-checkbox v-model="urlParams.lastNameOption" label="last_name" class="full-width" border></el-checkbox>
          </el-col>
          <el-col :span="2" class="align-center">
            <svg-icon name="exchange" class="svg-icon-connect"/>
          </el-col>
          <el-col :span="4" class="margin-right-20">
            <el-input type="text" v-model="urlParams.lastName" placeholder="{last_name}">
            </el-input>
          </el-col>
          <el-col :span="5">
            <el-checkbox v-model="urlParams.utmCampaignOption" label="utm_campaign" class="full-width" border></el-checkbox>
          </el-col>
          <el-col :span="2" class="align-center">
            <svg-icon name="exchange" class="svg-icon-connect"/>
          </el-col>
          <el-col :span="5">
            <el-input type="text" v-model="urlParams.utmCampaign">
            </el-input>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24"><el-divider content-position="center">PROMT PARAMS</el-divider></el-col>
        </el-row>
      </el-form>
      <div
        slot="footer"
        class="dialog-footer"
      >
        <el-button @click="close">
          {{ $t('table.cancel') }}
        </el-button>
        <el-button
          type="primary"
          @click="addResponse"
        >
          {{ $t('common.add') }}
        </el-button>
      </div>
    </el-dialog>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import { Form } from 'element-ui'
import { defaultFinalResponseData } from '@/api/menus'

@Component({
  name: 'AddDestinationURL',
  components: { }
})
export default class extends Vue {
    @Prop({ required: true }) private visible!: boolean
    @Prop({ required: false }) private order!: number

    private responseRecord = defaultFinalResponseData
    private urlParams = {
      phoneNumber: '',
      firstName: '',
      lastName: '',
      utmSource: '',
      utmMedium: '',
      utmCampaign: '',
      phoneNumberOption: true,
      firstNameOption: true,
      lastNameOption: true,
      utmSourceOption: true,
      utmMediumOption: true,
      utmCampaignOption: true
    }

    private addResponse() {
      (this.$refs.destinationForm as Form).validate(async(valid) => {
        if (valid) {
          this.$emit('addDestinationURL', this.responseRecord)
        }
      })
      this.$emit('update:visible', false)
    }

    private close() {
      this.$emit('update:visible', false)
    }

    handleClose() {
      this.$emit('update:visible', false)
    }
}
</script>

<style lang="scss" scoped>

.input-group {
  margin-bottom: 10px;
}

.align-center {
  text-align: center;
}

.svg-icon-connect {
  width: 2em !important;
  height: 3em !important;
}
</style>
