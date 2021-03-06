/**
 * @author Isaac Ssemugenyi
 * @copyright flyhub Uganda Ltd
*/
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
import PropertyLegalProtectionService from '@/service/propertyLegalProtection';
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
    currentUserListedProperties: [],
    currentUserUnlistedProperties: [],
    currentUserUncertifiedProperties: [],
    currentUserListedRentals: [],
    currentUserUnlistedRentals: [],
    currentUserUncertifiedRentals: [],
    currencies: [],
    propertyLegalProtection: {},
    currentPropertyDetails: {},
    // districts
    districts: [],
    divisions: [],
    suburbs: [],
    currentLocation: {}
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
    allCurrentUserListedProperties: (state) => state.currentUserListedProperties,
    allCurrentUserUnlistedProperties: (state) => state.currentUserUnlistedProperties,
    allCurrentUserUncertifiedProperties: (state) => state.currentUserUncertifiedProperties,
    allCurrentUserListedRentals: state => state.currentUserListedRentals,
    allCurrentUserUnlistedRentals: state => state.currentUserUnlistedRentals,
    allCurrentUserUncertifiedRentals: state => state.currentUserUncertifiedRentals,
    currentPropertyLegalProtection: state => state.propertyLegalProtection,
    currentPropertyDetails: state => state.currentPropertyDetails,
    // districts
    allDistricts: state => state.districts,
    allDivisions: state => state.divisions,
    allSuburbs: state => state.suburbs,
    currentPropertyLocation: state => state.currentLocation
};

