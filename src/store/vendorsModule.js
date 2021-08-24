import vendorsBackOfficeService from '@/service/vendors/vendorsBackOfficeService';

const state = {
    vendorCategories: [],
    vendors: [],
    isLiked: false,
    vendor_category_id: 0
}

const getters = {
    allVendorsCategories: (state) => state.vendorCategories,
    allVendors: (state) => state.vendors,
    vendorCategoryId: state => state.vendor_category_id
   // likeState: state => state.isLiked,
};

const actions = {
    async fetchVendorsCategories({ commit }) {
        try {
            const response = await vendorsBackOfficeService.getVendorsCategories();
            commit('setVendorCategories', response.data);
        } catch (error) {
            throw new Error("Failed on loading current Vendors")
        }
    },
    async postVendor(_, newVendor) {
        try {
            const response = await vendorsBackOfficeService.postProfessional(newVendor);
            return response;
        } catch (error) {
            throw new Error("Failed on posting new profession sevice")
        }
    },
    async likeVendor(_, newVendor) {
        try {
            const response = await vendorsBackOfficeService.likeAVendor(newVendor,user_id);
            if (response.status === 200 || response.status === 201) {

                commit('likeStatus', true);
               alert("Liked")
            }
            return response;
        } catch (error) {
            throw new Error("Failed on liking current vendor")
        }
    },
    async unLikeVendor(_, newVendor) {
        try {
            const response = await vendorsBackOfficeService.unLikeAVendor(newVendor);
            if (response.status === 200 || response.status === 201) {

                commit('likeStatus', false);
            }
            return response;
        }
        catch (error) {
            throw new Error("Failed on unliking current vendor")
        }
    },
    async changeServiceProviderCategoryId({ commit }, vendor_category_id) {
       commit('setGlobalVendorCategoryId', vendor_category_id);
    },
    async fetchVendors({ commit }, vendor_category_id) {
    // async fetchVendors({ commit, state }, vendor_category_id) {
        try {
            // const id = state.vendor_category_id || vendor_category_id;
            // const response = await vendorsBackOfficeService.getVendors(id);
            // const response = await vendorsBackOfficeService.getVendors();
            const response = await vendorsBackOfficeService.getVendors(vendor_category_id);
            commit('setVendors', response.data);
        } catch (error) {
            throw new Error("Failed on loading current Vendors")
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
    likeStatus: (state, status) => state.isLiked = status,
    setGlobalVendorCategoryId: (state, vendor_category_id) => state.vendor_category_id = vendor_category_id
}

export default {
    state,
    getters,
    actions,
    mutations
}
