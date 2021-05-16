<template>
  <div class="app-container">
    <upload-excel-component
      :on-success="handleSuccess"
      :before-upload="beforeUpload"
      class="margin-bottom-20"
    />
    <el-row>
        <el-col :span="24 / tableHeader.length"
          v-for="item of tableHeader"
          :key="item"
          class="margin-bottom-20">
          <multiselect
            v-model="columnsMapping"
            placeholder="Search or add a column"
            :options="contactColumns"
            :clear-on-select="false"
            :close-on-select="false"
            :taggable="true"
            @tag="addTag"
            >
          </multiselect>
        </el-col>
        <el-col :span="24">
          <el-table
            :data="tableData"
            border
            highlight-current-row
          >
            <el-table-column
              v-for="item of tableHeader"
              :key="item"
              :prop="item"
              :label="item"
            />
          </el-table>
        </el-col>
    </el-row>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import UploadExcelComponent from '@/components/UploadExcel/index.vue'
import Multiselect from 'vue-multiselect'

@Component({
  name: 'UploadExcel',
  components: {
    UploadExcelComponent,
    Multiselect
  }
})
export default class extends Vue {
  private tableData: any = []
  private tableHeader: string[] = []
  private columnsMapping: string[] = []
  private contactColumns: string[] = ['First Name', 'Last Name', 'Phone Number', 'Email', 'Middle Name', 'Gender']

  private beforeUpload(file: File) {
    const isLt1M = file.size / 1024 / 1024 < 1
    if (isLt1M) {
      return true
    }
    this.$message({
      message: 'Please do not upload files larger than 1m in size.',
      type: 'warning'
    })
    return false
  }

  private handleSuccess({ results, header }: { results: any, header: string[]}) {
    this.tableData = results
    this.tableHeader = header
  }

  addTag(newColumn: string) {
    this.contactColumns.push(newColumn)
  }
}
</script>

<style lang="scss" scoped>
::v-deep .multiselect__content-wrapper {
  background-color: rgb(223, 228, 237);
}
</style>
