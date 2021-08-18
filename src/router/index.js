import Vue from 'vue'
import VueRouter from 'vue-router'


Vue.use(VueRouter)


const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('@/views/Home.vue'),
    meta: {
      basicAuth: true
    }
  },
  // Start sell property and list rental section
  {
    path: '/property-requirement',
    name: 'RegisterPropertyRequirement',
    component: () => import('@/views/RegisterPropertyRequirements.vue'),
  },
  {
    path: '/register',
    name: 'RegisterProperty',
    component: () => import('@/views/RegisterProperty.vue'),
    meta: { 
      // requiresAuth: true 
      requireSellerRole: true
    }
  },
  {
    path: '/register2',
    name: 'RegisterProperty2',
    component: () => import('@/views/RegisterProperty2.vue'),
    meta: {
      // requiresAuth: true,
      requireSellerRole: true
    },
  },
  {
    path: '/register3',
    name: 'RegisterProperty3',
    component: () => import('../views/RegisterProperty3.vue'),
    meta: {
      // requiresAuth: true,
      requireSellerRole: true
    },
  },
  // end sale property journey
  // rental section
  {
    path: '/rental-requirement',
    name: 'RegisterRentalRequirement',
    component: () => import('@/views/RegisterRentalPropertyRequirements.vue'),
  },
  {
    path: '/register-rental',
    name: 'RegisterRental',
    component: () => import('@/views/RegisterRentalProperty.vue'),
    meta: {
      // requiresAuth: true
      requireSellerRole: true
    },
  },
  // end rental journey
  {
    path: '/property',
    name: 'Property',
    component: () => import('@/views/Property')
  },
  {
    path: '/properties-for-sale',
    name: 'properties-for-sale',
    component: () => import('@/views/PropertiesForSale')
  },
  {
    path: '/property-details',
    name: 'seller-properties-details',
    component: () => import('@/views/SellerPropertiesDetails'),
    meta: {
      requireSellerRole: true
    }
  },
  {
    path: '/signup',
    name: 'SignUp',
    component: () => import('@/views/SignUp'),
    meta: {
      hideForAuth: true
    }
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/Login'),
    meta: {
      hideForAuth: true
    }
  },
  {
    path: '/getstarted',
    name: 'GetStarted',
    component: () => import('@/views/GetStarted')
  },
  {
    path: '/profile',
    name: 'UserProfile',
    component: () => import('@/views/UserProfile'),
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/vendorprofile',
    name: 'VendorProfile',
    component: () => import('@/views/ServiceProviderRegistration'),
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/view',
    path: '/view/:property_id',
    props: true,
    name: 'ViewProperty',
    component: () => import('@/components/ViewProperty')
  },
  {
    path: '/mortgage',
    name: 'Mortgage',
    component: () => import('@/views/Mortgage')
  },
  {
    path: '/mortgage-rates',
    name: 'MortgageRates',
    component: () => import('@/views/MortgageRates')
  },
  {
    path: '/provider/:vendor_category_id',
    props: true,
    name: 'ServiceProviderComponent',
    component: () => import('@/components/ServiceProviderComponent')
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
