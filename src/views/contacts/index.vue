<template>
  <div class="contact-container">
    <component :is="currentRole" />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { UserModule } from '@/store/modules/user'
import AdminContact from './admin/index.vue'
import EditorContact from './editor/index.vue'

@Component({
  name: 'Contact',
  components: {
    AdminContact,
    EditorContact
  }
})
export default class extends Vue {
  private currentRole = 'admin-contact'

  get role() {
    return UserModule.role
  }

  created() {
    if (this.role !== 'admin') {
      this.currentRole = 'editor-contact'
    }
  }
}
</script>
