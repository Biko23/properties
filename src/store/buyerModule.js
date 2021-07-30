import PropertyVisualsService from '@/service/propertyVisuals';
import PropertyService from '@/service/property/property';

const state = {
    propertyVisuals: [],
    singlePropertyVisuals: []
}

const getters = {
    allPropertyVisuals: (state) => state.propertyVisuals,
    allSinglePropertyVisuals: (state) => state.singlePropertyVisuals
};

const actions = {
    async fetchPropertyVisuals({ commit }) {
        try {
            const response = await PropertyVisualsService.getAllPropertyVisuals();
            commit('setPropertyVisuals', response.data.result);
        } catch (error) {
            throw new Error("Failed on loading current properties")
        }
    },
    async fetchSinglePropertyVisuals({ commit }, property_id){
        try {
            const response = await PropertyVisualsService.getPropertyVisualsByPropertyId(property_id);
            commit("setSinglePropertyVisuals", response.data.result);
        } catch (error) {
            throw new Error("Failed on loading current property visuals")
        }
    }
}

const mutations = {
    setPropertyVisuals: (state, returnedVisuals) => (state.propertyVisuals = returnedVisuals),
    setSinglePropertyVisuals: (state, returnedSinglePropertyVisuals) => (state.singlePropertyVisuals = returnedSinglePropertyVisuals)
}

export default {
    state,
    getters,
    actions,
    mutations
}
