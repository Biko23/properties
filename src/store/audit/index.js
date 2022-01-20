import mutations from './mutations'
import actions from './actions'
import getters from './getters'

export default{
  currentUserAuditLogs(){
    return {
        currentUserAuditLogs: []
    }
  },
  mutations,
  actions, 
  getters
}