<template>
    <contact-form :title="title"></contact-form>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import ContactForm from './ContactForm.vue'

@Component({
  name: 'ContactEdit',
  components: { ContactForm }
})
export default class extends Vue {
    private title = 'Edit Contact'
}
</script>
