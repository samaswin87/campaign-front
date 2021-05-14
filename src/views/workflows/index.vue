<template>
  <div class="workflow-container">
    <component :is="currentRole" />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { UserModule } from '@/store/modules/user'

@Component({
  name: 'Workflow',
  components: {
  }
})
export default class extends Vue {
  private currentRole = 'admin-workflow'

  get roles() {
    return UserModule.roles
  }

  created() {
    if (!this.roles.includes('admin')) {
      this.currentRole = 'editor-workflow'
    }
  }
}
</script>
