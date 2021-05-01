<template>
  <div class="contact-editor-container">

    <el-row :gutter="8">
      <el-col
        :xs="{span: 24}"
        :sm="{span: 24}"
        :md="{span: 24}"
        :lg="{span: 12}"
        :xl="{span: 12}"
        style="padding-right:8px;margin-bottom:30px;"
      >
        <div style="margin:0 0 5px 20px">Campaigns Editor
        </div>

      </el-col>
      <el-col
        :xs="{span: 24}"
        :sm="{span: 12}"
        :md="{span: 12}"
        :lg="{span: 12}"
        :xl="{span: 12}"
        style="margin-bottom:30px;"
      >
        <div style="margin:0 0 5px 20px">Workflows
        </div>

      </el-col>
    </el-row>
  </div>
</template>

<script lang="ts">
import 'echarts/theme/macarons.js' // Theme used in BarChart, LineChart, PieChart and RadarChart
import { Component, Vue } from 'vue-property-decorator'

@Component({
  name: 'ContactEditor',
  components: {
  }
})
export default class extends Vue {

}
</script>

<style lang="scss" scoped>
.contact-editor-container {
  padding: 32px;
  background-color: rgb(240, 242, 245);
  position: relative;

  .github-corner {
    position: absolute;
    top: 0px;
    border: 0;
    right: 0;
  }

  .chart-wrapper {
    background: #fff;
    padding: 16px 16px 0;
    margin-bottom: 32px;
  }
}

@media (max-width:1024px) {
  .chart-wrapper {
    padding: 8px;
  }
}
</style>