const actions = {
    async fetchPropertyCategories({ commit }) { // Sale, Rent
        try {
            const response = await PropertyTypeService.getPropertyListingTypes();
            commit('setRentPropertyCategory', response.data.result);
            commit('setSalePropertyCategory', response.data.result);
            return response;
        } catch (error) {
            throw new Error(error.message);
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
            return response;
        } catch (error) {
            console.log(error);
        }
    },
    async fetchPropertyFeatures({ commit }) {
        try {
            const response = await PropertyFeatureService.getAllPropertyFeatures();
            commit('setPropertyFeatures', response.data.result);
            return response;
        } catch (error) {
            throw new Error(error.message);
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
                description: propertyDataOne.propertyDescription,
                created_by: rootState.AuthModule.currentUser.username,
                updated_by: rootState.AuthModule.currentUser.username
            }
            const response = await PropertyService.postAProperty(newProperty);
            commit('setCreatedProperty', response.data.result);
            return response;
        } catch (error) {
            throw new Error(error.message)
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
                description: rentPropertyDataOne.propertyDescription,
                created_by: rootState.AuthModule.currentUser.username,
                updated_by: rootState.AuthModule.currentUser.username
            }
            const response = await PropertyService.postAProperty(newProperty);
            commit('setCreatedProperty', response.data.result);
            return response;
        } catch (error) {
            throw new Error('Failed to save property details')
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
                property_id: state.createdProperty.property_id,
                district_id: state.propertyFirstPageData.district_id,
                division_id: state.propertyFirstPageData.division_id,
                suburb_id: state.propertyFirstPageData.suburb_id,
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
                currency_id: state.propertySecondPageData.currency_id,
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

            const locationResponse = await PropertyLocationService.postAPropertyLocation(propertyLocation);
            const featureTypeResponse = await FeatureTypeLookupService.postAPropertyFeatures(selectedPropertyFeatures);
            const nearbyLandmarkResponse = await PropertyNearbyLandmarkService.postAPropertyNearbyLandmark(nearbyLandmarkVisuals);
            const neighborhoodVisualsResponse = await NeighborhoodVisualsService.postNeighborhoodVisuals(neighborhoodVisuals);
            const propertyVisualsResponse = await PropertyVisualsService.postPropertyVisuals(propertyVisuals);
            // Check to either submit to the property_value or property_rental_value
            let propertyValueResponse = null;

            if(state.propertySubmissionState == 1){
                propertyValueResponse = await PropertyValueService.postAPropertyValue(propertyValue);
            } else if(state.propertySubmissionState == 2) {
               propertyValueResponse = await PropertyRentalValueService.postPropertyRentalValue(propertyRentalValue);
            }  
                
            return {
                value: propertyValueResponse,
                location: locationResponse,
                feature: featureTypeResponse,
                landmark: nearbyLandmarkResponse,
                neighborhood: neighborhoodVisualsResponse,
                propertyVisuals: propertyVisualsResponse
            };
        } catch (error) {
            console.log(error);
        }
    },
    // ============= properties
    async getListedPropertiesByUsername({ commit, rootState }) {
        try {
            let username = rootState.AuthModule.currentUser.username;
            const response = await PropertyService.getListedPropertiesByUsername(username);
            if(response.data.status == 1){
                commit('setCurrentUserListedProperties', response.data.result);
            }
            return response;
        } catch (error) {
            throw new Error(error.message);
        }
    },
    async getUnlistedPropertiesByUsername({ commit, rootState }) {
        try {
            let username = rootState.AuthModule.currentUser.username;
            const response = await PropertyService.getUnlistedPropertiesByUsername(username);
            if(response.data.status == 1){
                commit('setCurrentUserUnlistedProperties', response.data.result);
            }
            return response;
        } catch (error) {
            throw new Error(error.message);
        }
    },
    async getUncertifiedPropertiesByUsername({ commit, rootState }) {
        try {
            let username = rootState.AuthModule.currentUser.username;
            const response = await PropertyService.getUncertifiedPropertiesByUsername(username);
            if(response.data.status == 1){
                commit('setCurrentUserUncertifiedProperties', response.data.result);
            }
            return response;
        } catch (error) {
            throw new Error(error.message);
        }
    },
    async unlistPropertyFromMarketPlace({ commit }, property_id) {
        try {
            const response = await PropertyService.unlistPropertyFromMarketPlace(property_id);
            if (response.data.status === 1) {
                commit('updatePropertiesList', property_id);
            }
            return response;
        } catch (error) {
            throw new Error(error.message);
        }
    },
    async requestToListPropertyBackOnMarketPlace({ commit }, property_id) {
        try {
            const response = await PropertyService.requestToListPropertyBackOnMarketPlace(property_id);
            if (response.data.status === 1) {
                commit('updatePropertiesUnlist', property_id);
            }
            return response;
        } catch (error) {
            throw new Error(error.message);
        }
    },
    // ----------------end properties
    //  ----------------- rentals
    async unlistRentalFromMarketPlace({ commit }, property_id) {
        try {
            const response = await PropertyService.unlistPropertyFromMarketPlace(property_id);
            if (response.data.status === 1) {
                commit('updateRentalsList', property_id);
            }
            return response;
        } catch (error) {
            throw new Error(error.message);
        }
    },
    async requestToListRentalBackOnMarketPlace({ commit }, property_id) {
        try {
            const response = await PropertyService.requestToListPropertyBackOnMarketPlace(property_id);
            if (response.data.status === 1) {
                commit('updateRentalsUnlist', property_id);
            }
            return response;
        } catch (error) {
            throw new Error(error.message);
        }
    },
    async getListedRentalsByUsername({ commit, rootState }) {
        try {
            let username = rootState.AuthModule.currentUser.username;
            const response = await PropertyService.getListedRentalsByUsername(username);
            if(response.data.status == 1){
                commit('setCurrentUserListedRentals', response.data.result);
            }
            return response;
        } catch (error) {
            throw new Error(error.message);
        }
    },
    async getUnlistedRentalsByUsername({ commit, rootState }) {
        try {
            let username = rootState.AuthModule.currentUser.username;
            const response = await PropertyService.getUnlistedRentalsByUsername(username);
            if(response.data.status == 1){
                commit('setCurrentUserUnlistedRentals', response.data.result);
            }
            return response;
        } catch (error) {
            throw new Error(error.message);
        }
    },
    async getUncertifiedRentalsByUsername({ commit, rootState }) {
        try {
            let username = rootState.AuthModule.currentUser.username;
            const response = await PropertyService.getUncertifiedRentalsByUsername(username);
            if(response.data.status == 1){
                commit('setCurrentUserUncertifiedRentals', response.data.result);
            }
            return response;
        } catch (error) {
            throw new Error(error.message);
        }
    },
    // =============== end rental
    async getPropertyLegalProtection({ commit }, property_id){
        try {
            const response = await PropertyLegalProtectionService.getPropertyLegalProtectionByPropertyId(property_id);
            if(response.data.status === 1){
                commit('setPropertyLegalProtection', response.data.result);
            }
            return response;
        } catch (error) {
            throw new Error(error.message); 
        }
    },
    async postAPropertyLegalProtection(_, legalDetails){
        try {
            const response = await PropertyLegalProtectionService.postAPropertyLegalProtection(legalDetails);
            return response;
        } catch (error) {
            throw new Error(error.message); 
        }
    },
    async updateAPropertyLegalProtection(_, legalDetails){
        try {
            const response = await PropertyLegalProtectionService.updateAPropertyLegalProtection(legalDetails);
            return response;
        } catch (error) {
            throw new Error(error.message); 
        }
    },
    async clearPropertyLegalDetails({ commit }){
        try {
            commit('setPropertyLegalProtection', {});
        } catch (error) {
            throw new Error(error.message);
        }
    },
    async deleteAPropertyFeature(_, feature_type_lk_id){
        try {
            const response = await FeatureTypeLookupService.deleteAPropertyFeature(feature_type_lk_id);
            return response;
        } catch (error) {
            throw new Error(error.message);
        }
    },
    async addMoreFeaturesToAProperty(_, selectedDetails){
        try {
            const selectedPropertyFeatures = {
                propertyFeatures: selectedDetails.features,
                property_id: selectedDetails.property_id
            }
            const response = await FeatureTypeLookupService.postAPropertyFeatures(selectedPropertyFeatures);
            return response;
        } catch (error) {
            throw new Error(error.message);
        }
    },
    async fetchCurrentPropertyDetails({ commit }, property_id) {
        try {
            const response = await PropertyService.getPropertyById(property_id);
            commit('setCurrentPropertyDetails', response.data.result);
            return response;
        } catch (error) {
            throw new Error(error.message);
        }
    },
    // ------------ Handle property visual
    async updatedPropertyVisual(_, propertyDetails){
        try {
            const response = await PropertyVisualsService.updateAPropertyVisual(propertyDetails);
            return response;
        } catch (error) {
            throw new Error(error.message);
        }
    },
    async createSinglePropertyVisual(_, propertyDetails){
        try {
            const response = await PropertyVisualsService.postPropertyVisuals(propertyDetails);
            return response;
        } catch (error) {
            throw new Error(error.message);
        }
    },
    // -------------- Handle landmark visual
    async updatedLandmarkVisual(_, landmarkDetails){
        try {
            const response = await PropertyNearbyLandmarkService.updateAPropertyNearbyLandmark(landmarkDetails);
            return response;
        } catch (error) {
            throw new Error(error.message);
        }
    },
    async createSingleLandmarkVisual(_, landmarkDetails){
        try {
            const response = await PropertyNearbyLandmarkService.postAPropertyNearbyLandmark(landmarkDetails);
            return response;
        } catch (error) {
            throw new Error(error.message);
        }
    },
    // ------- Handle neighborhood visual
    async updatedNeighborhoodVisual(_, neighborhoodDetails){
        try {
            const response = await NeighborhoodVisualsService.updateAProperty(neighborhoodDetails);
            return response;
        } catch (error) {
            throw new Error(error.message);
        }
    },
    async createSingleNeighborhoodVisual(_, neighborhoodDetails){
        try {
            const response = await NeighborhoodVisualsService.postNeighborhoodVisuals(neighborhoodDetails);
            return response;
        } catch (error) {
            throw new Error(error.message);
        }
    },
    // ============================ districts
    async fetchAllDistricts ({ commit }){
        try {
            const response = await PropertyLocationService.getAllDistricts();
            if(response.data.status == 1){
                commit('setAllDistricts', response.data.result);
            }
            return response;
        } catch (error) {
            throw new Error(error.message);
        }
    },
    async fetchDivisionsByDistrictId({ commit }, district_id){
        try {
            const response = await PropertyLocationService.getDivisionsByDistrictId(district_id);
            if(response.data.status ==1){
                commit('setSelectedDivisions', response.data.result);
            }
            return response;
        } catch (error) {
            throw new Error(error.message);
        }
    },
    async fetchSuburbsByDistrictId({ commit }, division_id){
        try {
            const response = await PropertyLocationService.getSuburbsByDivisionId (division_id);
            if(response.data.status == 1){
                commit('setSelectedSuburbs', response.data.result);
            }
            return response;
        } catch (error) {
            throw new Error(error.message); 
        }
    },
    async fetchPropertyLocationByPropertyId({ commit }, property_id){
        try {
            const response = await PropertyLocationService.getAPropertyLocationByPropertyId(property_id);
            if(response.data.status == 1){
                commit('setCurrentPropertyLocation', response.data.result);
            }
            return response;
        } catch (error) {
            throw new Error(error.message);
        }
    },
    async updateCurrentPropertyLocation(_, propertyLocation){
        try {
            const response = await PropertyLocationService.updateAPropertyLocation(propertyLocation);
            return response;
        } catch (error) {
            throw new Error(error.message);
        }
    },
    async getAllDivisions ({ commit }){
        try {
            const response = await PropertyLocationService.getAllDivisions();
            if(response.data.status == 1){
                commit('setSelectedDivisions', response.data.result);
            }
            return response;
        } catch (error) {
            throw new Error(error.message);
        }
    },
    async getAllSuburbs ({ commit }){
        try {
            const response = await PropertyLocationService.getAllSuburbs();
            if(response.data.status == 1){
                commit('setSelectedSuburbs', response.data.result);
            }
            return response;
        } catch (error) {
            throw new Error(error.message);
        }
    }
    // ==========================================
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
    setPropertyFeatures: (state, propertyFeatures) => (state.propertyFeatures = propertyFeatures),
        // .map(propertyFeature => {
        //     return {
        //         id: propertyFeature.features_id,
        //         name: propertyFeature.feature
        //     }
        // })),
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
    setCurrentUserListedProperties: (state, returnedCurrentUserListedProperties) => (state.currentUserListedProperties = returnedCurrentUserListedProperties
        .map(currentProperty => {
            return {
                property_id: currentProperty.propertyid_,
                code: currentProperty.property_number_,
                type: currentProperty.is_listed_for_name,
                category: currentProperty.property_type_,
                cost: currentProperty.actual_value_,
                description: currentProperty.property_description,
                location: `${currentProperty.suburb} - ${currentProperty.division}`,
                created_by: currentProperty.listed_by,
                creator_name: currentProperty.listed_by_name,
                snapshot: currentProperty.snapshot_,
                when_created: formatDate(currentProperty.when_listed)
            }
        })),
    setCurrentUserUnlistedProperties: (state, returnedCurrentUserUnlistedProperties) => (state.currentUserUnlistedProperties = returnedCurrentUserUnlistedProperties
        .map(currentProperty => {
            return {
                property_id: currentProperty.propertyid_,
                code: currentProperty.property_number_,
                type: currentProperty.is_listed_for_name,
                category: currentProperty.property_type_,
                cost: currentProperty.actual_value_,
                description: currentProperty.property_description,
                location: `${currentProperty.suburb} - ${currentProperty.division}`,
                created_by: currentProperty.listed_by,
                creator_name: currentProperty.listed_by_name,
                snapshot: currentProperty.snapshot_,
                when_created: formatDate(currentProperty.when_listed)
            }
        })),
    setCurrentUserUncertifiedProperties: (state, returnedCurrentUserUncertifiedProperties) => (state.currentUserUncertifiedProperties = returnedCurrentUserUncertifiedProperties
        .map(currentProperty => {
            return {
                property_id: currentProperty.propertyid_,
                code: currentProperty.property_number_,
                type: currentProperty.is_listed_for_name,
                category: currentProperty.property_type_,
                cost: currentProperty.actual_value_,
                description: currentProperty.property_description,
                location: `${currentProperty.suburb} - ${currentProperty.division}`,
                created_by: currentProperty.listed_by,
                creator_name: currentProperty.listed_by_name,
                snapshot: currentProperty.snapshot_,
                when_created: formatDate(currentProperty.when_listed)
            }
        })),
    updatePropertiesList: (state, property_id) => state.currentUserListedProperties = state.currentUserListedProperties.filter(currentUserListedProperty => currentUserListedProperty.property_id !== property_id),
    updatePropertiesUnlist: (state, property_id) => state.currentUserUnlistedProperties = state.currentUserUnlistedProperties.filter(currentUserUnlistedProperty => currentUserUnlistedProperty.property_id !== property_id),
    setCurrentUserListedRentals: (state, returnedCurrentUserListedRentals) => (state.currentUserListedRentals = returnedCurrentUserListedRentals
        .map(currentRental => {
            return {
                property_id: currentRental.propertyid_,
                code: currentRental.property_number_,
                type: currentRental.is_listed_for_name,
                category: currentRental.property_type_,
                cost: currentRental.rental_value,
                description: currentRental.property_description,
                location: `${currentRental.suburb} - ${currentRental.division}`,
                created_by: currentRental.listed_by,
                creator_name: currentRental.listed_by_name,
                snapshot: currentRental.snapshot_,
                when_created: formatDate(currentRental.when_listed)
            }
        })),
    setCurrentUserUnlistedRentals: (state, returnedCurrentUserUnlistedRentals) => (state.currentUserUnlistedRentals = returnedCurrentUserUnlistedRentals
        .map(currentRental => {
            return {
                property_id: currentRental.propertyid_,
                code: currentRental.property_number_,
                type: currentRental.is_listed_for_name,
                category: currentRental.property_type_,
                cost: currentRental.rental_value,
                description: currentRental.property_description,
                location: `${currentRental.suburb} - ${currentRental.division}`,
                created_by: currentRental.listed_by,
                creator_name: currentRental.listed_by_name,
                snapshot: currentRental.snapshot_,
                when_created: formatDate(currentRental.when_listed)
            }
        })),
    setCurrentUserUncertifiedRentals: (state, returnedCurrentUserUncertifiedRentals) => (state.currentUserUncertifiedRentals = returnedCurrentUserUncertifiedRentals
        .map(currentRental => {
            return {
                property_id: currentRental.propertyid_,
                code: currentRental.property_number_,
                type: currentRental.is_listed_for_name,
                category: currentRental.property_type_,
                cost: currentRental.rental_value,
                description: currentRental.property_description,
                location: `${currentRental.suburb} - ${currentRental.division}`,
                created_by: currentRental.listed_by,
                creator_name: currentRental.listed_by_name,
                snapshot: currentRental.snapshot_,
                when_created: formatDate(currentRental.when_listed)
            }
        })),
    updateRentalsList: (state, property_id) => state.currentUserListedRentals = state.currentUserListedRentals.filter(currentUserListedRental => currentUserListedRental.property_id !== property_id),
    updateRentalsUnlist: (state, property_id) => state.currentUserUnlistedRentals = state.currentUserUnlistedRentals.filter(currentUserUnlistedRental => currentUserUnlistedRental.property_id !== property_id),   
    setPropertySubmissionState: (state, submissionState) => state.propertySubmissionState = submissionState,
    setPropertyLegalProtection: (state, legalProtection) => state.propertyLegalProtection = legalProtection,
    setCurrentPropertyDetails: (state, propertydetails) => state.currentPropertyDetails = propertydetails,
    // ======================== Districts
    setAllDistricts: (state, allDistricts) => state.districts = allDistricts,
    setSelectedDivisions: (state, returnedDivisions) => state.divisions = returnedDivisions,
    setSelectedSuburbs: (state, returnedSuburbs) => state.suburbs = returnedSuburbs,
    setCurrentPropertyLocation: (state, currentPropertyLocation) => state.currentLocation = currentPropertyLocation
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