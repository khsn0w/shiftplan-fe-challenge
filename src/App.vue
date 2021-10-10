<template>
  <div id="app" class="container-fluid position-relative">
    <Spinner :loading="uiStore.loading" ></Spinner>
    <ErrorViewer @refresh="reloadApp()" :show-error="uiStore.error.show" :error="uiStore.error.message"></ErrorViewer>
    <router-view/>

  </div>
</template>
<script lang="ts">

import {Component, Vue} from "vue-property-decorator";
import Spinner from "@/components/Shared/Spinner.vue";
import ErrorViewer from "@/components/Shared/ErrorViewer.vue";
import {State} from "vuex-class";
@Component({
  components: {
    Spinner,
    ErrorViewer
  }
})
export default class App extends Vue{
  // handler to reload the app
  reloadApp():void{
    location.href = process.env.BASE_URL
  }
  // map state
  @State('uiStore') uiStore: any;


}
</script>
<style lang="scss">
html, body {
  background-color: $app-bg !important;
  font-family: $default-font;
  color: $text-primary;
  overflow-x: hidden;
  height: 100vh;
}
</style>
