<template>
    <contact-form
    :title="title"
    :campaign="campaign"
    :redirect="redirect"
    ></contact-form>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
import ContactForm from './ContactForm.vue'

@Component({
  name: 'ContactCreate',
  components: { ContactForm }
})
export default class extends Vue {
  @Prop({ default: false }) private campaign!: boolean
  @Prop({ default: '/contacts' }) private redirect!: string
  private title = 'New Contact'
}
</script>
