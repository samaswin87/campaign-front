<template>
  <campaign-form :title="title"></campaign-form>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import CampaignForm from './CampaignForm.vue'

@Component({
  name: 'CampaignCreate',
  components: { CampaignForm }
})
export default class extends Vue {
  private title = 'New Campaign'
}
</script>
