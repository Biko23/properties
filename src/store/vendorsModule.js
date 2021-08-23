import vendorsBackOfficeService from '@/service/vendors/vendorsBackOfficeService';

const state = {
    vendorCategories: [],
    vendors: [],
    isLiked: false
}

const getters = {
    allVendorsCategories: (state) => state.vendorCategories,
    allVendors: (state) => state.vendors,
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
            const response = await vendorsBackOfficeService.likeAVendor(newVendor);
            if (response.status === 200 || response.status === 201) {

                // commit('likeStatus', true);
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

    async fetchVendors({ commit }) {
        try {
            const response = await vendorsBackOfficeService.getVendors();
            commit('setVendors', response.data);
            console.log(response.data);
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
    likeStatus: (state, status) => state.isLiked = status
}

export default {
    state,
    getters,
    actions,
    mutations
}
