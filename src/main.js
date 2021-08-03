import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import VuetifyGoogleAutocomplete from 'vuetify-google-autocomplete';

Vue.config.productionTip = false

Vue.use(VuetifyGoogleAutocomplete, {
  apiKey: 'AIzaSyD6gvBSrdsMXKo_3KnZzZEMn8aqqDYdRfQ'
});

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
