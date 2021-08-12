import PropertyVisualsService from '@/service/propertyVisuals';
import PropertyNearbyLandmarkService from '@/service/propertyNearbyLandmark';
import NeighborhoodVisualsService from '@/service/neighborhoodVisuals';
import PropertyValueService from '@/service/propertyValue';
import PropertyPriceHistoryService from '@/service/propertyPriceHistories';
import { formatDate } from '@/helpers/helpers';

const state = {
    propertyVisuals: [],
    singlePropertyVisuals: [],
    singlePropertyNearbyLandmarkVisuals: [],
    singleNeighborhoodVisuals: [],
    latestProperties: [],
    propertyValue: {},
    propertyPriceHistory: []
}

const getters = {
    allPropertyVisuals: (state) => state.propertyVisuals,
    allSinglePropertyVisuals: (state) => state.singlePropertyVisuals,
    allSinglePropertyNearbyLandmarkVisuals: (state) => state.singlePropertyNearbyLandmarkVisuals,
    allSingleNeighborhoodVisuals: (state) => state.singleNeighborhoodVisuals,
    allLatestProperties: (state) => state.latestProperties,
    currentPropertyValue: (state) => state.propertyValue,
    currentPropertyPriceHistory: (state) => state.propertyPriceHistory
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
    async fetchLatestPropertyVisuals({ commit }) {
        try {
            const response = await PropertyVisualsService.getLatestPropertyVisuals();
            commit('setLatestPropertyVisuals', response.data.result);
        } catch (error) {
            throw new Error("Failed on loading latest properties")
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
    },
    async fetchCurrentPropertyValue({ commit }, property_id){
        try {
            const response = await PropertyValueService.getPropertyValueByPropertyId(property_id);
            commit("setSinglePropertyValue", response.data.result);
        } catch (error) {
            throw new Error("Failed on loading current property value")
        }
    },
    async fetchPropertyPriceHistories({ commit }, property_id){
        try {
            const response = await PropertyPriceHistoryService.getPropertyPriceHistoriesByPropertyId(property_id);
            console.log(response);
            commit("setSinglePropertyPriceHistory", response.data.result);
        } catch (error) {
            throw new Error("Failed on loading current property price histories")
        }
    }
}

const mutations = {
    setPropertyVisuals: (state, returnedVisuals) => (state.propertyVisuals = returnedVisuals),
    setSinglePropertyVisuals: (state, returnedSinglePropertyVisuals) => (state.singlePropertyVisuals = returnedSinglePropertyVisuals),
    setSinglePropertyNearbyLandmarkVisuals: (state, returnedSinglePropertyLandmarkVisuals) => (state.singlePropertyNearbyLandmarkVisuals = returnedSinglePropertyLandmarkVisuals),
    setSinglePropertyNeighborhoodVisuals: (state, returnedSinglePropertyNeighborhoodVisuals) => (state.singleNeighborhoodVisuals = returnedSinglePropertyNeighborhoodVisuals),
    setLatestPropertyVisuals: (state, returnedLatestProperties) => (state.latestProperties = returnedLatestProperties),
    setSinglePropertyValue: (state, returnedSinglePropertyValue) => (state.propertyValue = returnedSinglePropertyValue),
    setSinglePropertyPriceHistory: (state, returnedSinglePropertyPriceHistories) => (state.propertyPriceHistory = returnedSinglePropertyPriceHistories.map(priceHistory => {
        return {
            property_id: priceHistory.property_id,
            event: priceHistory.event,
            price: priceHistory.price,
            when_created: formatDate(priceHistory.when_created)
        }
    }))
}

export default {
    state,
    getters,
    actions,
    mutations
}
