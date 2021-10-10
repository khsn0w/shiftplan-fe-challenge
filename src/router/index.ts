import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import Events from "@/views/Events.vue";

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
  {
    path: '/events',
    name: 'Events',
    component: Events
  },
  {
    // force id to be integer
    path: '/events/:id(\\d+)',
    name: 'EventDetails',
    // this component will be lazy loaded
    component: () => import(/* webpackChunkName: "about" */ '../views/EventDetails.vue')
  },
  {
    path: '**',
    redirect: '/events'
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
