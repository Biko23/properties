import AuthService from '@/service/authService';
import decode from "jwt-decode";

const user = JSON.parse(localStorage.getItem('currentUser')) || {};

const state = {
    registeringUser: [],
    currentUser: user,
    isLoggedIn: !!localStorage.getItem('token')
}

const getters = {
    currentRegisteringUser: (state) => state.registeringUser,
    loginState: state => state.isLoggedIn,
    currentLoggedinUser: state => state.currentUser
};

const actions = {
    async signupANewUser({ commit }, newUser) {
        try {
            const response = await AuthService.signupANewUser(newUser);
            commit('setRegisteredUser', response.data.result);
            return response;
        } catch (error) {
            throw new Error("Failed on saved new User");
        }
    },
    async login({ commit }, userDetails) {
        try {
            const response = await AuthService.loggingUser(userDetails);
            if (response.status === 200 || response.status === 201) {
                localStorage.setItem('token', response.data.token);
                commit('loginStatus', true);
            }
            return response;
        } catch (error) {
            throw new Error('An error occured when sending data');
        }
    },
    async updateUser(_, userDetails) {
        try {
            const response = await AuthService.updateUserProfile(userDetails);
            return response;
        } catch (error) {
            throw new Error('An error occured when sending data');
        }
    },
    async fetchLoggedUser({ commit }) {
        try {
            const toDecode = localStorage.getItem('token');
            const decoded = await decode(toDecode);
            const response = await AuthService.fetchLoggedUser(decoded.sub);
            if (response.status === 200 || response.status === 200) {

                const loggedInUser = {
                    username: response.data.result.username,
                    user_id: response.data.result.user_id,
                    vendor_name: response.data.result.name,
                    vendor_primary_phone_number:response.data.result.telephone,
                    category_type: response.data.result.category_type,
                    vendor_primary_email:response.data.result.email,
                    vendor_secondary_phone_number: "",
                    vendor_secondary_email: ""
                }
                localStorage.setItem('currentUser', JSON.stringify(loggedInUser));
                commit("setCurrentUser", loggedInUser);
            }
            return response;
        } catch (error) {
            throw new Error(error);
        }
    },
    async logout({ commit }) {
        try{
        localStorage.removeItem('token');
        localStorage.removeItem('currentUser');
        await commit('loginStatus', false);
        await commit('setCurrentUser', {});
        }
        catch(error){
            throw new Error(error);
        }
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
