<template>
  <span class="badge" :class="{'badge-success': type === 'start', 'badge-danger' : type === 'end'}">
    {{date | date(format)}}
  </span>
</template>

<script lang="ts">
import {Component, Prop, Vue} from "vue-property-decorator";
import '@/helpers/filters/date.filter'
@Component
export default class DateBadge extends Vue {
  @Prop({type: String, required: true}) date: string;
  @Prop({type: String, default: 'start'}) type: string;
  @Prop({type: String, default: 'DD, MMM YYYY HH:mm'}) format: string;
}
</script>

<style scoped>

</style>
