import PropertyService from '@/service/property/property';
import PropertyVisualsService from '@/service/propertyVisuals';
import PropertyNearbyLandmarkService from '@/service/propertyNearbyLandmark';
import NeighborhoodVisualsService from '@/service/neighborhoodVisuals';
import PropertyValueService from '@/service/propertyValue';
import PropertyRentalValueService from '@/service/propertyRentalValue';
import PropertyPriceHistoryService from '@/service/propertyPriceHistories';
import FeatureTypeLookupService from '@/service/property/featureTypeLookup';
import { formatDate } from '@/helpers/helpers';

const state = {
    propertyForSale: [],
    propertyForRent: [],
    singlePropertyVisuals: [],
    singlePropertyNearbyLandmarkVisuals: [],
    singleNeighborhoodVisuals: [],
    latestProperties: [],
    propertyValue: {},
    rentalValue: {},
    propertyPriceHistory: [],
    currentPropertyFeatures: [],
    searchedResults: [],
    searchKeyword: ''
}

const getters = {
    allPropertyForSale: (state) => state.propertyForSale,
    allPropertyForRent: (state) => state.propertyForRent,
    allSinglePropertyVisuals: (state) => state.singlePropertyVisuals,
    allSinglePropertyNearbyLandmarkVisuals: (state) => state.singlePropertyNearbyLandmarkVisuals,
    allSingleNeighborhoodVisuals: (state) => state.singleNeighborhoodVisuals,
    allLatestProperties: (state) => state.latestProperties,
    currentPropertyValue: (state) => state.propertyValue,
    currentRentalValue: (state) => state.rentalValue,
    currentPropertyPriceHistory: (state) => state.propertyPriceHistory,
    allCurrentPropertyFeatures: state => state.currentPropertyFeatures,
    currentSearchKeyword: state => state.searchKeyword,
    allSearchedResults: state => state.searchedResults
};

const actions = {
    // fetchPropertyVisuals
    async fetchPropertyForSale({commit, rootState}) {
        try {
            const is_listed_for_id = rootState.SellerModule.saleCategory[0].id
            const response = await PropertyService.getAllPropertyForSale(is_listed_for_id);
            commit('setPropertyForSale', response.data.result);
        } catch (error) {
            throw new Error("Failed on loading current properties")
        }
    },
    async fetchPropertyForRent({commit, rootState}) {
        try {
            const is_listed_for_id = rootState.SellerModule.rentCategory[0].id
            const response = await PropertyService.getAllPropertyForRent(is_listed_for_id);
            commit('setPropertyForRent', response.data.result);
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
    async fetchCurrentPropertySelectedFeatures({ commit }, property_id){
        try {
            console.log(property_id);
            const response = await FeatureTypeLookupService.getPropertyFeatureTypesByPropertyId(property_id);
            commit("setCurrentPropertyFeatures", response.data.result);
        } catch (error) {
            throw new Error("Failed on loading current property features")
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
    async fetchPropertyRentalValue({ commit }, property_id){
        try {
            const response = await PropertyRentalValueService.getPropertyRentalValueByPropertyId(property_id);
            commit("setSingleRentalValue", response.data.result);
        } catch (error) {
            throw new Error("Failed on loading current property value")
        }
    },
    async fetchPropertyPriceHistories({ commit }, property_id){
        try {
            const response = await PropertyPriceHistoryService.getPropertyPriceHistoriesByPropertyId(property_id);
            commit("setSinglePropertyPriceHistory", response.data.result);
        } catch (error) {
            throw new Error("Failed on loading current property price histories")
        }
    },
    loadSearchKeywordIntoGlobalState({ commit }, keyword){
        commit("setSearchKey", keyword);
        return "ok";
    },
    async fetchPropertiesBySearchKeyword({ commit }){
        try {
            const response = await PropertyService.getSearchedProperties(state.searchKeyword);
            commit("setSearchedPropertyResult", response.data.result);
        } catch (error) {
            throw new Error("Failed to fetch your data");
        }
    }
}

const mutations = {
    setPropertyForSale: (state, returnedPropertyForSale) => (state.propertyForSale = returnedPropertyForSale
        .map(eachPropertyForSale => {
            return {
                property_id: eachPropertyForSale.propertyid_,
                description: eachPropertyForSale.description_,
                snapshot: eachPropertyForSale.snapshot_,
                actual_value: eachPropertyForSale.actualvalue,
                visuals_id: eachPropertyForSale.visualsid,
                name: eachPropertyForSale.location_name,
                when_created: eachPropertyForSale.whencreated,
                created_by: eachPropertyForSale.createdby
            }
        }
    )),
    setPropertyForRent: (state, returnedPropertyForRent) => (state.propertyForRent = returnedPropertyForRent
        .map(eachPropertyForRent => {
            return {
                property_id: eachPropertyForRent.propertyid_,
                description: eachPropertyForRent.description_,
                snapshot: eachPropertyForRent.snapshot_,
                actual_value: eachPropertyForRent.rental_value,
                visuals_id: eachPropertyForRent.visualsid,
                name: eachPropertyForRent.location_name,
                when_created: eachPropertyForRent.whencreated,
                created_by: eachPropertyForRent.createdby
            }
        }
    )),
    setSinglePropertyVisuals: (state, returnedSinglePropertyVisuals) => (state.singlePropertyVisuals = returnedSinglePropertyVisuals),
    setSinglePropertyNearbyLandmarkVisuals: (state, returnedSinglePropertyLandmarkVisuals) => (state.singlePropertyNearbyLandmarkVisuals = returnedSinglePropertyLandmarkVisuals),
    setSinglePropertyNeighborhoodVisuals: (state, returnedSinglePropertyNeighborhoodVisuals) => (state.singleNeighborhoodVisuals = returnedSinglePropertyNeighborhoodVisuals),
    setLatestPropertyVisuals: (state, returnedLatestProperties) => (state.latestProperties = returnedLatestProperties),
    setSinglePropertyValue: (state, returnedSinglePropertyValue) => (state.propertyValue = returnedSinglePropertyValue),
    setSingleRentalValue: (state, returnedSingleRentalValue) => (state.rentalValue = returnedSingleRentalValue),
    setSinglePropertyPriceHistory: (state, returnedSinglePropertyPriceHistories) => (state.propertyPriceHistory = returnedSinglePropertyPriceHistories
        .map(priceHistory => {
            return {
                property_id: priceHistory.property_id,
                event: priceHistory.event,
                price: priceHistory.price,
                when_created: formatDate(priceHistory.when_created)
            }
        }
    )),
    setCurrentPropertyFeatures: (state, propertySelectedFeatures) => (state.currentPropertyFeatures = propertySelectedFeatures
        .map(eachFeature => {return {name: eachFeature.name}})),
    setSearchKey: (state, searchKeyword) => state.searchKeyword = searchKeyword,
    setSearchedPropertyResult: (state, returnedResults) => state.searchedResults = returnedResults.map(eachResult => {
        return {
            property_id: eachResult.property_id_,
            snapshot: eachResult.property_visual,
            actual_value: eachResult.actual_value_,
            name: eachResult.location_name,
            when_created: eachResult.when_created_,
            created_by: eachResult.created_by_
        }
        // description: eachPropertyForRent.description_,
    })
}

export default {
    state,
    getters,
    actions,
    mutations
}
