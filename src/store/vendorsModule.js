import vendorsBackOfficeService from '@/service/vendors/vendorsBackOfficeService';

const state = {
    vendorCategories: [],
    vendors: [],
    vendor_category_id: 0,
    likedVendors: [],
    unlikedVendors: []
}

const getters = {
    allVendorsCategories: (state) => state.vendorCategories,
    allVendors: (state) => state.vendors,
    vendorCategoryId: state => state.vendor_category_id, //Watching the type of professional providers loaded
    allLikedVendors: state => state.likedVendors,
    allUnlikedVendors: state => state.unlikedVendors
};

const actions = {
    async fetchVendorsCategories({ commit }) {
        try {
            const response = await vendorsBackOfficeService.getVendorsCategories();
            commit('setVendorCategories', response.data);
            return response;
        } catch (error) {
            console.log(error);
        }
    },
    async postVendor(_ , newVendor) {
        try {
            const response = await vendorsBackOfficeService.postProfessional(newVendor);
            return response;
        } catch (error) {
            console.log(error);
            // throw new Error("Failed on posting new profession sevice")
        }
    },
    async likeVendor({ commit, state }, newVendor) {
        try {
            const response = await vendorsBackOfficeService.likeAVendor(newVendor);
            if (response.status === 201) {
                const vendorIndex = state.vendors.findIndex(vendor => vendor.vendor_id === newVendor.vendor_id);
                commit('setVendorLike', {
                    modifiedVendor: response.data, 
                    vendorId: newVendor.vendor_id, 
                    vendorIndex: vendorIndex
                });
            }
            return response;
        } catch (error) {
            throw new Error(error.message)
        }
    },
    async unLikeVendor({ commit, state }, newVendor) {
        try {
            const response = await vendorsBackOfficeService.unLikeAVendor(newVendor);
            if (response.status === 201) {
                const vendorIndex = state.vendors.findIndex(vendor => vendor.vendor_id === newVendor.vendor_id);
                commit('setVendorUnlike', {
                    modifiedVendor: response.data, 
                    vendorId: newVendor.vendor_id,
                    vendorIndex: vendorIndex
                });
            }
            return response;
        } catch (error) {
            throw new Error(error.message)
        }
    },
    async fetchAllLikedVendorsByUserId({ commit, rootState }) {
        try {
            if (rootState.AuthModule.isLoggedIn === true) {
                const response = await vendorsBackOfficeService.getListOfLikedVendorsByUserId(rootState.AuthModule.currentUser.user_id);
                if (response.status === 200) {
                    commit('setLikedVendorsList', response.data);
                }
            }
        } catch (error) {
            console.log(error);
            // throw new Error("Failed on get all liked vendors")
        }
    },
    async fetchAllUnlikedVendorsByUserId({ commit, rootState }) {
        try {
            if (rootState.AuthModule.isLoggedIn === true) {
                const response = await vendorsBackOfficeService.getListOfUnlikedVendorsByUserId(rootState.AuthModule.currentUser.user_id);
                if (response.status === 200) {
                    commit('setUnlikedVendorsList', response.data);
                }
            }
        } catch (error) {
            console.log(error);
            // throw new Error("Failed on get all unliked vendors")
        }
    },
    async changeServiceProviderCategoryId({ commit }, vendor_category_id) {
        commit('setGlobalVendorCategoryId', vendor_category_id);
    },
    async fetchVendors({ commit }, vendor_category_id) {
        try {
            const response = await vendorsBackOfficeService.getVendors(vendor_category_id);
            commit('setVendors', response.data);
            return response;
        } catch (error) {
            throw new Error(error.message)
        }
    },
}

const mutations = {
    setVendorCategories: (state, returnedVendorsCategories) => (state.vendorCategories = returnedVendorsCategories.map(vendorCategory => {
        return {
            value: vendorCategory.vendor_category_id,
            text: vendorCategory.vendor_category_name
        }
    })),
    setVendors: (state, returnedVendors) => (state.vendors = returnedVendors),
    setGlobalVendorCategoryId: (state, vendor_category_id) => state.vendor_category_id = vendor_category_id,
    setLikedVendorsList: (state, returnedLikedVendors) => state.likedVendors = returnedLikedVendors
        .map(likedVendor => likedVendor.vendor_id),
    setUnlikedVendorsList: (state, returnedUnlikedVendors) => state.unlikedVendors = returnedUnlikedVendors
        .map(eachUnlikedVendor => eachUnlikedVendor.vendor_id),
    setVendorLike: (state, results) => (
        state.vendors.splice(results.vendorIndex, 1, results.modifiedVendor),
        state.vendors = [...state.vendors],
        state.likedVendors = [...state.likedVendors, results.vendorId],
        state.unlikedVendors = state.unlikedVendors.filter(unlikedVendor => unlikedVendor !== results.vendorId)
    ),

    /**
     * vendor_id: 5
    */
    setVendorUnlike: (state, results) => (
        state.vendors.splice(results.vendorIndex, 1, results.modifiedVendor),
        state.vendors = [...state.vendors],
        state.likedVendors = state.likedVendors.filter(unlikedVendor => unlikedVendor !== results.vendorId),
        state.unlikedVendors = [...state.unlikedVendors, results.vendorId]
    )
}

export default {
    state,
    getters,
    actions,
    mutations
}
