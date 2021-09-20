import AuthService from '@/service/authService';
import decode from "jwt-decode";

const user = JSON.parse(localStorage.getItem('currentUser')) || {};

const state = {
    registeringUser: [],
    currentUser: user,
    isLoggedIn: !!localStorage.getItem('token'),
    loginToken: localStorage.getItem('token'), // new
    is_seller: !!user.is_seller,
    is_investor: !!user.is_investor,
    is_product_developer: !!user.is_product_developer,
    is_certified_seller: !!user.is_certified_seller,
    is_professional_service_provider: !!user.is_professional_service_provider,
    is_certified_product_developer: !!user.is_certified_product_developer,
    is_certified_investor: !!user.is_certified_investor,
    is_certified_professional_service_provider: !!user.is_certified_professional_service_provider,
    roles: user.roles,
    userRoleIdentifier: 1
}

const getters = {
    currentRegisteringUser: state => state.registeringUser,
    loginState: state => state.isLoggedIn,
    currentUserToken: state => state.loginToken, // new
    currentLoggedinUser: state => state.currentUser,
    iAmASeller: state => state.is_seller,
    iAmAInvestor: state => state.is_investor,
    iAmAProductDeveloper: state => state.is_product_developer,
    iAmACertifiedSeller: state => state.is_certified_seller,
    iAmAProfessionalServiceProvider: state => state.is_professional_service_provider,
    iAmACertifiedProductDeveloper: state => state.is_certified_product_developer,
    iAmACertifiedInvestor: state => state.is_certified_investor,
    iAmACertifiedProfessionalServiceProvider: state => state.is_certified_professional_service_provider,
    allRoles: state => state.roles,
    currentUserRoleIdentifier: state => state.userRoleIdentifier
};
 
