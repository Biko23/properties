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

// router.beforeEnter((to, from, next) => {
//   // check vuex store //
//   if(to.matched.some(record => record.meta.requireSellerRole)){
//   if (store.getters.isSeller && store.getters.isCertifiedSeller) {
//     next('/register')
//   } else {
//     next('/property-requirement');
//   }
// }
// })

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')

