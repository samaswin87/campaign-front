<template>
    <el-card class="box-card w-ratio-70">
        <div slot="header" class="clearfix">
            <span>Details</span>
        </div>
        <div class="user-details">
            <el-row class="mb-10-px">
                <el-col :span="10" class="text-right fw-b">
                    <span>{{$t('table.contact.firstName')}}:</span>
                </el-col>
                <el-col :span="12" class="text-left ml-20-px">
                    <span>{{user.firstName}}</span>
                </el-col>
            </el-row>

            <el-row class="mb-10-px">
                <el-col :span="10" class="text-right fw-b">
                    <span>{{$t('table.contact.lastName')}}:</span>
                </el-col>
                <el-col :span="12" class="text-left ml-20-px">
                    <span>{{user.lastName}}</span>
                </el-col>
            </el-row>

            <el-row class="mb-10-px">
                <el-col :span="10" class="text-right fw-b">
                    <span>{{$t('table.phone')}}:</span>
                </el-col>
                <el-col :span="12" class="text-left ml-20-px">
                    <span>{{user.phone}}</span>
                </el-col>
            </el-row>

            <el-row class="mb-10-px">
                <el-col :span="10" class="text-right fw-b">
                    <span>{{$t('table.email')}}:</span>
                </el-col>
                <el-col :span="12" class="text-left ml-20-px">
                    <span>{{user.email}}</span>
                </el-col>
            </el-row>

            <el-row class="mb-10-px">
                <el-col :span="10" class="text-right fw-b">
                    <span>{{$t('table.status')}}:</span>
                </el-col>
                <el-col :span="12" class="text-left ml-20-px">
                    <span>
                        <el-tag
                        :type="user.status | statusFilter"
                        effect="dark">
                        {{user.status}}
                        </el-tag>
                    </span>
                </el-col>
            </el-row>

            <el-divider class="mb-30-px divider-text-color"> Curent Plan </el-divider>
            <el-row class="mb-10-px">
                <el-col :span="10" class="text-right fw-b mt-5-px">
                    <span>{{$t('table.companies.plan')}}:</span>
                </el-col>
                <el-col :span="12" class="text-left ml-20-px">
                    <span>
                        <el-tag
                        :type="planFilter(company.plan)"
                        effect="dark">
                            {{company.plan}}
                        </el-tag>
                    </span>
                </el-col>
            </el-row>
        </div>
    </el-card>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
import { IUserData, ICompanyData } from '@/api/types'

@Component({
  name: 'UserDetails',
  components: {
  }
})
export default class extends Vue {
    @Prop({ required: true }) private user!: IUserData
    @Prop({ required: true }) private company!: ICompanyData

    // Filter for status
    private planFilter = (status: string) => {
      const statusMap: { [key: string]: string } = {
        Tentative: 'info',
        Lite: 'success',
        Plus: '',
        Premium: 'warning',
        Ultimate: 'danger'
      }
      return statusMap[status]
    }
}
</script>
