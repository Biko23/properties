import AuthService from '@/service/authService';
import decode from "jwt-decode";
// const Cryptr = require('cryptr');

let timer;
const TIMER_IN_SECONDS = 60 * 29 * 1000;
const MINUTE_TO_TOKEN_EXPIRY = 240000;
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
    roles: [],
    userRoleIdentifier: 1,
    userEmail: '',
    userOTP: ''
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
    currentUserRoleIdentifier: state => state.userRoleIdentifier,
    resetEmail: state => state.userEmail
};
 
const actions = {
    async signupANewUser({ commit }, newUser) {
        try {
            const response = await AuthService.signupANewUser(newUser);
            commit('setRegisteredUser', response.data.result);
            return response;
        } catch (error) {
            console.log(error);
            // throw new Error(error);
        }
    },
    async login(context, userDetails) { //payload
        try {
            const response = await AuthService.loggingUser(userDetails);
            if (response.status === 200 && response.data.hasOwnProperty('token')) {
                
                var tokenExpiresIn = Date.parse(response.data.expiryTime);
                var tokenExpiresSeconds = TIMER_IN_SECONDS;     

                localStorage.setItem('expiresIn', tokenExpiresIn);
                localStorage.setItem('token', response.data.token);
                localStorage.setItem('expiresInSeconds', tokenExpiresSeconds);
                const decoded = await decode(response.data.token);

                // const cryptr = new Cryptr('kfkfkfdkdsksdsdksdkdsksdkdsksdk4304040dkdsksdkdsk');
                // localStorage.setItem('username',  cryptr.encrypt(decoded.sub));

                localStorage.setItem('username', decoded.sub); //commit this as well
                context.commit('loginStatus', true);
                context.commit('currentToken', response.data.token);

                timer = setInterval(()=>{
                    context.dispatch('fetchNewToken');
                }, tokenExpiresSeconds);

            } else if (response.status === 200 && response.data.hasOwnProperty('status')) {
                context.commit('loginStatus', false);
            }
            return response;
        } catch (error) {
            console.log(error);
            // throw new Error('An error occured when sending data');
        }
    },
    async fetchNewToken(){
        const response = await AuthService.autoUpdateToken();       
        if(response.status == 200){
            var tokenExpiresIn = Date.parse(response.data.expiryTime);
            localStorage.setItem('expiresIn', tokenExpiresIn);
            localStorage.setItem('token', response.data.token);
        }
    },
    //  -----------------------------------
    async autoLogin(context){
        if(context.state.isLoggedIn === true){
            let now = new Date();
            let currentTime = Date.parse(now);
            let expiryTime = localStorage.getItem('expiresIn');
            const comparisionTime = currentTime < expiryTime ? expiryTime - currentTime : 0;

            if(currentTime >= expiryTime){
                context.dispatch('logout');
            } else if(comparisionTime <= MINUTE_TO_TOKEN_EXPIRY) { //4 minutes to expire or less
                context.dispatch('fetchNewToken');
                var tokenExpiresSecond = TIMER_IN_SECONDS;       
                timer = setInterval(()=>{
                    context.dispatch('fetchNewToken');
                }, tokenExpiresSecond);

            } else {
                var tokenExpiresSeconds = TIMER_IN_SECONDS;       
                timer = setTimeout(()=>{
                    context.dispatch('fetchNewToken');
                    setInterval(()=>{
                        context.dispatch('fetchNewToken');
                    }, tokenExpiresSeconds);
                }, comparisionTime);
            }
        }
    },
    // ------------------------------
    assignUpdatingUserRole({ commit }, userRoleIdentifier){
        commit("setUserRoleIdentifier", userRoleIdentifier);
    },
    async updateUser({ state }, userDetails) { //update user profile and assign a role
        try {
            // agent/ landlord
            // const userRole = state.roles.filter(role => role.name === ("Seller" || "seller" || "SELLER"))
            // userDetails.role_id = userRole[0].role_id
            // let userRole = 0;
            // if(state.userRoleIdentifier === 1){
            //     userRole = state.roles.filter(role => role.name === ("agent" || "Agent" || "AGENT"));
            //     userDetails.role_id = userRole[0].role_id
            // } else if (state.userRoleIdentifier === 2){
            //     userRole = state.roles.filter(role => role.name === ("landlord" || "Landlord" || "LANDLORD"));
            //     userDetails.role_id = userRole[0].role_id
            // }
            userDetails.role_id = state.userRoleIdentifier
            const response = await AuthService.updateUserProfile(userDetails);
            return {
                userUpdateResponse: response.userUpdateResponse,
                roleResponse: response.roleResponse
            }
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
            console.log(error);
            // throw new Error(error);
        }
    },
    async logout({ commit }) {
        try {
            localStorage.clear();
            await commit('loginStatus', false);
            await commit('setUserStatus', false);
            await commit('setCurrentUser', {});
            await commit('currentToken', '');
            clearInterval(timer);
        }
        catch (error) {
            console.log(error);
            // throw new Error(error);
        }
    },
    async fetchAllUserRoles({ commit }) {
        try {
            const response = await AuthService.getAllUserRoles();
            commit('setUserRoles', response.data.result);
        }
        catch (error) {
            console.log(error);
        }
    },
    async generatePasswordResetOTP({ commit }, userEmail) {
        try {
            commit('setUserEmail', userEmail);
            const response = await AuthService.generatePasswordResetOTP(userEmail);
            return response;
        }
        catch (error) {
            console.log(error);
        }
    },
    async validateSubmittedOTP({ commit, state }, userOTP) {
        try {
            commit('setUserOTP', userOTP);
            const user = {
                userOTP,
                userEmail: state.userEmail
            }
            const response = await AuthService.validateSubmittedOTP(user);
            return response;
        }
        catch (error) {
            console.log(error);
        }
    },
    async resetPassword({ state }, password) {
        try {
            const user = {
                userPassword: password,
                userOTP: state.userOTP,
                userEmail: state.userEmail
            }
            const response = await AuthService.resetPassword(user);
            return response;
        }
        catch (error) {
            console.log(error);
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
            name: (role.name).toLowerCase()
        }
    }),
    setUserRoleIdentifier: (state, userRoleIdentifier) => state.userRoleIdentifier = userRoleIdentifier,
    setUserEmail: (state, userEmail) => state.userEmail = userEmail,
    setUserOTP: (state, userOTP) => state.userOTP = userOTP
}

export default {
    state,
    getters,
    actions,
    mutations
}
