import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import VueSession from 'vue-session'
import VuetifyGoogleAutocomplete from 'vuetify-google-autocomplete';
// import axios from 'axios'

// const token = localStorage.getItem('token')
// const user = localStorage.getItem('currentUser') ? JSON.parse(localStorage.getItem('currentUser')) : ''
// const username = user.username

// axios.defaults.headers['authorization'] = token
// axios.defaults.headers['username'] = username


// To load sharing icons
import vuetifyIcon from 'vuetify'
import VueSocialSharing from 'vue-social-sharing'
// End load sharing icons

Vue.config.productionTip = false

// Session
Vue.use(VueSession)

// To load sharing icons
Vue.use(vuetifyIcon)
Vue.use(VueSocialSharing)
// End load sharing icons

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

