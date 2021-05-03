<template>
    <el-dialog
      title="Contact"
      width="30%"
      :visible.sync="visible"
    >
        <el-row class="form-group">
            <el-col :span="12"><div class="grid-content"><label class="label-space">{{$t('table.status')}}:</label></div></el-col>
            <el-col :span="4"><div class="grid-content"><span>{{contactData.status}}</span></div></el-col>
        </el-row>
        <el-row class="form-group">
            <el-col :span="12"><div class="grid-content"><label class="label-space">{{$t('table.company')}}:</label></div></el-col>
            <el-col :span="4"><div class="grid-content"><span>{{contactData.company}}</span></div></el-col>
        </el-row>

        <el-row class="form-group">
            <el-col :span="12"><div class="grid-content"><label class="label-space">{{$t('table.contact.firstName')}}: </label></div></el-col>
            <el-col :span="4"><div class="grid-content"><span>{{contactData.first}}</span></div></el-col>
        </el-row>

        <el-row class="form-group">
            <el-col :span="12"><div class="grid-content"><label class="label-space">{{$t('table.contact.lastName')}}: </label></div></el-col>
            <el-col :span="4"><div class="grid-content"><span>{{contactData.last}}</span></div></el-col>
        </el-row>

        <el-row class="form-group">
            <el-col :span="12"><div class="grid-content"><label class="label-space">{{$t('table.contact.middleName')}}: </label></div></el-col>
            <el-col :span="4"><div class="grid-content"><span>{{contactData.middle}}</span></div></el-col>
        </el-row>

        <el-row class="form-group">
            <el-col :span="12"><div class="grid-content"><label class="label-space">{{$t('table.contact.gender')}}: </label></div></el-col>
            <el-col :span="4"><div class="grid-content"><span>{{contactData.gender}}</span></div></el-col>
        </el-row>

        <el-row class="form-group">
            <el-col :span="12"><div class="grid-content"><label class="label-space">{{$t('table.contact.email')}}: </label></div></el-col>
            <el-col :span="4"><div class="grid-content"><span>{{contactData.email}}</span></div></el-col>
        </el-row>

        <el-row class="form-group">
            <el-col :span="12"><div class="grid-content"><label class="label-space">{{$t('table.contact.tags')}}: </label></div></el-col>
            <el-col :span="4"><div class="grid-content"><span>{{contactData.tags}}</span></div></el-col>
        </el-row>

        <el-row class="form-group">
            <el-col :span="12"><div class="grid-content"><label class="label-space">{{$t('table.contact.noOfCampaigns')}}: </label></div></el-col>
            <el-col :span="4"><div class="grid-content"><span>{{contactData.no}}</span></div></el-col>
        </el-row>

        <el-row class="form-group">
            <el-col :span="12"><div class="grid-content"><label class="label-space">{{$t('table.contact.keywords')}}: </label></div></el-col>
            <el-col :span="4"><div class="grid-content"><span>{{contactData.keywords}}</span></div></el-col>
        </el-row>

        <el-row class="form-group">
            <el-col :span="12"><div class="grid-content"><label class="label-space">{{$t('table.contact.phone')}}: </label></div></el-col>
            <el-col :span="4"><div class="grid-content"><span>{{contactData.phone}}</span></div></el-col>
        </el-row>

        <el-row class="form-group">
            <el-col :span="12"><div class="grid-content"><label class="label-space">{{$t('table.contact.notes')}}: </label></div></el-col>
            <el-col :span="4"><div class="grid-content"><span>{{contactData.notes}}</span></div></el-col>
        </el-row>
        <div
            slot="footer"
            class="dialog-footer"
        >
            <el-button @click="close">
            {{ $t('table.close') }}
            </el-button>
        </div>
    </el-dialog>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
import { defaultContactData } from '@/api/contacts'

@Component({
  name: 'ContactDialog',
  components: {
  }
})
export default class extends Vue {
  @Prop({ required: true }) private visible!: boolean
  private contactData = defaultContactData

  private close() {
    this.$emit('update:visible', false)
  }
}

</script>

<style lang="scss" scoped>
 .label-space {
   margin-left: 40%;
   margin-right: 10%;
 }

 .form-group {
    margin-bottom: 3%
 }
</style>
