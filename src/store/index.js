/**
 * @author Isaac Ssemugenyi
 * @copyright flyhub Uganda Ltd
*/
import Vue from 'vue'
import Vuex from 'vuex'
import SellerModule from './sellerModule'
import BuyerModule from './buyerModule'
import AuthModule from './authModule'
import vendorsModule from './vendorsModule'
import AuditLogsModule from './auditModule'

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
    vendorsModule,
    AuditLogsModule
  }
})
