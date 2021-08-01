import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'

Vue.config.productionTip = false

router.beforeEach((to, from, next) => {
  if(to.matched.some(record => record.meta.basicAuth)){
    if(!store.getters.loginState){
      next()
    } else {
      next()
    }
  }

  if(to.matched.some(record => record.meta.requiresAuth)) {
    if (!store.getters.loginState) {
      sessionStorage.setItem('redirectPath', to.path);
      next('/login')
      return
    } else {
      next()
    }
  } else {
    next()
  }
})

// router.beforeEach((to, from, next) => {
//   const requiresAuth = to.matched.some(x => x.meta.requiresAuth);
//   const currentUser = firebase.auth().currentUser;

//   if (requiresAuth && !currentUser) {
//     sessionStorage.setItem('redirectPath', to.path);
//     next('/login');
//   } else if (requiresAuth && currentUser) {
//     next();
//   } else {
//     next();
//   }
// });



new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')

