import PropertyVisualsService from '@/service/propertyVisuals';
import PropertyService from '@/service/property/property';

const state = {
    propertyVisuals: []
}

const getters = {
    allPropertyVisuals: (state) => state.propertyVisuals
};

const actions = {
    async fetchPropertyVisuals({ commit }) {
        try {
            const response = await PropertyVisualsService.getAllPropertyVisuals();
            commit('setPropertyVisuals', response.data.result);
        } catch (error) {
            throw new Error("Failed on loading current properties")
        }
    }
}

const mutations = {
    setPropertyVisuals: (state, returnedVisuals) => (state.propertyVisuals = returnedVisuals)
}

export default {
    state,
    getters,
    actions,
    mutations
}
