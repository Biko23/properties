import PropertyLocationService from '@/service/propertyLocation';
import PropertyValueService from '@/service/propertyValue';
import CurrencyService from '@/service/currencies'
import PropertyNearbyLandmarkService from '@/service/propertyNearbyLandmark';
import NeighborhoodVisualsService from '@/service/neighborhoodVisuals';
import PropertyVisualsService from '@/service/propertyVisuals';
import PropertyService from '@/service/property/property';
import PropertyTypeService from '@/service/property/propertyListedAs';
import PropertyFeatureService from '@/service/propertyFeatures';
import PropertyLandmarkTypeService from '@/service/propertyLandmarkTypes';
import { formatDate } from '@/helpers/helpers';

const state = {
    propertyTypes: [],
    propertyFeatures: [],
    propertyLandmarkTypes: [],
    propertyFirstPageData: null,
    propertySecondPageData: null,
    propertyThirdPageData: null,
    createdProperty: {},
    currentUserListedPropertyVisuals: [],
    currentUserUnlistedPropertyVisuals: [],
    currentUserUncertifiedPropertyVisuals: [],
    currencies:[]
}

const getters = {
    allPropertyTypes: (state) => state.propertyTypes,
    allCurrencies:(state) => state.currencies,
    allPropertyFeatures: (state) => state.propertyFeatures,
    allPropertyLandmarkTypes: (state) => state.propertyLandmarkTypes,
    allPropertyFirstPageData: (state) => state.propertyFirstPageData,
    allPropertySecondPageData: (state) => state.propertySecondPageData,
    allPropertyThirdPageData: (state) => state.propertyThirdPageData,
    newCreatedProperty: (state) => state.createdProperty,

    // current user getters
    allCurrentUserListedPropertyVisuals: (state) => state.currentUserListedPropertyVisuals,
    allCurrentUserUnlistedPropertyVisuals: (state) => state.currentUserUnlistedPropertyVisuals,
    allCurrentUserUncertifiedPropertyVisuals: (state) => state.currentUserUncertifiedPropertyVisuals
};