const actions = {
    async signupANewUser({ commit }, newUser) {
        try {
            const response = await AuthService.signupANewUser(newUser);
            commit('setRegisteredUser', response.data.result);
            return response;
        } catch (error) {
            throw new Error(error);
        }
    },
    async login({ commit }, userDetails) { //payload
        try {
            const response = await AuthService.loggingUser(userDetails);
            if (response.status === 200 && response.data.hasOwnProperty('token')) {
                localStorage.setItem('token', response.data.token);
                commit('loginStatus', true);
                // sessionStorage.setItem('token', response.data.token);
                commit('currentToken', response.data.token); // new
            } else if (response.status === 200 && response.data.hasOwnProperty('status')) {
                commit('loginStatus', false);
            }
            return response;
        } catch (error) {
            throw new Error('An error occured when sending data');
        }
    },
    assignUpdatingUserRole({ commit }, userRoleIdentifier){
        commit("setUserRoleIdentifier", userRoleIdentifier);
    },
    async updateUser(_, userDetails) { //update user profile and assign a role
        try {
            // agent/ landlord
            // const userRole = state.roles.filter(role => role.name === ("Seller" || "seller" || "SELLER"))
            // userDetails.role_id = userRole[0].role_id
            let userRole = 0;
            if(state.userRoleIdentifier === 1){
                userRole = state.roles.filter(role => role.name === ("agent" || "Agent" || "AGENT"));
                userDetails.role_id = userRole[0].role_id
            } else if (state.userRoleIdentifier === 2){
                userRole = state.roles.filter(role => role.name === ("landlord" || "Landlord" || "LANDLORD"));
                userDetails.role_id = userRole[0].role_id
            }
            const response = await AuthService.updateUserProfile(userDetails);
            return response;
        } catch (error) {
            console.log(error);
            // throw new Error('An error occured when sending data');
        }
    },
    async updateUserProfile(_, payload){
        try {
            const response = await AuthService.updateUserProfileOnly(payload); //update profile only
            return response;
        } catch (error) {
            console.log(error);
        }
    },
    async fetchLoggedUser({ commit }) {
        try {
            const toDecode = localStorage.getItem('token');
            const decoded = await decode(toDecode);
            const response = await AuthService.fetchLoggedUser(decoded.sub);
            if (response.status === 200) {

                const loggedInUser = {
                    username: response.data.result.username,
                    user_id: response.data.result.user_id,
                    vendor_name: response.data.result.name,
                    vendor_primary_phone_number: response.data.result.telephone,
                    category_type: response.data.result.category_type,
                    vendor_primary_email: response.data.result.email,
                    vendor_secondary_phone_number: response.data.result.secondary_contact,
                    vendor_secondary_email: response.data.result.secondary_email,
                    business_location: response.data.result.business_location,
                    roles: response.data.result.roles,
                    when_created: response.data.result.when_created,
                    is_seller: response.data.result.seller,
                    is_investor: response.data.result.investor,
                    is_product_developer: response.data.result.product_developer,
                    is_certified_seller: response.data.result.certified_seller,
                    is_professional_service_provider: response.data.result.professional_service_provider,
                    is_certified_product_developer: response.data.result.certified_product_developer,
                    is_certified_investor: response.data.result.certified_investor,
                    is_certified_professional_service_provider: response.data.result.certified_professional_service_provider
                }

                localStorage.setItem('currentUser', JSON.stringify(loggedInUser));
                commit("setCurrentUser", loggedInUser);
                commit("setIsseller", loggedInUser.is_seller);
                commit("setIsInvestor", loggedInUser.is_investor);
                commit("setIsProductDeveloper", loggedInUser.is_product_developer);
                commit("setIsCertifiedSeller", loggedInUser.is_certified_seller);
                commit("setIsProfessionalServiceProvider",loggedInUser.is_professional_service_provider);
                commit("setIsCertifiedProductDeveloper",loggedInUser.is_certified_product_developer);
                commit("setIsCertifiedInvestor",loggedInUser.is_certified_investor);
                commit("setIsCertifiedProfessionalServiceProvider",loggedInUser.is_certified_professional_service_provider);
            }
            return response;
        } catch (error) {
            throw new Error(error);
        }
    },
    async logout({ commit }) {
        try {
            localStorage.removeItem('token');
            localStorage.removeItem('currentUser');
            await commit('loginStatus', false);
            await commit('setUserStatus', false);
            await commit('setCurrentUser', {});
            await commit('currentToken', '');
        }
        catch (error) {
            throw new Error(error);
        }
    },
    async fetchAllUserRoles({ commit }) {
        try {
            const response = await AuthService.getAllUserRoles();
            commit('setUserRoles', response.data.result);
        }
        catch (error) {
            throw new Error(error);
        }
    }
}

const mutations = {
    setRegisteredUser: (state, returnedUser) => (state.registeringUser = returnedUser),
    setCurrentUser: (state, currentUser) => state.currentUser = currentUser,
    loginStatus: (state, status) => state.isLoggedIn = status,
    currentToken: (state, token) => state.loginToken = token,
    setUserStatus: (state, status) => {
        state.is_seller = status,
        state.is_investor = status,
        state.is_product_developer = status,
        state.is_certified_seller = status,
        state.is_professional_service_provider = status,
        state.is_certified_product_developer = status,
        state.is_certified_investor = status,
        state.is_certified_professional_service_provider = status
    },
    setIsseller: (state, status) => state.is_seller = status,
    setIsInvestor: (state, status) => state.is_investor = status,
    setIsProductDeveloper: (state, status) => state.is_product_developer = status,
    setIsCertifiedSeller: (state, status) => state.is_certified_seller = status,
    setIsProfessionalServiceProvider: (state, status) => state.is_professional_service_provider = status,
    setIsCertifiedProductDeveloper: (state, status) => state.is_certified_product_developer = status,
    setIsCertifiedInvestor: (state, status) => state.is_certified_investor = status,
    setIsCertifiedProfessionalServiceProvider: (state, status) => state.is_certified_professional_service_provider = status,
    setUserRoles: (state, userRoles) => state.roles = userRoles.map(role => {
        return {
            role_id: role.role_id,
            name: role.name
        }
    }),
    setUserRoleIdentifier: (state, userRoleIdentifier) => state.userRoleIdentifier = userRoleIdentifier
}

export default {
    state,
    getters,
    actions,
    mutations
}
