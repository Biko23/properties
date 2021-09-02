import PropertyLocationService from '@/service/propertyLocation';
import PropertyValueService from '@/service/propertyValue';
import PropertyRentalValueService from '@/service/propertyRentalValue';
import CurrencyService from '@/service/currencies'
import PropertyNearbyLandmarkService from '@/service/propertyNearbyLandmark';
import NeighborhoodVisualsService from '@/service/neighborhoodVisuals';
import PropertyVisualsService from '@/service/propertyVisuals';
import PropertyService from '@/service/property/property';
import PropertyCategoryService from '@/service/property/propertyCategories';
import PropertyTypeService from '@/service/property/propertyListedAs';
import PropertyFeatureService from '@/service/propertyFeatures';
import PropertyLandmarkTypeService from '@/service/propertyLandmarkTypes';
import FeatureTypeLookupService from '@/service/property/featureTypeLookup';
import { formatDate } from '@/helpers/helpers';

const state = {
    // propertyCategory: [], //actual types ie Sale, Rent
    rentCategory: [],
    saleCategory: [],
    propertyTypes: [], // types like Apartments, Flat, Land
    propertyFeatures: [],
    propertyLandmarkTypes: [],
    propertySubmissionState: 0, // check whether to submit to the property_rental_value or property_value
    propertyFirstPageData: null,
    propertySecondPageData: null,
    propertyThirdPageData: null,
    createdProperty: {},
    currentUserListedPropertyVisuals: [],
    currentUserUnlistedPropertyVisuals: [],
    currentUserUncertifiedPropertyVisuals: [],
    currencies: []
}

const getters = {
    rentPropertyCategory: (state) => state.rentCategory,
    salePropertyCategory: state => state.saleCategory,
    allPropertyTypes: (state) => state.propertyTypes,
    allCurrencies: (state) => state.currencies,
    allPropertyFeatures: (state) => state.propertyFeatures,
    allPropertyLandmarkTypes: (state) => state.propertyLandmarkTypes,
    allPropertyFirstPageData: (state) => state.propertyFirstPageData,
    allPropertySecondPageData: (state) => state.propertySecondPageData,
    allPropertyThirdPageData: (state) => state.propertyThirdPageData,
    newCreatedProperty: (state) => state.createdProperty,
    registeredPropertySubmissionState: (state) => state.propertySubmissionState,
    // current user getters
    allCurrentUserListedPropertyVisuals: (state) => state.currentUserListedPropertyVisuals,
    allCurrentUserUnlistedPropertyVisuals: (state) => state.currentUserUnlistedPropertyVisuals,
    allCurrentUserUncertifiedPropertyVisuals: (state) => state.currentUserUncertifiedPropertyVisuals
};

