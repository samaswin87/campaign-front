import { Component, Vue } from 'vue-property-decorator'
import TableDefaultActions from '@/components/common/TableDefaultActions.vue'
import TableSearchWithFilters from '@/components/common/TableSearchWithFilters.vue'
import Pagination from '@/components/Pagination/index.vue'
import UploadExcelComponent from '@/components/UploadExcel/index.vue'

@Component({
  name: 'TableMixin',
  components: {
    Pagination,
    TableDefaultActions,
    TableSearchWithFilters,
    UploadExcelComponent
  }
})
export default class extends Vue {
  public tableKey = new Date().toString()
  public total = 0
  public listLoading = true
  public filterLoading = false
  public listQuery = {
    page: 1,
    limit: 20,
    sort: 'asc',
    searchparam: ''
  }

  public forceRerender() {
    this.tableKey = new Date().toString()
  }

  public sortChange(data: any) {
    const { prop, order } = data
    if (prop === 'id') {
      this.sortByID(order)
    }
  }

  public sortByID(order: string) {
    if (order === 'ascending') {
      this.listQuery.sort = 'asc'
    } else {
      this.listQuery.sort = 'desc'
    }
  }

  public getSortClass(key: string) {
    const sort = this.listQuery.sort
    return sort === `+${key}` ? 'ascending' : 'descending'
  }
}
