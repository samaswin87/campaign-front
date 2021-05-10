<template>
    <div>
        <router-link :to="{name: this.createRoute}">
            <el-tooltip class="item" effect="dark" :content="$t('table.add')" placement="bottom">
                <el-button
                style="margin-left: 10px;"
                type="primary"
                icon="el-icon-circle-plus-outline"
                >
                </el-button>
            </el-tooltip>
        </router-link>
        <el-tooltip class="item" effect="dark" :content="$t('table.export')" placement="bottom">
        <el-button
            style="margin-left: 10px;"
            type="primary"
            icon="el-icon-download"
        >
        </el-button>
        </el-tooltip>
        <el-tooltip class="item" effect="dark" :content="$t('table.import')" placement="bottom">
        <el-button
            style="margin-left: 10px;"
            type="primary"
            icon="el-icon-upload"
        >
        </el-button>
        </el-tooltip>
    </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'

@Component({
  name: 'TableDefaultActions'
})

export default class extends Vue {
    @Prop({ required: true }) private createRoute!: string
}
</script>