const actions = {
    async fetchPropertyCategories({ commit }) { // Sale, Rent
        try {
            const response = await PropertyTypeService.getPropertyListingTypes();
            commit('setRentPropertyCategory', response.data.result);
            commit('setSalePropertyCategory', response.data.result);
        } catch (error) {
            console.log(error);
        }
    },
    async fetchPropertyTypes({ commit }) { // Apartments, Houses, land, Banglow,  many more
        try {
            const response = await PropertyCategoryService.getPropertyCategory();
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
            await commit('setPropertySubmissionState', 1); // determine value table
            const newProperty = {
                isListedForId: state.saleCategory[0].id,
                property_type_id:propertyDataOne.type,
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
    // First page logic to register property for rent
    async addPropertyForRentDataFromPageOne({ commit, rootState, state }, rentPropertyDataOne) {
        try {
            await commit('setPropertyRegisterFirstData', rentPropertyDataOne);
            await commit('setPropertySubmissionState', 2); // determine value table
            const newProperty = {
                isListedForId: state.rentCategory[0].id, 
                property_type_id: rentPropertyDataOne.type,
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
    // End first property rent
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
                property_id: state.createdProperty.property_id
                // created_by: rootState.AuthModule.currentUser.username,
                // updated_by: rootState.AuthModule.currentUser.username
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
                currency_id: state.propertySecondPageData.currency_id,
                created_by: rootState.AuthModule.currentUser.username,
                updated_by: rootState.AuthModule.currentUser.username
            }

            const propertyRentalValue = {
                rental_value_amt: state.propertySecondPageData.expected_value,
                property_id: state.createdProperty.property_id,
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
            await FeatureTypeLookupService.postAPropertyFeatures(selectedPropertyFeatures);
            await PropertyNearbyLandmarkService.postAPropertyNearbyLandmark(nearbyLandmarkVisuals);
            await NeighborhoodVisualsService.postNeighborhoodVisuals(neighborhoodVisuals);
            await PropertyVisualsService.postPropertyVisuals(propertyVisuals);
            // Check to either submit to the property_value or property_rental_value
            let propertyValueResponse = null;

            if(state.propertySubmissionState == 1){
                propertyValueResponse = await PropertyValueService.postAPropertyValue(propertyValue);
            } else if(state.propertySubmissionState == 2) {
               propertyValueResponse = await PropertyRentalValueService.postPropertyRentalValue(propertyRentalValue);
            }  

            if (propertyValueResponse.status === 200 || propertyValueResponse.status === 201) {
                return propertyValueResponse;
            }
        } catch (error) {
            // this.$swal('ooh!','Unable to finish!','error');
            throw new Error('Failed to fully create a property');
        }
    },
    async getListedPropertyVisualsByUsername({ commit, rootState }) {
        try {
            let username = rootState.AuthModule.currentUser.username;
            const response = await PropertyVisualsService.getListedPropertyVisualsByUsername(username);
            commit('setCurrentUserListedPropertyVisuals', response.data.result);
        } catch (error) {
            throw new Error(error);
        }
    },
    async getUnlistedPropertyVisualsByUsername({ commit, rootState }) {
        try {
            let username = rootState.AuthModule.currentUser.username;
            const response = await PropertyVisualsService.getUnlistedPropertyVisualsByUsername(username);
            commit('setCurrentUserUnlistedPropertyVisuals', response.data.result);
        } catch (error) {
            throw new Error(error);
        }
    },
    async getUncertifiedPropertyVisualsByUsername({ commit, rootState }) {
        try {
            let username = rootState.AuthModule.currentUser.username;
            const response = await PropertyVisualsService.getUncertifiedPropertyVisualsByUsername(username);
            commit('setCurrentUserUncertifiedPropertyVisuals', response.data.result);
        } catch (error) {
            throw new Error(error);
        }
    },
    async updatePropertyVisualAvailabilityStatus({ commit }, property_id) {
        try {
            const response = await PropertyVisualsService.updatePropertyVisualAvailabilityStatus(property_id);
            if (response.visualsResponse.status === 200) {
                commit('updatePropertyVisualsList', property_id);
            }
        } catch (error) {
            throw new Error(error);
        }
    },
    async updatePropertyVisualNotAvailabilityStatus({ commit }, property_id) {
        try {
            const response = await PropertyVisualsService.updatePropertyVisualAvailabilityStatus(property_id);
            if (response.visualsResponse.status === 200) {
                commit('updatePropertyVisualsUnlist', property_id);
            }
        } catch (error) {
            throw new Error(error);
        }
    }
}

// mutations
const mutations = {
    setRentPropertyCategory: (state, rentPropertyCategory) => (state.rentCategory = rentPropertyCategory
        .filter(rentCategory => rentCategory.name === ("Rent" || "rent" || "RENT"))),
    setSalePropertyCategory: (state, salePropertyCategory) => (state.saleCategory = salePropertyCategory
        .filter(saleCategory => saleCategory.name === ("Sale" || "sale" || "SALE"))),
    setPropertyTypes: (state, propertyTypes) => (state.propertyTypes = propertyTypes
        .map(propertyType => {
            return {
                value: propertyType.property_type_id,
                text: propertyType.property_type
            }
        })),
    setCurrencies: (state, currencies) => (state.currencies = currencies
        .map(currencies => {
            return {
                value: currencies.currency_id,
                text: currencies.currency_code
            }
        }))
    ,
    setPropertyFeatures: (state, propertyFeatures) => (state.propertyFeatures = propertyFeatures
        .map(propertyFeature => {
            return {
                value: propertyFeature.features_id,
                text: propertyFeature.feature
            }
        })),
    setPropertyLandkmarkTypes: (state, propertyLandmarkTypes) => (state.propertyLandmarkTypes = propertyLandmarkTypes
        .map(propertyLandmarkType => {
            return {
                value: propertyLandmarkType.landmark_type_id,
                text: propertyLandmarkType.landmark_type
            }
        })),
    setPropertyRegisterFirstData: (state, propertyDataOne) => (state.propertyFirstPageData = propertyDataOne),
    setPropertyRegisterTwoData: (state, propertyDataTwo) => (state.propertySecondPageData = propertyDataTwo),
    setPropertyRegisterThreeData: (state, propertyDataThree) => (state.propertyThirdPageData = propertyDataThree),
    setCreatedProperty: (state, returnedProperty) => (state.createdProperty = returnedProperty),
    setCurrentUserListedPropertyVisuals: (state, returnedCurrentUserListedProperties) => (state.currentUserListedPropertyVisuals = returnedCurrentUserListedProperties
        .map(currentProperty => {
            return {
                property_id: currentProperty.property_id,
                description: currentProperty.description,
                created_by: currentProperty.created_by,
                when_created: formatDate(currentProperty.when_created)
            }
        })),
    setCurrentUserUnlistedPropertyVisuals: (state, returnedCurrentUserUnlistedProperties) => (state.currentUserUnlistedPropertyVisuals = returnedCurrentUserUnlistedProperties
        .map(currentProperty => {
            return {
                property_id: currentProperty.property_id,
                description: currentProperty.description,
                created_by: currentProperty.created_by,
                when_created: formatDate(currentProperty.when_created)
            }
        })),
    setCurrentUserUncertifiedPropertyVisuals: (state, returnedCurrentUserUncertifiedProperties) => (state.currentUserUncertifiedPropertyVisuals = returnedCurrentUserUncertifiedProperties
        .map(currentProperty => {
            return {
                property_id: currentProperty.property_id,
                description: currentProperty.description,
                created_by: currentProperty.created_by,
                when_created: formatDate(currentProperty.when_created)
            }
        })),
    updatePropertyVisualsList: (state, property_id) => state.currentUserListedPropertyVisuals = state.currentUserListedPropertyVisuals.filter(currentUserListedPropertyVisual => currentUserListedPropertyVisual.property_id !== property_id),
    updatePropertyVisualsUnlist: (state, property_id) => state.currentUserUnlistedPropertyVisuals = state.currentUserUnlistedPropertyVisuals.filter(currentUserUnlistedPropertyVisual => currentUserUnlistedPropertyVisual.property_id !== property_id),
    setPropertySubmissionState: (state, submissionState) => state.propertySubmissionState = submissionState
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