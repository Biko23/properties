import AuthService from '@/service/authService';
import decode from "jwt-decode";

const state = {
    registeringUser: [],
    currentUser: {},
    isLoggedIn: !!localStorage.getItem('token')
}

const getters = {
    currentRegisteringUser: (state) => state.registeringUser,
    loginState: state => state.isLoggedIn
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
    async login({ commit }, userDetails) {
        try {
            const response = await AuthService.loggingUser(userDetails);
            if (response.status === 200 || response.status === 201) {
                localStorage.setItem('token', response.data.token);
                commit('loginStatus', true);
            }
            return response
        } catch (error) {
            throw new Error('An error occured when sending data')
        }
    },
    async updateUser(_, userDetails) {
        try {
            const response = await AuthService.updateUserProfile(userDetails);
            return response
        } catch (error) {
            throw new Error('An error occured when sending data')
        }
    },
    async fetchLoggedUser({ commit }) {
        try {
            const toDecode = localStorage.getItem('token');
            const decoded = await decode(toDecode);
            console.log(decoded);
            const response = await AuthService.fetchLoggedUser(decoded.sub);
            if (response.status === 200 || response.status === 200) {
                commit("setCurrentUser", response.data.result);
                console.log(response.data.result);
            }
            return response;
        } catch (error) {
            throw new Error(error)
        }
    },
    //   to work on it
    async logout({ commit }) {
        localStorage.removeItem('token');
        await commit('loginStatus', false);
        await commit('setCurrentUser', {});
    }
}

const mutations = {
    setRegisteredUser: (state, returnedUser) => (state.registeringUser = returnedUser),
    setCurrentUser: (state, currentUser) => state.currentUser = currentUser,
    loginStatus: (state, status) => state.isLoggedIn = status
}

export default {
    state,
    getters,
    actions,
    mutations
}
