import { Component, Vue } from 'vue-property-decorator'
import TableDefaultActions from '@/components/common/TableDefaultActions.vue'
import TableSearchWithFilters from '@/components/common/TableSearchWithFilters.vue'
import Pagination from '@/components/Pagination/index.vue'
import UploadExcelComponent from '@/components/UploadExcel/index.vue'
import { isEmpty, map, uniq } from 'lodash'
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
  public filterIcon = 'filter-solid'
  public multipleSelection: any[] = []
  public tableKey = new Date().toString()
  public total = 0
  public listLoading = true
  public filterLoading = false
  public bulkOpt = true
  public bulkTags = true
  public bulkMove = true
  public activeRecords:any[] = []
  public inActiveRecords:any[] = []
  public listQuery = {
    page: 1,
    limit: 20,
    searchparam: '',
    filters: ''
  }

  public handleSelectionChange(value) {
    this.multipleSelection = value
    if (!isEmpty(this.multipleSelection)) {
      this.activeRecords = this.multipleSelection.filter((value) => { return value.status === 'active' })
      this.inActiveRecords = this.multipleSelection.filter((value) => { return value.status === 'inactive' })

      this.bulkTags = !(uniq(map(this.multipleSelection, 'company_id')).length === 1)
      this.bulkMove = this.bulkTags
      if (!isEmpty(this.activeRecords) && !isEmpty(this.inActiveRecords)) {
        this.bulkOpt = true
      } else if (!isEmpty(this.activeRecords) || !isEmpty(this.inActiveRecords)) {
        this.bulkOpt = false
      }
    } else {
      this.bulkOpt = true
      this.bulkTags = true
      this.bulkMove = true
    }
  }

  public forceRerender() {
    this.tableKey = new Date().toString()
  }
}
