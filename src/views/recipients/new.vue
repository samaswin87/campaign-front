<template>
    <contact-new :campaign="true" :redirect="redirect"/>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import ContactNew from '@/views/contacts/new.vue'

@Component({
  name: 'RecipientNew',
  components: { ContactNew }
})
export default class extends Vue {
  private redirect = ''

  created() {
    const id = this.$route.params && this.$route.params.campaignId
    this.redirect = '/campaigns/' + id + '/show'
  }
}
</script>
