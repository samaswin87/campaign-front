<template>
    <ContactNew />
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import ContactNew from '@/views/contacts/new.vue'

@Component({
  name: 'RecipientNew',
  components: { ContactNew }
})
export default class extends Vue {
}
</script>
