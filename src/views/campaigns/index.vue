<template>
  <div class="campaign-container">
    <component :is="currentRole" />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { UserModule } from '@/store/modules/user'
import AdminCampaign from './admin/index.vue'
import EditorCampaign from './editor/index.vue'

@Component({
  name: 'Campaign',
  components: {
    AdminCampaign,
    EditorCampaign
  }
})
export default class extends Vue {
  private currentRole = 'admin-campaign'

  get role() {
    return UserModule.role
  }

  created() {
    if (this.role !== 'admin') {
      this.currentRole = 'editor-campaign'
    }
  }
}
</script>
