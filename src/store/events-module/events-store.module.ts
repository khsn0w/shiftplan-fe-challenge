import {Module} from "vuex";
import EventStoreModel from "@/models/store/EventStoreModel";
import {EventsPayload} from "@/models/events/EventsPayload";
import EventService from "@/services/events/EventService";
import router from "@/router";
import errorHandler from '@/helpers/errors/error.handler';
function compare(payload: EventsPayload, state: EventStoreModel) {


    return payload && payload.limit === state.limit && payload.offset === state.offset &&
        (payload.startsAt === state.startsAt || payload.startsAt === '') && (payload.endsAt === state.endsAt || payload.endsAt === '');
}

function shouldNotReset(payload: EventsPayload, state: EventStoreModel) {
    return payload && payload.limit === state.limit &&
        (payload.startsAt === state.startsAt || payload.startsAt === '') && (payload.endsAt === state.endsAt || payload.endsAt === '');
}

function preProcessPayload(payload: EventsPayload) {
    if (payload.startsAt == '')
        delete payload.startsAt;
    if (payload.endsAt == '')
        delete payload.endsAt;
}

const EventsStoreModule: Module<EventStoreModel, any> = {
    // define our events module store
    state: {
        offset: undefined,
        limit: 10,
        startsAt: undefined,
        endsAt: undefined,
        events: undefined,
        event: undefined,
        hasMoreData: true
    },
    // define all getters
    getters: {
        offset(state: EventStoreModel) {
            return state.offset;
        },
        limit(state: EventStoreModel) {
            return state.limit;
        },
        startsAt(state: EventStoreModel) {
            return state.startsAt;
        },
        endsAt(state: EventStoreModel) {
            return state.endsAt;
        },
        events(state: EventStoreModel) {
            return state.events;
        }
    },
    // define mutations
    mutations: {
        updatePayload(state, payload) {
            state.offset = payload.offset;
            state.limit = payload.limit;
            state.startsAt = payload.startsAt;
            state.endsAt = payload.endsAt;
        },
        updateEvents(state, payload) {
            if(state.events != undefined){
                state.events.push(...payload);
            }
            else{
                state.events = payload;
            }
        },
        resetEvents(state, payload) {
            state.events = payload;
        },
        updateEvent(state, payload) {
            state.event = payload;
        },
        showEvent(state, payload: number) {
            router.push(`/events/${payload}`)
        },
        unloadEvent(state) {
            router.push('/events');
        },
        updateLoadMore(state, payload: boolean){
            state.hasMoreData = payload;
        }
    },
    // actions
    actions: {
        async loadEvents({commit, state}, payload: EventsPayload) {
            // here we load new events based on the new query
            commit('setLoadingStatus', true);
            try {
                preProcessPayload(payload);
                console.log(payload);
                if (compare(payload, state))
                {
                    commit('setLoadingStatus', false);
                    return;
                }
                const response = await EventService.getAllEvents(payload);
                const toCompare = {...state, ...payload}
                const resetEvents = (response.data.items && response.data.items.length == 0) || !shouldNotReset(toCompare, state);
                commit('updatePayload', {...state, ...payload});
                console.log('WILL RESET', resetEvents)
                if (resetEvents) {
                    commit('resetEvents', response.data.items);
                } else {
                    commit('updateEvents', response.data.items);
                }

                const hasMore = state.offset != undefined && state.limit != undefined ?
                    response.data.pagination.count > (state.offset + 1) * state.limit : false;
                commit('updateLoadMore', hasMore);
                commit('setLoadingStatus', false);
            } catch (error) {
                const message = errorHandler(error.response);
                commit('showError', {show: true, message: message})
                commit('setLoadingStatus', false);
            }
        },
        async loadEvent({commit}, payload: number) {
            // here we load new events based on the new query
            commit('setLoadingStatus', true);
            try {
                const response = await EventService.getEvent(payload);
                commit('updateEvent', response.data);
                commit('setLoadingStatus', false);
            } catch (error) {
                const message = errorHandler(error.response);
                commit('showError', {show: true, message: message})
                commit('setLoadingStatus', false);
            }
        },
        async removeEvent({commit}) {
            commit('updateEvent', undefined);
        }
    }
}

export default EventsStoreModule;
