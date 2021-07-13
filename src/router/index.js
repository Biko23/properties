import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
<<<<<<< HEAD
import RegisterProperty from '../views/RegisterProperty.vue'
import RegisterProperty2 from '../views/RegisterProperty2.vue'
=======
import Property from '@/views/Property'
>>>>>>> d12d930a5c7ae7db8971e5fca23236cb27be6020

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
<<<<<<< HEAD
    path: '/register',
    name: 'RegisterProperty',
    component: RegisterProperty
  },
  {
    path: '/register2',
    name: 'RegisterProperty2',
    component: RegisterProperty2
=======
    path: '/property',
    name: 'Property',
    component: Property
>>>>>>> d12d930a5c7ae7db8971e5fca23236cb27be6020
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
