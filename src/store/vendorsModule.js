import vendorsBackOfficeService from '@/service/vendors/vendorsBackOfficeService';

const state = {
    vendorCategories: []
}

const getters = {
    allVendorsCategories: (state) => state.vendorCategories
};

const actions = {
    async fetchVendorsCategories({ commit }) {
        try {
            const response = await vendorsBackOfficeService.getVendorsCategories();
            commit('setVendorCategories', response.data);
        } catch (error) {
            throw new Error("Failed on loading current properties")
        }
    },
    async postVendor(_ , newVendor) {
        try {
            const response = await vendorsBackOfficeService.postProfessional(newVendor);
            return response;
        } catch (error) {
            throw new Error("Failed on loading current properties")
        }
    }
}

const mutations = {
    setVendorCategories: (state, returnedVendorsCategories) => (state.vendorCategories = returnedVendorsCategories.map(vendorCategory =>{
        return{
            value:vendorCategory.vendor_category_id,
            text:vendorCategory.vendor_category_name
        }
    }))
}

export default {
    state,
    getters,
    actions,
    mutations
}
