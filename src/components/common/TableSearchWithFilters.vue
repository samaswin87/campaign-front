<template>
    <div>
        <el-input
          :placeholder="$t('table.search')"
          style="width: 75%;"
          class="filter-item"
        />

        <el-button
          v-waves
          class="filter-item"
          type="primary"
          icon="el-icon-search"
        >
        </el-button>

        <el-button
          v-waves
          type="primary"
          class="filter-item float-right"
          circle
          @click="handleFilter"
          >
          <svg-icon name="filter-solid" />
        </el-button>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component({
  name: 'TableSearchWithFilters'
})

export default class extends Vue {
  private handleFilter() {
    this.$emit('handleFilter')
  }
}
</script>

<style lang="scss" scoped>
.float-right {
  float: right;
}

</style>
