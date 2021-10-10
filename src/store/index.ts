import Vue from 'vue'
import Vuex from 'vuex'
import EventsStoreModule from "@/store/events-module/events-store.module";
import UiStoreModule from "@/store/ui-module/UiStoreModule";

Vue.use(Vuex)

export default new Vuex.Store({
    state: {},
    mutations: {},
    actions: {},
    modules: {
       eventsStore: EventsStoreModule,
       uiStore: UiStoreModule
    }
})
