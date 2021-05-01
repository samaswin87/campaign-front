<template>
    <div class="app-container">
        <el-dialog
        :title="textMap[dialogStatus]"
        :visible.sync="dialogFormVisible"
        >
        <el-form
            ref="dataForm"
            :rules="rules"
            :model="tempContactData"
            label-position="left"
            label-width="100px"
            style="width: 400px; margin-left:50px;"
        >
            <el-form-item
            :label="$t('table.type')"
            prop="type"
            >
            <el-select
                v-model="tempContactData.type"
                class="filter-item"
                placeholder="Please select"
            >
                <el-option
                v-for="item in []"
                :key="item.key"
                :label="item.displayName"
                :value="item.key"
                />
            </el-select>
            </el-form-item>
        </el-form>
        <div
            slot="footer"
            class="dialog-footer"
        >
            <el-button @click="dialogFormVisible = false">
            {{ $t('table.cancel') }}
            </el-button>
            <el-button
            type="primary"
            @click="dialogStatus==='create'?createData():updateData()"
            >
            {{ $t('table.confirm') }}
            </el-button>
        </div>
        </el-dialog>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { defaultContactData } from '@/api/contacts'

@Component({
  name: 'ContactDialog',
  components: {
  }
})
export default class extends Vue {
private tempContactData = defaultContactData
}

</script>
