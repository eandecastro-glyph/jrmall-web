import Vue from 'vue'
import VueRouter from 'vue-router'
// import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'LoadingPage',
    component: () => import(/* webpackChunkName: "about" */ '../views/LoadingPage.vue'),
    meta: {
      title: "Load",
      // icon: "icon.png"
    }
  },
  {
    path: '/:id',
    name: 'LoadOrderDetails',
    component: () => import('../views/LoadingPageOrderSummary.vue'),
    meta: {
      title: "Order Details",
      // icon: "icon.png"
    }
  },
  {
    path: '*',
    name: 'PageNotFound',
    component: () => import('../views/NotFound.vue'),
    meta: {
      title: "404 Not Found",
    }
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
