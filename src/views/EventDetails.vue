<template>
  <div class="container-fluid">
    <div class="row divider">

    </div>
    <div class="d-flex justify-content-center" v-if="eventsStore.event">
      <div class="card-rounded">
        <RightBackArrow @click="backToMainScreen()" class="position-absolute" style="top: 35px; left: 15px"></RightBackArrow>
        <h1 class="mb-3 ml-5"> {{eventsStore.event.position.name}} </h1>
        <div class="row">
          <div class="col">
            <DateBadge :date="eventsStore.event.startsAt" class="mx-2"></DateBadge>
            <DateBadge :date="eventsStore.event.endsAt" :type="'end'" class="mx-2"></DateBadge>
          </div>
        </div>
        <h3 class="mt-5 mb-3">Employees :</h3>
        <ul class="list-group" v-if="eventsStore.event && eventsStore.event.employees && eventsStore.event.employees.length > 0">
          <ListItem v-for="(employee, index) in eventsStore.event.employees" :key="index"
                    :clickable="false"
                    :title="`${employee.firstName } ${employee.lastName}`" :image="employee.image">

          </ListItem>
        </ul>
        <ul  class="list-group" v-if="eventsStore.event && eventsStore.event.employees && eventsStore.event.employees.length === 0">
          <li class="list-group-item text-center">
            No employees associated with this event
          </li>
        </ul>
      </div>
    </div>
    <div class="row divider">

    </div>
  </div>
</template>
<script lang="ts">
import {Component, Vue} from 'vue-property-decorator';
import {mapState} from "vuex";
import ListItem from "@/components/EventsComponents/ListItem.vue";
import DateBadge from "@/components/EventsComponents/DateBadge.vue";
import RightBackArrow from "@/components/Shared/RightBackArrow.vue";
@Component({
  components: {ListItem, DateBadge, RightBackArrow},
  computed: mapState(['eventsStore'])
})
export default class EventDetails extends Vue {
  // just to map it with ts
  private eventsStore: any;

  created(): void {
    this.$store.dispatch('loadEvent', this.$route.params.id);
  }
  backToMainScreen(): void{
    this.$store.commit('unloadEvent');
  }
}
</script>
