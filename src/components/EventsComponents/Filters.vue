<template>
  <div class="row">
    <div class="col-lg-3 col-md-4 col-sm-6 col-xs-6">
      <div class="form-group">
        <label> Start date</label>
        <DateTime type="datetime" format="dd, MMM yyyy HH:mm:ss" :value="startsAt"
                  :max-datetime="endsAt"
                  @input="dateUpdate($event, 'startsAt')" id="startDate"></DateTime>
      </div>
    </div>
    <div class="col-lg-3 col-md-4 col-sm-6 col-xs-6">
      <div class="form-group">
        <label> End Date</label>
        <DateTime type="datetime" format="dd, MMM yyyy HH:mm:ss" @input="dateUpdate($event, 'endsAt')"
                  :value="endsAt" id="endDate" :min-datetime="startsAt"></DateTime>
      </div>
    </div>

    <div class="col-lg-3 col-md-4 col-sm-6 col-xs-6">
      <div class="form-group">
        <label for="limit">Page size</label>
        <select class="form-control" id="limit" @input="sizeChanged()">
          <option :selected="possibleSize === limit" v-for="possibleSize in sizes" :value="possibleSize" :key="possibleSize">{{ possibleSize }}</option>
        </select>
      </div>
    </div>
    <div class="col-lg-3 col-md-4 col-sm-6 col-xs-6">
      <button class="btn btn-outline-dark reset-button float-right" @click="resetFilter()">
        Reset filters
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import {Component, Prop, Vue} from "vue-property-decorator";
import {Datetime} from 'vue-datetime';
// this component can works for any listing page
// it shows only the filters you want to show!
@Component({
  components: {
    DateTime: Datetime
  }
})
export default class Filters extends Vue {
  @Prop({type: String, required: false}) startsAt: string;
  @Prop({type: String, required: false}) endsAt: string;
  @Prop({type: Number, required: true}) limit: number;
  sizes = [10, 25, 50];

  dateUpdate(event: any, eventType: string): void {
    this.$emit('filter', {type: eventType, value: event});
  }

  resetFilter(): void {
    this.$emit('filter', {type: 'reset', value: null});
  }

  sizeChanged(): void {
    const sizeWrapper = document.getElementById('limit') as any ;
    const size = sizeWrapper.value;
    if (size != null)
      this.$emit('filter', {type: 'limit', value: Number(size)})
  }


}
</script>

<style scoped lang="scss">
.reset-button {
  margin-top: 30px;
  margin-bottom: 10px;
}
</style>
