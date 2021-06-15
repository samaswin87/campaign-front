<template>
    <campaign-form :title="title"></campaign-form>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import CampaignForm from './CampaignForm.vue'

@Component({
  name: 'CampaignEdit',
  components: { CampaignForm }
})
export default class extends Vue {
    private title = 'Edit Campaign'
}
</script>
