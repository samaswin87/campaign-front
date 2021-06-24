<template>
    <div class="header-search" :class="{'show': show}">
        <el-input
          ref="headerSearchText"
          :placeholder="$t('table.search')"
          class="header-search-text"
          type="text"
          @keyup.enter.native="handleSearchFilter"
          @keyup.delete.native="handleSearchFilter"
          v-model="searchKeyword"
          @change="change"
        />

        <el-button
          v-waves
          type="primary"
          size="mini"
          class="filter-item float-right"
          circle
          @click="handleFilter"
          >
          <svg-icon :name="this.filterIcon" />
        </el-button>

        <el-button
          v-waves
          class="mr-3-px float-right"
          size="mini"
          circle
          type="primary"
          icon="el-icon-search"
          @click.stop="click"
        >
        </el-button>
    </div>
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch } from 'vue-property-decorator'

@Component({
  name: 'TableSearchWithFilters'
})
export default class extends Vue {
  @Prop({ required: true }) private filterIcon!: string
  private searchKeyword = ''
  private show = false

  private handleSearchFilter() {
    this.$emit('handleSearchFilter', this.searchKeyword)
  }

  @Watch('show')
  private onShowChange(value: boolean) {
    if (value) {
      document.body.addEventListener('click', this.close)
    } else {
      document.body.removeEventListener('click', this.close)
    }
  }

  private close() {
    this.$refs.headerSearchText && (this.$refs.headerSearchText as HTMLElement).blur()
    this.show = false
  }

  private change() {
    this.$nextTick(() => {
      this.show = false
    })
  }

  private click() {
    this.show = !this.show
    if (this.show) {
      this.$refs.headerSearchText && (this.$refs.headerSearchText as HTMLElement).focus()
    }
  }

  private handleFilter() {
    this.$emit('handleFilter')
  }
}
</script>

<style lang="scss" scoped>
.header-search {

  .header-search-text {
    width: 0;
    overflow: hidden;
    background: transparent;
    margin-top: -5px;
    margin-left: 35px;
    border-radius: 0;
    display: inline-block;
    vertical-align: middle;
  }

  &.show {
    .header-search-text {
      width: 75%;
      margin-right: 2px;
    }
  }
}
</style>
