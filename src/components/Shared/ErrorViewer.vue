<template>
  <div class="error-modal" :class="{'shown' : showError}">
    <div class="error-modal-content p-3">
      <div class="row justify-content-center">
        <div class="col justify-content-center">
          <p class="title-text text-center">
            {{ error }}
          </p>
        </div>
      </div>
      <div class="row justify-content-center">
        <button class="btn btn-success" @click="refresh()">
          Refresh
        </button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import {Component, Prop, Vue, Watch} from "vue-property-decorator";
import scrollManager from '@/helpers/ui/disable-scroll.helper'

@Component
export default class ErrorViewer extends Vue {

  @Prop({type: String, default: 'An error occurred.'}) error: string;
  @Prop({type: Boolean, default: false}) showError: boolean;

  @Watch('showError', {immediate: true})
  toggleError(value: boolean): void {
    scrollManager(value);
  }

  refresh(): void {
    this.$emit('refresh');
  }
}
</script>

<style scoped lang="scss">

// Modal styles
.error-modal {
  position: absolute;
  z-index: 3;
  width: 100%;
  height: 100vh;
  display: none;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  background-color: rgba(0, 0, 0, 0.4); /* Black w/ opacity */
  backdrop-filter: blur(3px);
  margin-left: -15px !important;

  &.shown {
    display: flex;
  }
}

/* Modal Content */
.error-modal-content {
  background-color: #fefefe;
  margin: auto;
  border: 1px solid #888;
  width: 20%;
  border-radius: 10px;
  top: 50%;
  padding: 0;
}
</style>
