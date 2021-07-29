import AuthService from '@/service/authService'

const state = {
    registeringUser: []
}

const getters = {
    currentRegisteringUser: (state) => state.registeringUser
};

const actions = {
    async signupANewUser({ commit }, newUser) {
        try {
            const response = await AuthService.signupANewUser(newUser);
            commit('setRegisteredUser', response.data.result);
            return response;
        } catch (error) {
            throw new Error("Failed on saved new User")
        }
    }
}

const mutations = {
    setRegisteredUser: (state, returnedUser) => (state.registeringUser = returnedUser)
}

export default {
    state,
    getters,
    actions,
    mutations
}
