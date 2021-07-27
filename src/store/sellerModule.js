import PropertyTypeService from '@/service/property/propertyListedAs';
import PropertyFeatureService from '@/service/propertyFeatures';

const state = {
    propertyTypes: [],
    propertyFeatures: [],
    propertyFirstPageData: null,
    propertySecondPageData: null
}

const getters  = {
    allPropertyTypes: (state) => state.propertyTypes,
    allPropertyFeatures: (state) => state.propertyFeatures,
    allPropertyFirstPageData: (state) => state.propertyFirstPageData,
    allPropertySecondPageData: (state) => state.propertySecondPageData
};

const actions = {
    async fetchPropertyTypes({ commit }){
        try {
            const response = await PropertyTypeService.getPropertyListingTypes();
            commit('setPropertyTypes', response.data.result);
        } catch (error) {
            console.log(error);
        }
    },
    async fetchPropertyFeatures({ commit }){
        try {
            const response = await PropertyFeatureService.getAllPropertyFeatures();
            commit('setPropertyFeatures', response.data.result);
        } catch (error) {
            console.log(error);
        }
    },
    addPropertyDataFromPageOne({ commit }, propertyDataOne){
        commit('setPropertyRegisterFirstData', propertyDataOne);
        console.log('From global state one', propertyDataOne);
    },
    addPropertyDataFromPageTwo({ commit }, propertyDataTwo){
        commit('setPropertyRegisterTwoData', propertyDataTwo);
        console.log('From global state two', propertyDataTwo);
    }
}

const mutations = {
    setPropertyTypes: (state, propertyTypes) => (state.propertyTypes = propertyTypes.map(propertyType => {
        return {
            value: propertyType.id,
            text: propertyType.name
        }
    })),
    setPropertyFeatures: (state, propertyFeatures) => (state.propertyFeatures = propertyFeatures.map(propertyFeature => {
        return {
            value: propertyFeature.features_id,
            text: propertyFeature.feature
        }
    })),
    setPropertyRegisterFirstData: (state, propertyDataOne) => (state.propertyFirstPageData = propertyDataOne),
    setPropertyRegisterSecondData: (state, propertyDataTwo) => (state.propertySecondPageData = propertyDataTwo)
}

export default {
    state,
    getters,
    actions,
    mutations
}