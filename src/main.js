import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import VueOtp2 from 'vue-otp-2';
import VueSession from 'vue-session'

// import VuetifyGoogleAutocomplete from 'vuetify-google-autocomplete';

import BaseSpinner from '@/components/BaseSpinner.vue'
import BaseDialog from '@/components/BaseDialog.vue'

// To load sharing icons
import vuetifyIcon from 'vuetify'
import VueSocialSharing from 'vue-social-sharing'
import './registerServiceWorker'
// End load sharing icons

//To help with logging
import VueLogger from 'vuejs-logger'

const isProduction = process.env.NODE_ENV === 'production';
const opitions = {
  isEnabled: true,
  loglevel: isProduction ? 'error' : 'debug',
  stringifyArguments : false,
  showLogLevel: true,
  showMethodName: true,
  separator: '|',
  showConsoleColors: true
}

Vue.component('base-dialog', BaseDialog)
Vue.component('base-spinner', BaseSpinner)

Vue.config.productionTip = false

Vue.use(VueOtp2)
// Session
Vue.use(VueSession)

// To load sharing icons
Vue.use(vuetifyIcon)
Vue.use(VueSocialSharing)
// End load sharing icons

//To use vue-logger
Vue.use(VueLogger, opitions)


router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.basicAuth)) {
    if (!store.getters.loginState) {
      next()
    } else {
      next()
    }
  }

  // Check authentication
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (
      !store.getters.loginState ||
      (Object.keys(store.getters.currentLoggedinUser).length === 0 &&
        (store.getters.currentLoggedinUser).constructor === Object)
    ) {
      sessionStorage.setItem('redirectPath', to.path);
      next('/login')
      return
    } else {
      next()
    }
  } else {
    next()
  }

  // check if authenticated and a seller as well
  if (to.matched.some(record => record.meta.requireSellerRole)) {
    if (store.getters.loginState && store.getters.iAmASeller && store.getters.iAmACertifiedSeller) {
      next()
      return
    } else if(store.getters.loginState && (store.getters.iAmASeller || !store.getters.iAmASeller) && !store.getters.iAmACertifiedSeller) {
      const myRoute = sessionStorage.setItem('nextPath', to.path);
      next(myRoute || '/getstarted');
      sessionStorage.removeItem('nextPath');
      return
    } else {
      next('/login')
    }
  } else {
    next()
  }

// Check if user logged in and dont allow to go back
  if (to.matched.some(record => record.meta.hideForAuth)) {
    if (
      store.getters.loginState ||
      (Object.keys(store.getters.currentLoggedinUser).length !== 0 &&
        (store.getters.currentLoggedinUser).constructor === Object)
    ) {
      next('/');
    } else {
      next();
    }
  } else {
    next();
  }
})


new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')