const actions = {
    async fetchPropertyTypes({ commit }) {
        try {
            const response = await PropertyTypeService.getPropertyListingTypes();
            commit('setPropertyTypes', response.data.result);
        } catch (error) {
            console.log(error);
        }
    },
    async fetchCurrencies({ commit }) {
        try {
            const response = await CurrencyService.getCurrencies();
            commit('setCurrencies', response.data.result);
        } catch (error) {
            console.log(error);
        }
    },
    async fetchPropertyFeatures({ commit }) {
        try {
            const response = await PropertyFeatureService.getAllPropertyFeatures();
            commit('setPropertyFeatures', response.data.result);
        } catch (error) {
            console.log(error);
        }
    },
    async fetchPropertyLandmarkTypes({ commit }) {
        try {
            const response = await PropertyLandmarkTypeService.getAllPropertyLandmarkTypes();
            commit('setPropertyLandkmarkTypes', response.data.result);
        } catch (error) {
            console.log(error);
        }
    },
    async addPropertyDataFromPageOne({ commit, rootState }, propertyDataOne) {
            try {
            await commit('setPropertyRegisterFirstData', propertyDataOne);
            const newProperty = {
                isListedForId: propertyDataOne.type,
                created_by: rootState.AuthModule.currentUser.username,
                updated_by: rootState.AuthModule.currentUser.username
            }
            const response = await PropertyService.postAProperty(newProperty);
            commit('setCreatedProperty', response.data.result);
        } catch (error) {
            console.log(error);
            // throw new Error('Failed to save property details')
        }
    },
    addPropertyDataFromPageTwo({ commit }, propertyDataTwo) {
        commit('setPropertyRegisterTwoData', propertyDataTwo);
    },
    addPropertyDataFromPageThird({ commit }, propertyDataFinal) {
        commit('setPropertyRegisterThreeData', propertyDataFinal);
    },
    async submitAllPropertyData({ state, rootState }) {
        try {
            const propertyLocation = {
                name: state.propertyFirstPageData.location,
                property_id: state.createdProperty.property_id,
                latitude: 19393982,
                longitude: 1959494,
                created_by: rootState.AuthModule.currentUser.username,
                updated_by: rootState.AuthModule.currentUser.username
            }
            const selectedPropertyFeatures = {
                propertyFeatures: state.propertyFirstPageData.features,
                property_id: state.createdProperty.property_id,
                created_by: rootState.AuthModule.currentUser.username,
                updated_by: rootState.AuthModule.currentUser.username
            }
            const propertyVisuals = {
                description: state.propertyFirstPageData.description,
                files: state.propertyFirstPageData.visuals,
                property_id: state.createdProperty.property_id,
                created_by: rootState.AuthModule.currentUser.username,
                updated_by: rootState.AuthModule.currentUser.username
            }

            // console.log('visuals', state.propertyFirstPageData.visuals);
            const propertyValue = {
                actual_value: state.propertySecondPageData.expected_value,
                property_id: state.createdProperty.property_id,
                currency_id:state.propertySecondPageData.currency_id,
                created_by: rootState.AuthModule.currentUser.username,
                updated_by: rootState.AuthModule.currentUser.username
            }

            const neighborhoodVisuals = {
                description: state.propertySecondPageData.description,
                files: state.propertySecondPageData.neighborhoodVisuals,
                property_id: state.createdProperty.property_id,
                created_by: rootState.AuthModule.currentUser.username,
                updated_by: rootState.AuthModule.currentUser.username
            }

            const nearbyLandmarkVisuals = {
                landmark_name: state.propertyThirdPageData.landmark_name,
                distance_from_property: state.propertyThirdPageData.distance_from_property,
                landmark_type_id: state.propertyThirdPageData.landmark_type_id,
                description: state.propertyThirdPageData.description,
                files: state.propertyThirdPageData.landmarkVisuals,
                property_id: state.createdProperty.property_id,
                created_by: rootState.AuthModule.currentUser.username,
                updated_by: rootState.AuthModule.currentUser.username
            }

            await PropertyLocationService.postAPropertyLocation(propertyLocation);
            await PropertyValueService.postAPropertyValue(propertyValue);
            await PropertyNearbyLandmarkService.postAPropertyNearbyLandmark(nearbyLandmarkVisuals);
            await NeighborhoodVisualsService.postNeighborhoodVisuals(neighborhoodVisuals);
           const propertyVisualResponse = await PropertyVisualsService.postPropertyVisuals(propertyVisuals);
            if(propertyVisualResponse.status === 200 || propertyVisualResponse.status === 201){
                return propertyVisualResponse;
            }
        } catch (error) {
            // this.$swal('ooh!','Unable to finish!','error');
            throw new Error('Failed to fully create a property');
        }
    },
    async getListedPropertyVisualsByUsername({ commit, rootState }){
        try {
            let username = rootState.AuthModule.currentUser.username;
            const response = await PropertyVisualsService.getListedPropertyVisualsByUsername(username);
            commit('setCurrentUserListedPropertyVisuals', response.data.result);
        } catch (error) {
            throw new Error(error);
        }
    },
    async getUnlistedPropertyVisualsByUsername({ commit, rootState }){
        try {
            let username = rootState.AuthModule.currentUser.username;
            const response = await PropertyVisualsService.getUnlistedPropertyVisualsByUsername(username);
            commit('setCurrentUserUnlistedPropertyVisuals', response.data.result);
        } catch (error) {
            throw new Error(error);
        }
    },
    async getUncertifiedPropertyVisualsByUsername({ commit, rootState }){
        try {
            let username = rootState.AuthModule.currentUser.username;
            const response = await PropertyVisualsService.getUncertifiedPropertyVisualsByUsername(username);
            commit('setCurrentUserUncertifiedPropertyVisuals', response.data.result);
        } catch (error) {
            throw new Error(error);
        }
    },
    async updatePropertyVisualAvailabilityStatus({ commit }, property_id){
        try {
            const response = await PropertyVisualsService.updatePropertyVisualAvailabilityStatus(property_id);
            if(response.visualsResponse.status === 200) {
                commit('updatePropertyVisualsList', property_id);
            }
        } catch (error) {
            throw new Error(error);
        }
    },
    async updatePropertyVisualNotAvailabilityStatus({ commit }, property_id){
        try {
            const response = await PropertyVisualsService.updatePropertyVisualAvailabilityStatus(property_id);
            if(response.visualsResponse.status === 200) {
                commit('updatePropertyVisualsUnlist', property_id);
            }
        } catch (error) {
            throw new Error(error);
        }
    }
}

