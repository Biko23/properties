import Vue from 'vue'
import VueRouter from 'vue-router'

/**
 * @author Isaac Ssemugenyi
 * @copyright flyhub Uganda Ltd
*/

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
  {
    path: '/search-result',
    name: 'SearchResult',
    component: () => import('@/views/SearchedResults.vue')
  },
  // Start sell property and list rental section
  {
    path: '/property-requirement',
    name: 'RegisterPropertyRequirement',
    component: () => import('@/views/RegisterPropertyRequirements.vue'),
  },
  {
    path: '/user-favorite-properties',
    name: 'FavoriteProperties',
    component: () => import('@/views/FavoriteProperties.vue'),
    meta: {
      requiresAuth: true
    }
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
    path: '/editprofile',
    name: 'EditProfile',
    component: () => import('@/views/EditProfile.vue'),
    meta: { 
      requiresAuth: true 
      // requireSellerRole: true
    }
  },
  {
    path: '/user-settings',
    name: 'UserSettings',
    component: () => import('@/views/ViewUserProfile.vue'),
    meta: { 
       requiresAuth: true
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
  {
    path: '/properties-for-sale',
    name: 'properties-for-sale',
    component: () => import('@/views/PropertiesForSale')
  },
  {
    path: '/properties-for-rent',
    name: 'properties-for-rent',
    component: () => import('@/views/PropertiesForRent')
  },
  {
    path: '/property-details',
    name: 'seller-properties-details',
    component: () => import('@/views/SellerPropertiesDetails'),
    meta: {
      requireSellerRole: true,
      hideFooterAndAbout: true
    }
  },
  {
    path: '/edit-property/:property_id',
    name: 'edit-property',
    props: true,
    component: () => import('@/views/EditProperty'),
    meta: {
      requireSellerRole: true,
      hideFooterAndAbout: true
    }
  },
  {
    path: '/single-property/:property_id',
    name: 'single-property',
    props: true,
    component: () => import('@/views/SingleProperty'),
    meta: {
      requireSellerRole: true,
      hideFooterAndAbout: true
    }
  },
  {
    path: '/edit-property-visuals/:property_id',
    name: 'edit-property-visual',
    props: true,
    component: () => import('@/views/EditPropertyVisuals'),
    meta: {
      requireSellerRole: true,
      hideFooterAndAbout: true
    }
  },
  {
    path: '/user-interest-properties',
    name: 'user-interested-properties',
    props: true,
    component: () => import('@/views/UserInterestedProperties'),
    meta: {
      requiresAuth: true,
      hideFooterAndAbout: true
    }
  },
  {
    path: '/user-acquired-properties',
    name: 'user-acquired-properties',
    props: true,
    component: () => import('@/views/UserAcquiredProperties'),
    meta: {
      requiresAuth: true,
      hideFooterAndAbout: true
    }
  },
  {
    path: '/edit-landmark-visuals/:property_id',
    name: 'edit-landmark-visual',
    props: true,
    component: () => import('@/views/EditLandmarkVisuals'),
    meta: {
      requireSellerRole: true,
      hideFooterAndAbout: true
    }
  },
  {
    path: '/edit-neighborhood-visuals/:property_id',
    name: 'edit-neighborhood-visual',
    props: true,
    component: () => import('@/views/EditNeighborhoodVisuals'),
    meta: {
      requireSellerRole: true,
      hideFooterAndAbout: true
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
      // hideAbout: true,
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
    path: '/view/:property_id',
    props: true,
    name: 'ViewProperty',
    component: () => import('@/components/ViewProperty')
  },
  {
    path: '/view-rental/:property_id',
    props: true,
    name: 'ViewRentalProperty',
    component: () => import('@/components/ViewRentalProperty')
  },
  {
    path: '/view-similar-property/:property_id',
    props: true,
    name: 'ViewSimilarProperty',
    component:() => import('@/views/ViewSimilarProperty.vue')
  },
  {
    path: '/view-similar-rental/:property_id',
    props: true,
    name: 'ViewSimilarRental',
    component:() => import('@/views/ViewSimilarRental.vue')
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
    component:() => import('../views/Learn.vue')
  },
  {
    path:'/recentactivities',
    name:'Recent',
    component:() => import('../views/Recent.vue')
  },
  {
    path:'/logs',
    name:'UserlogActivities',
    component:() => import(/* webpackChunkName: "about" */ '../views/UserlogActivities.vue')
  },
  {
    path: '/email-reset-password',
    name: 'EmailResetPassword',
    component:() => import('../views/passwordReset/EmailResetPassword.vue'),
    meta: {
      hideFooterAndAbout: true
    }
  },
  {
    path: '/otp-reset-password',
    name: 'OTPResetPassword',
    component:() => import('../views/passwordReset/OTPResetPassword.vue'),
    meta: {
      hideFooterAndAbout: true
    }
  },
  {
    path: '/new-password-reset-page',
    name: 'NewPasswordResetPassword',
    component:() => import('../views/passwordReset/NewPasswordResetPassword.vue'),
    meta: {
      hideFooterAndAbout: true
    }
  },
  {
    path: '*',
    // v3 "/:catchAll(.*)"
    name: 'NotFoundPage',
    component: () => import('@/components/NotFoundComponent.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
  scrollBehavior (to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { x: 0, y: 0 }
    }
  }
})

export default router
