import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import RegisterProperty from '../views/RegisterProperty.vue'
import RegisterProperty2 from '../views/RegisterProperty2.vue'
import RegisterProperty3 from '../views/RegisterProperty3.vue'
import Property from '@/views/Property'
import PropertiesForSale from '@/views/PropertiesForSale'
import GetStarted from '@/views/GetStarted'
import ViewProperty from '@/components/ViewProperty'
import Mortgage from '@/views/Mortgage'
import ServiceProviderComponent from '@/components/ServiceProviderComponent'


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
    path: '/register3',
    name: 'RegisterProperty3',
    component: RegisterProperty3
  },
  {
    path: '/property',
    name: 'Property',
    component: Property
  },
  {
    path: '/properties-for-sale',
    name: 'properties-for-sale',
    component: PropertiesForSale
  },
  {
    path: '/signup',
    name: 'SignUp',
    component: () => import('@/views/SignUp')
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/Login')
  },
  {
    path: '/getstarted',
    name: 'GetStarted',
    component: GetStarted
  },
  {
    path: '/profile',
    name: 'UserProfile',
    component: () => import('@/views/UserProfile')
  },
  {
    path: '/view',
    name: 'ViewProperty',
    component: ViewProperty
  },
  {
    path: '/mortgage',
    name: 'Mortgage',
    component: Mortgage
  },
  {
    path: '/provider',
    name: 'ServiceProviderComponent',
    component: ServiceProviderComponent
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
