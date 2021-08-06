import vendorsBackOfficeService from '@/service/vendors/vendorsBackOfficeService';

const state = {
    vendorCategories: [],
    vendors:[]
}

const getters = {
    allVendorsCategories: (state) => state.vendorCategories,
    allVendors:(state)=>state.vendors
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
    async postVendor(_ , newVendor) {
        try {
            const response = await vendorsBackOfficeService.postProfessional(newVendor);
            return response;
        } catch (error) {
            throw new Error("Failed on posting new profession sevice")
        }
    },
    async likeVendor(_ , newVendor) {
        try {
            const response = await vendorsBackOfficeService.likeAVendor(newVendor);
            return response;
        } catch (error) {
            throw new Error("Failed on liking current vendor")
        }
    },

    async fetchVendors({ commit }) {
        try {
            const response = await vendorsBackOfficeService.getVendors();
            commit('setVendors', response.data);
        } catch (error) {
            throw new Error("Failed on loading current Vendors")
        }
    },
}

const mutations = {
    setVendorCategories: (state, returnedVendorsCategories) => (state.vendorCategories = returnedVendorsCategories.map(vendorCategory =>{
        return{
            value:vendorCategory.vendor_category_id,
            text:vendorCategory.vendor_category_name
        }
    })),
    setVendors:(state,returnedVendors)=>(state.vendors = returnedVendors)
}

export default {
    state,
    getters,
    actions,
    mutations
}
