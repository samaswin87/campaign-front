<template>
  <div class="workflow-container">
    <component :is="currentRole" />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { UserModule } from '@/store/modules/user'
import AdminWorkflow from './admin/index.vue'
import EditorWorkflow from './editor/index.vue'

@Component({
  name: 'Workflow',
  components: {
    AdminWorkflow,
    EditorWorkflow
  }
})
export default class extends Vue {
  private currentRole = 'admin-workflow'

  get role() {
    return UserModule.role
  }

  created() {
    if (this.role !== 'admin') {
      this.currentRole = 'editor-workflow'
    }
  }
}
</script>