// mutations
const mutations = {
    setPropertyTypes: (state, propertyTypes) => (state.propertyTypes = propertyTypes.map(propertyType => {
        return {
            value: propertyType.id,
            text: propertyType.name
        }
    })),
    setCurrencies : (state,currencies) => (state.currencies = currencies.map(currencies =>{
        return{
            value:currencies.currency_id,
            text:currencies.currency_code
        }
    }))
    ,
    setPropertyFeatures: (state, propertyFeatures) => (state.propertyFeatures = propertyFeatures.map(propertyFeature => {
        return {
            value: propertyFeature.features_id,
            text: propertyFeature.feature
        }
    })),
    setPropertyLandkmarkTypes: (state, propertyLandmarkTypes) => (state.propertyLandmarkTypes = propertyLandmarkTypes.map(propertyLandmarkType => {
        return {
            value: propertyLandmarkType.landmark_type_id,
            text: propertyLandmarkType.landmark_type
        }
    })),
    setPropertyRegisterFirstData: (state, propertyDataOne) => (state.propertyFirstPageData = propertyDataOne),
    setPropertyRegisterTwoData: (state, propertyDataTwo) => (state.propertySecondPageData = propertyDataTwo),
    setPropertyRegisterThreeData: (state, propertyDataThree) => (state.propertyThirdPageData = propertyDataThree),
    setCreatedProperty: (state, returnedProperty) => (state.createdProperty = returnedProperty),
    setCurrentUserListedPropertyVisuals: (state, returnedCurrentUserListedProperties) => (state.currentUserListedPropertyVisuals = returnedCurrentUserListedProperties.map(currentProperty => {
        return {
            property_id: currentProperty.property_id,
            description: currentProperty.description,
            created_by: currentProperty.created_by,
            when_created: formatDate(currentProperty.when_created)
        }
    })),
    setCurrentUserUnlistedPropertyVisuals: (state, returnedCurrentUserUnlistedProperties) => (state.currentUserUnlistedPropertyVisuals = returnedCurrentUserUnlistedProperties.map(currentProperty => {
        return {
            property_id: currentProperty.property_id,
            description: currentProperty.description,
            created_by: currentProperty.created_by,
            when_created: formatDate(currentProperty.when_created)
        }
    })),
    setCurrentUserUncertifiedPropertyVisuals: (state, returnedCurrentUserUncertifiedProperties) => (state.currentUserUncertifiedPropertyVisuals = returnedCurrentUserUncertifiedProperties.map(currentProperty => {
        return {
            property_id: currentProperty.property_id,
            description: currentProperty.description,
            created_by: currentProperty.created_by,
            when_created: formatDate(currentProperty.when_created)
        }
    })),
    updatePropertyVisualsList: (state, property_id) => state.currentUserListedPropertyVisuals = state.currentUserListedPropertyVisuals.filter(currentUserListedPropertyVisual => currentUserListedPropertyVisual.property_id !== property_id),
    updatePropertyVisualsUnlist: (state, property_id) => state.currentUserUnlistedPropertyVisuals = state.currentUserUnlistedPropertyVisuals.filter(currentUserUnlistedPropertyVisual => currentUserUnlistedPropertyVisual.property_id !== property_id)
}

export default {
    state,
    getters,
    actions,
    mutations
}

/**
context : {
    state,      // same as `store.state`, or local state if in modules
    rootState,  // same as `store.state`, only in modules
    commit,     // same as `store.commit`
    dispatch,   // same as `store.dispatch`
    getters,    // same as `store.getters`, or local getters if in modules
    rootGetters // same as `store.getters`, only in modules
  }
  https://vuex.vuejs.org/api/#mutations
*/