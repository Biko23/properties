import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import RegisterProperty from '../views/RegisterProperty.vue'
import RegisterProperty2 from '../views/RegisterProperty2.vue'
import Property from '@/views/Property'


Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/register',
    name: 'RegisterProperty',
    component: RegisterProperty
  },
  {
    path: '/register2',
    name: 'RegisterProperty2',
    component: RegisterProperty2
  },
  {
    path: '/property',
    name: 'Property',
    component: Property
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path:'/learn',
    name:'Learn',
    component:() => import(/* webpackChunkName: "about" */ '../views/Learn.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
