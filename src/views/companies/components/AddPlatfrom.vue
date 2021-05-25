<template>
    <el-dialog
      title="Add Platform Number"
      :visible.sync="visible"
      :before-close="handleClose"
    >
      <el-form
        ref="platformForm"
        :model="platformRecord"
        label-position="left"
        label-width="30%"
        style="width: 80%; margin-left:10%;"
      >
        <el-form-item label="Name">
          <el-input v-model="platformRecord.name"></el-input>
        </el-form-item>
        <el-form-item label="Phone">
          <el-input v-model="platformRecord.phone"></el-input>
        </el-form-item>
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
          @click="addPlatformNumber"
        >
          {{ $t('common.add') }}
        </el-button>
      </div>
    </el-dialog>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import { Form } from 'element-ui'
import { defaultPlatformData } from '@/api/companies'

@Component({
  name: 'AddPlatform Number',
  components: { }
})
export default class extends Vue {
    @Prop({ required: true }) private visible!: boolean

    private platformRecord = defaultPlatformData

    private addPlatformNumber() {
      (this.$refs.platformForm as Form).validate(async(valid) => {
        if (valid) {
          this.$emit('platformRecord', this.platformRecord)
          this.platformRecord = defaultPlatformData
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
