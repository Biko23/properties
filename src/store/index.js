import Vue from 'vue'
import Vuex from 'vuex'
import SellerModule from './sellerModule'
import BuyerModule from './buyerModule'
import AuthModule from './authModule'
import vendorsModule from './vendorsModule'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    SellerModule,
    BuyerModule,
    AuthModule,
    vendorsModule
  }
})
