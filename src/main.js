import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import VuetifyGoogleAutocomplete from 'vuetify-google-autocomplete';

Vue.config.productionTip = false

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
      next(to.path)
      return
    } else if(store.getters.loginState && (store.getters.iAmASeller || !store.getters.iAmASeller) && !store.getters.iAmACertifiedSeller) {
      const myRoute = sessionStorage.setItem('nextPath', to.path);
      next(myRoute || '/profile');
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

