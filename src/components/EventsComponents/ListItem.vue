<template>
  <li class="list-group-item" :class="{'clickable': clickable}" @click="$emit('click', $event)">
    <img v-if="image" :src="image" class="avatar" :alt="title"/>
    <strong class="mx-2">
      {{ title }}
    </strong>
    <DateBadge :date="start" class="mx-2" v-if="start"></DateBadge>
    <DateBadge :date="end" :type="'end'" class="mx-2" v-if="end"></DateBadge>
  </li>
</template>

<script lang="ts">
import {Component, Prop, Vue} from "vue-property-decorator";
import DateBadge from "@/components/EventsComponents/DateBadge.vue";

@Component({
  components: {
    DateBadge
  }
})
export default class ListItem extends Vue {
  @Prop({type: String, required: true}) title: string;
  @Prop({type: String, required: false}) start: string;
  @Prop({type: String, required: false}) end: string;
  @Prop({type: String, required: false}) image: string;
  @Prop({type: Boolean, default: true}) clickable: string;
}
</script>

<style scoped>

.clickable {
  cursor: pointer;
}

.clickable:hover {
  background-color: #bcbec1b5;
  border-color: #bcbec1b5;
}

.avatar {
  width: 65px;
  border-radius: 50%;
}
</style>
