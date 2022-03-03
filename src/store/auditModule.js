/**
 * @author Isaac Ssemugenyi
 * @copyright flyhub Uganda Ltd
*/
import UserAuditService from '@/service/property/auditLogs';
import dateFormat from "dateformat";

const state = {
    currentUserAuditLogs: []
}

const getters = {
    getCurrentUserAuditLogs: state => state.currentUserAuditLogs
};

const actions = {
    async postAUserLog(context, payload) {
        if (context.rootState.AuthModule.isLoggedIn) {
            try {
                payload.created_by = context.rootState.AuthModule.currentUser.username
                await UserAuditService.postAUserLog(payload);
            } catch (error) {
                console.log(error);
                // throw new Error(error);
            }
        }
    },
    async getAUserLog(context) {
        try {
            const response = await UserAuditService.getASingleUserLog(context.rootState.AuthModule.currentUser.username);
            if (response.data.status == 1) {
                context.commit('setCurrentUserAuditLogs', response.data.result);
            }
            return response;
        } catch (error) {
            throw new Error(error.message);
        }
    }
}

const mutations = {
    setCurrentUserAuditLogs: (state, returnedLogs) => (state.currentUserAuditLogs = returnedLogs.map(log => {
        return {
            "activity" : log.activity,
            "when_created": dateFormat(log.when_created, "ddd, mmm dS, yyyy, h:MM:ss TT")
        }
    }))
}

export default {
    state,
    getters,
    actions,
    mutations
}
