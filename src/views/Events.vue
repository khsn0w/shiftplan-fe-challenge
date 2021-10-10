<template>
  <div class="container-fluid">
    <div class="row divider">

    </div>
    <div class="d-flex justify-content-center">
      <div class="card-rounded">
        <h1 class="mb-5">Events: </h1>
        <section>
          <Filters :starts-at="eventsStore.startsAt" :ends-at="eventsStore.endsAt"
                   :limit="eventsStore.limit"
                   @filter="updateStore($event)"
          ></Filters>
        </section>
        <section type="event-list">
          <ul class="list-group" v-if="eventsStore.events && eventsStore.events.length > 0">
            <ListItem v-for="(event, index) in eventsStore.events" :key="index"
                      :title="event.position.name"
                      :start="event.startsAt"
                      :end="event.endsAt"
                      @click="viewDetails(event.id)">

            </ListItem>
          </ul>
          <li class="list-group-item text-center" v-if="eventsStore.events && eventsStore.events.length === 0">
            <span class="my-5 text-center">
              Sorry there is no event but you still can reset your filters!
            </span>
          </li>
        </section>
        <div class="row justify-content-center" v-if="eventsStore.events && eventsStore.events.length > 0">
          <p class="text-center mt-5 mb-3">
            <button class="btn btn-primary  text-center" @click="updateOffset()" v-if="eventsStore.hasMoreData">
              Load more ...
            </button>
            <span class="" v-else>
              No more data
            </span>
          </p>
        </div>
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
import Filters from "@/components/EventsComponents/Filters.vue";

@Component({
  components: {Filters, ListItem},
  computed: mapState(['eventsStore'])
})
export default class Events extends Vue {
  private eventsStore: any;

  created(): void {
    const payload = JSON.parse(JSON.stringify(this.eventsStore))
    delete payload.hasMoreData;
    delete payload.events;
    if (payload.limit == undefined){
      payload.limit = 10;
    }
    if(payload.offset == undefined){
      payload.offset = 0;
    }
    this.$store.dispatch('loadEvents',payload );
  }

  // custom function
  updateOffset(): void {
    this.$store.dispatch('loadEvents', {offset: this.eventsStore.offset + 1, limit: this.eventsStore.limit})
  }

  resetFilters(): void {
    this.$store.dispatch('loadEvents', {offset: 0, limit: 10, startsAt: undefined, endsAt: undefined});
  }

  // display event details
  viewDetails(id: number): void {
    this.$store.commit('showEvent', id)
  }

  updateStore(event: any): void {
    if (event.type === 'reset') {
      this.resetFilters();
      return;
    }
    const payload = {
      limit: this.eventsStore.limit,
      offset: this.eventsStore.offset,
      startsAt: this.eventsStore.startsAt,
      endsAt: this.eventsStore.endsAt
    }
    if (event.type === 'startsAt') {
      payload.startsAt = event.value;
    }
    if (event.type === 'endsAt') {
      payload.endsAt = event.value;
    }
    if (event.type === 'limit') {
      payload.limit = event.value;
    }
    this.$store.dispatch('loadEvents', payload);
  }
}
</script>
