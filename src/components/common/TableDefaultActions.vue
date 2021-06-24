<template>
    <div>
        <router-link :to="{name: this.createRoute, params: createParams}">
            <el-tooltip class="item" effect="dark" :content="$t('table.add')" placement="bottom">
                <el-button
                class="ml-10-px"
                type="primary"
                size="mini"
                icon="el-icon-circle-plus-outline"
                >
                </el-button>
            </el-tooltip>
        </router-link>
        <el-tooltip class="item" effect="dark" :content="$t('table.export')" placement="bottom">
        <el-button
            class="ml-10-px"
            type="primary"
            size="mini"
            icon="el-icon-upload"
        >
        </el-button>
        </el-tooltip>
        <router-link :to="{name: this.importRoute}">
            <el-tooltip class="item" effect="dark" :content="$t('table.import')" placement="bottom">
            <el-button
                class="ml-10-px"
                type="primary"
                size="mini"
                icon="el-icon-download"
            >
            </el-button>
            </el-tooltip>
        </router-link>
    </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'

@Component({
  name: 'TableDefaultActions'
})

export default class extends Vue {
    @Prop({ required: true }) private createRoute!: string
    @Prop({ required: true }) private importRoute!: string
    @Prop({ required: false }) private createParams!: object
}
</script>
