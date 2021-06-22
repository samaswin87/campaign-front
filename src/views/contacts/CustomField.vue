<template>
  <el-row>
    <el-col :span="10" class="mr-10-px">
      <el-input
      placeholder="Please add label name"
      v-model="customField"
      clearable>
      </el-input>
    </el-col>
    <el-col :span="10">
      <el-input
      placeholder="Please add value"
      v-model="customValue"
      clearable>
      </el-input>
    </el-col>
    <el-col :span="2" class="ml-10-px">
      <i class="el-icon-delete"></i>
    </el-col>
  </el-row>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'

@Component({
  name: 'CustomField',
  components: { }
})
export default class extends Vue {
  @Prop({ required: true }) private index!: number

  private customField = ''
  private customValue = ''
}
</script>
