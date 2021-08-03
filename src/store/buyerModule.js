import PropertyVisualsService from '@/service/propertyVisuals';
import PropertyNearbyLandmarkService from '@/service/propertyNearbyLandmark';
import NeighborhoodVisualsService from '@/service/neighborhoodVisuals';

const state = {
    propertyVisuals: [],
    singlePropertyVisuals: [],
    singlePropertyNearbyLandmarkVisuals: [],
    singleNeighborhoodVisuals: []
}

const getters = {
    allPropertyVisuals: (state) => state.propertyVisuals,
    allSinglePropertyVisuals: (state) => state.singlePropertyVisuals,
    allSinglePropertyNearbyLandmarkVisuals: (state) => state.singlePropertyNearbyLandmarkVisuals,
    allSingleNeighborhoodVisuals: (state) => state.singleNeighborhoodVisuals
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
    },
    async fetchPropertyNearbyLandmarkVisuals({ commit }, property_id){
        try {
            const response = await PropertyNearbyLandmarkService.getPropertyNearbyLandmarkByPropertyId(property_id);
            commit("setSinglePropertyNearbyLandmarkVisuals", response.data.result);
        } catch (error) {
            throw new Error("Failed on loading current property visuals")
        }
    },
    async fetchPropertyNeighborhoodVisuals({ commit }, property_id){
        try {
            const response = await NeighborhoodVisualsService.getNeighborhoodVisualsByPropertyId(property_id);
            commit("setSinglePropertyNeighborhoodVisuals", response.data.result);
        } catch (error) {
            throw new Error("Failed on loading current property visuals")
        }
    }
}

const mutations = {
    setPropertyVisuals: (state, returnedVisuals) => (state.propertyVisuals = returnedVisuals),
    setSinglePropertyVisuals: (state, returnedSinglePropertyVisuals) => (state.singlePropertyVisuals = returnedSinglePropertyVisuals),
    setSinglePropertyNearbyLandmarkVisuals: (state, returnedSinglePropertyLandmarkVisuals) => (state.singlePropertyNearbyLandmarkVisuals = returnedSinglePropertyLandmarkVisuals),
    setSinglePropertyNeighborhoodVisuals: (state, returnedSinglePropertyNeighborhoodVisuals) => (state.singleNeighborhoodVisuals = returnedSinglePropertyNeighborhoodVisuals)
}

export default {
    state,
    getters,
    actions,
    mutations
}
