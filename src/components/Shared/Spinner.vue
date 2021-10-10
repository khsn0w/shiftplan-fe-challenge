<template>
  <div class="overlay" v-if="loading">
    <clip-loader :loading="loading" :color="color" :size="size"></clip-loader>
  </div>
</template>

<script lang="ts">

import {Component, Prop, Vue, Watch} from "vue-property-decorator";
import ClipLoader from 'vue-spinner/src/ClipLoader.vue'
import scrollManager from '@/helpers/ui/disable-scroll.helper'
@Component({
  components: {
    ClipLoader
  }
})
export default class Spinner extends Vue {
  @Prop({type: Boolean, default: false}) loading: boolean;
  @Prop({type: String, default: '#0d28f2'}) color: string;
  @Prop({type: String, default: '35px'}) size: string;

  @Watch('loading', {immediate: true})
  loadingToggle(value: boolean): void{
    scrollManager(value);
  }
}
</script>

<style scoped lang="scss">
.overlay {
  position: absolute;
  z-index: 2;
  opacity: 1;
  width: 100%;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  background-color: rgba(0, 0, 0, 0.4); /* Black w/ opacity */
  backdrop-filter: blur(3px);
  margin-left: -15px !important;
  transition: opacity 1s;
}

.v-spinner {
  margin-left: calc(100vw - 100%) !important;
}
</style>
