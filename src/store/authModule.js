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
    },
    async login (_, userDetails) {
        try {
          const response = await AuthService.loggingUser(userDetails);
          if(response.status ===200){
              localStorage.setItem('token', response.data.token);
          }

          return response
        } catch (error) {
          throw new Error('An error occured when sending data')
        }
      },
      async updateUser (_, userDetails) {
        try {
            const response = await AuthService.updateUserProfile(userDetails);
            return response
        } catch (error) {
          throw new Error('An error occured when sending data')
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
