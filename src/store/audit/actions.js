import AuditLogService from '../../service/property/auditLogs'

export default {
    async postAUserLog(context, payload) {
            try {
                if(context.rootState.AuthModule.isLoggedIn){
                payload.created_by = context.rootState.AuthModule.currentUser.username
                /** "activity":"Login", "button_clicked":"Login button", "created_by":"alexkisoro" */ 
                await AuditLogService.postAUserLog(payload);
            }
            } catch (error) {
                throw new Error(error);
            }
    },
    async getAUserLog(context) {
        try {
            const response = await AuditLogService.getASingleUserLog(context.rootState.AuthModule.currentUser.username);
            if(response.status == 200 && response.data.status == 1){
                context.commit('setCurrentUserAuditLogs', response.data.result);
            }
        } catch (error) {
            throw new Error(error);
        }
    }
}

