<template>
  <div class="right-back-arrow" @click="$emit('click', $event)">

  </div>
</template>

<script lang="ts">
import {Component, Vue} from "vue-property-decorator";

@Component
export default class RightBackArrow extends Vue {

}
</script>

<style scoped lang="scss">
  .right-back-arrow{
    cursor: pointer;
    position: relative;
    display: inline-block;
    vertical-align: middle;
    color: #666;
    box-sizing: border-box;
    transform: rotate(-136deg);
    &:after, &:before {
      content: "";
      box-sizing: border-box;
    }
    width: 16px;
    height: 16px;
    border-width: 3px 3px 0 0;
    border-style: solid;
    margin: 10px;
    &:before{
      right: 0;
      top: -2px;
      position: absolute;
      height: 3px;
      box-shadow: inset 0 0 0 32px;
      width: 23px;
      transform-origin: right top;
      transform: rotate(-45deg);
    }
  }
</style>
