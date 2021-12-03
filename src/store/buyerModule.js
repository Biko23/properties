import PropertyService from '@/service/property/property';
import PropertyVisualsService from '@/service/propertyVisuals';
import PropertyNearbyLandmarkService from '@/service/propertyNearbyLandmark';
import NeighborhoodVisualsService from '@/service/neighborhoodVisuals';
import PropertyValueService from '@/service/propertyValue';
import PropertyCategoryService from '@/service/property/propertyCategories';
import PropertyRentalValueService from '@/service/propertyRentalValue';
import PropertyPriceHistoryService from '@/service/propertyPriceHistories';
import FeatureTypeLookupService from '@/service/property/featureTypeLookup';
import PropertyLocationService from '@/service/propertyLocation';
import PropertyLandmarkTypeService from '@/service/propertyLandmarkTypes';
import ViewedPropertiesService from '@/service/property/viewedProperties';
import FavoritePropertiesService from '@/service/property/favoriteProperties';
import HighValuePropertyService from '@/service/property/highValuePropertyService';
import AcquiredPropertyService from '@/service/property/acquiredPropertiesService';

import { formatDate } from '@/helpers/helpers';

const state = {
    propertyForSale: [],
    propertyForRent: [],
    singlePropertyVisuals: [],
    singlePropertyNearbyLandmarkVisuals: [],
    singleNeighborhoodVisuals: [],
    latestProperties: [],
    latestRentals: [],
    propertyValue: {},
    rentalValue: {},
    propertyPriceHistory: [],
    currentPropertyFeatures: [],
    searchedResults: [],
    searchKeyword: '',
    autocompleteList: [],
    viewedProperty: false,
    recentViewedRentals: [],
    recentViewedSales: [],
    totalFavoriteCount: 0,
    currentUserFavoriteProperties: [],
    detailedCurrentUserFavoriteList: [],
    alreadyInterestedInAProperty: undefined,
    userInterestedProperties: [],
    userInterestedRentals: [],
    userAcquiredProperties: [],
    userAcquiredRentals: []
}

const getters = {
    allPropertyForSale: (state) => state.propertyForSale,
    allPropertyForRent: (state) => state.propertyForRent,
    allSinglePropertyVisuals: (state) => state.singlePropertyVisuals,
    allSinglePropertyNearbyLandmarkVisuals: (state) => state.singlePropertyNearbyLandmarkVisuals,
    allSingleNeighborhoodVisuals: (state) => state.singleNeighborhoodVisuals,
    allLatestProperties: (state) => state.latestProperties,
    allLatestRentals: (state) => state.latestRentals,
    currentPropertyValue: (state) => state.propertyValue,
    currentRentalValue: (state) => state.rentalValue,
    currentPropertyPriceHistory: (state) => state.propertyPriceHistory,
    allCurrentPropertyFeatures: state => state.currentPropertyFeatures,
    currentSearchKeyword: state => state.searchKeyword,
    allSearchedResults: state => state.searchedResults,
    allAutocompletedList: state => state.autocompleteList,
    currentViewedProperty: state => state.viewedProperty,
    allRecentViewedRentals: state => state.recentViewedRentals,
    allRecentViewedProperties: state => state.recentViewedSales,
    currentUserFavoriteTotalCount: state => state.totalFavoriteCount,
    allCurrentUserFavoriteProperties: state => state.currentUserFavoriteProperties,
    allDetailedCurrentFavoriteList: state => state.detailedCurrentUserFavoriteList,
    checkUserInterestInProperty: state => state.alreadyInterestedInAProperty,
    allUserInterestedProperties: state => state.userInterestedProperties,
    allUserInterestedRentals: state => state.userInterestedRentals,
    allUserAcquiredProperties: state => state.userAcquiredProperties,
    allUserAcquiredRentals: state => state.userAcquiredRentals
};

const actions = {
    // fetchPropertyVisuals
    async fetchPropertyForSale({ commit, rootState }) {
        try {
            const is_listed_for_id = rootState.SellerModule.saleCategory[0].id
            const response = await PropertyService.getAllPropertyForSale(is_listed_for_id);
            commit('setPropertyForSale', response.data.result);
            return response;
        } catch (error) {
            console.log(error);
            // throw new Error("Failed on loading current properties")
        }
    },
    async fetchPropertyForRent({ commit, rootState }) {
        try {
            const is_listed_for_id = rootState.SellerModule.rentCategory[0].id
            const response = await PropertyService.getAllPropertyForRent(is_listed_for_id);
            commit('setPropertyForRent', response.data.result);
            return response;
        } catch (error) {
            console.log(error);
            // throw new Error("Failed on loading current properties")
        }
    },
    /**
     *
     * to refactor
     *   */ 

    async fetchLatestListedProperties({ commit }) {
        try {
            const response = await PropertyService.getLatestListedProperties();
            if(response.data.status == 1){
                commit('setLatestListedProperties', response.data.result);
            }
            return response;
        } catch (error) {
            throw new Error(error.message)
        }
    },
    async fetchLatestListedRentals({ commit }){
        try {
            const response = await PropertyService.getLatestListedRentals();
            if(response.data.status == 1){
                commit('setLatestListedRentals', response.data.result);
            }
            return response;
        } catch (error) {
            throw new Error(error.message)
        }
    },
    async fetchSinglePropertyVisuals({ commit }, property_id) {
        try {
            const response = await PropertyVisualsService.getPropertyVisualsByPropertyId(property_id);
            commit("setSinglePropertyVisuals", response.data.result);
            return response;
        } catch (error) {
            console.log(error);
            // throw new Error("Failed on loading current property visuals")
        }
    },
    async fetchPropertyNearbyLandmarkVisuals({ commit }, property_id) {
        try {
            const response = await PropertyNearbyLandmarkService.getPropertyNearbyLandmarkByPropertyId(property_id);
            commit("setSinglePropertyNearbyLandmarkVisuals", response.data.result);
            return response;
        } catch (error) {
            console.log(error);
            // throw new Error("Failed on loading current property visuals")
        }
    },
    async fetchPropertyNeighborhoodVisuals({ commit }, property_id) {
        try {
            const response = await NeighborhoodVisualsService.getNeighborhoodVisualsByPropertyId(property_id);
            commit("setSinglePropertyNeighborhoodVisuals", response.data.result);
            return response;
        } catch (error) {
            console.log(error);
            // throw new Error("Failed on loading current property visuals")
        }
    },
    async fetchCurrentPropertySelectedFeatures({ commit }, property_id) {
        try {
            const response = await FeatureTypeLookupService.getPropertyFeatureTypesByPropertyId(property_id);
            commit("setCurrentPropertyFeatures", response.data.result);
        } catch (error) {
            console.log(error);
            // throw new Error("Failed on loading current property features")
        }
    },
    async fetchCurrentPropertyValue({ commit }, property_id) {
        try {
            const response = await PropertyValueService.getPropertyValueByPropertyId(property_id);
            commit("setSinglePropertyValue", response.data.result);
            return response;
        } catch (error) {
            console.log(error);
            // throw new Error("Failed on loading current property value")
        }
    },
    async fetchPropertyRentalValue({ commit }, property_id) {
        try {
            const response = await PropertyRentalValueService.getPropertyRentalValueByPropertyId(property_id);
            commit("setSingleRentalValue", response.data.result);
            return response;
        } catch (error) {
            console.log(error);
            // throw new Error("Failed on loading current property value")
        }
    },
    async updateAPropertyValue(context, property) {
        try {
            const response = await PropertyValueService.updateAPropertyValue(property);
            if(response.data.status == 1){
                context.dispatch('fetchCurrentPropertyValue', property.property_id);
            }
            return response;
        } catch (error) {
            throw new Error(error.message)
        }
    },
    async updatePropertyRentalValue(context, rental) {
        try {
            const response = await PropertyRentalValueService.updatePropertyRentalValue(rental);
            if(response.data.status == 1){
                context.dispatch('fetchPropertyRentalValue', rental.property_id);
            }
            return response;
        } catch (error) {
            throw new Error(error.message)
        }
    },     
    async fetchPropertyPriceHistories({ commit }, property_id) {
        try {
            const response = await PropertyPriceHistoryService.getPropertyPriceHistoriesByPropertyId(property_id);
            commit("setSinglePropertyPriceHistory", response.data.result);
        } catch (error) {
            console.log(error);
            // throw new Error("Failed on loading current property price histories")
        }
    },
    loadSearchKeywordIntoGlobalState({ commit }, keyword) {
        commit("setSearchKey", keyword);
        return "ok";
    },
    async fetchPropertiesBySearchKeyword({ commit }, currentSearchKeyword) {
        try {
            let keyword;
            if (currentSearchKeyword === "" || currentSearchKeyword === undefined || currentSearchKeyword === null) {
                keyword = state.searchKeyword;
            } else {
                keyword = currentSearchKeyword;
            }

            const response = await PropertyService.getSearchedProperties(keyword);
            commit("setSearchedPropertyResult", response.data.result);
        } catch (error) {
            console.log(error);
            // throw new Error("Failed to fetch your data");
        }
    },
    async fetchAutoCompleteWords({ commit, rootState }) {
        try {
            const locationResponse = await PropertyLocationService.getAllLocationsForApprovedProperties(rootState.SellerModule.saleCategory[0].id);
            const landmarkTypeResponse = await PropertyLandmarkTypeService.getAllPropertyLandmarkTypes();
            const valueResponse = await PropertyValueService.getApprovedPropertyValue(rootState.SellerModule.saleCategory[0].id);
            const categoryResponse = await PropertyCategoryService.getPropertyCategory();

            const districtList = (locationResponse.data.result).map(location => {
                return {option: location.district}
            })
            const divisionList = (locationResponse.data.result).map(location => {
                return {option: location.division}
            })
            const suburbList = (locationResponse.data.result).map(location => {
                return {option: location.suburb}
            })
            const categoryList = (categoryResponse.data.result).map(category => {
                return {option: category.property_type}
            })

            const landmarkList = (landmarkTypeResponse.data.result).map(landmark => {
                return {option: landmark.landmark_type}
            })
            const valueList = (valueResponse.data.result).map(value => {
                return {option: value.actualvalue}
            })

            const mergedList = [
                ...districtList, 
                ...divisionList, 
                ...suburbList,  
                ...categoryList, 
                ...landmarkList, 
                ...valueList
            ];
            const searchList = mergedList.map(eachItem => eachItem.option);
            commit("setSearchList", searchList);
        } catch (error) {
            throw new Error(error.message);
        }
    },
    // Viewed Properties
    async addAViewedProperty({ rootState, commit }, property_id) {
        try {
            const propertyViewed = {
                property_id,
                viewed_by: rootState.AuthModule.currentUser.username
            }
            let response = null;
            if (rootState.AuthModule.isLoggedIn === true) {
                response = await ViewedPropertiesService.postViewedProperty(propertyViewed);
                if (response.status === 201) {
                    commit('setViewedProperty', true);
                }
            } else {
                commit('setViewedProperty', false);
            }
        } catch (error) {
            console.log(error);
            // throw new Error("Failed to post your data");
        }
    },
    async fetchViewedRentalProperties({ commit, rootState }) {
        try {
            const response = await ViewedPropertiesService.getViewedPropertyForRent(rootState.AuthModule.currentUser.username);
            if (response.data.status === 1) {
                commit('setRecentViewedRentals', response.data.result);
            }
            return response;
        } catch (error) {
            throw new Error(error.message);
        }
    },
    async fetchViewedSaleProperties({ commit, rootState }) {
        try {
            const response = await ViewedPropertiesService.getViewedPropertyForSale(rootState.AuthModule.currentUser.username);
            if (response.data.status === 1) {
                commit('setRecentViewedSale', response.data.result);
            }
            return response;
        } catch (error) {
            throw new Error(error.message);
        }
    },

    // Favorites
    async fetchTotalFavoriteCount({ commit, rootState }) {
        try {
            const response = await FavoritePropertiesService.getTotalCountOfFavoriteProperties(rootState.AuthModule.currentUser.username);
            if (response.data.status == 1) {
                commit('setTotalFavoriteCount', response.data.result);
            } else if (response.data.status == 0) {
                commit('setTotalFavoriteCount', 0);
            }
            
            return response;
        } catch (error) {
            throw new Error(error.message);
        }
    },
    async fetchFavoritePropertiesForComparision({ commit, rootState }) {
        try {
            const response = await FavoritePropertiesService.getFavoritePropertiesForComparision(rootState.AuthModule.currentUser.username);
            commit("setCurrentUserFavoriteProperties", response.data.result);
        } catch (error) {
            console.log(error);
            // throw new Error("Failed to fetch your data");
        }
    },
    async addPropertyToFavorites({ commit, rootState }, property_id) {
        try {
            const user = {
                username: rootState.AuthModule.currentUser.username,
                property_id
            }
            const response = await FavoritePropertiesService.postAFavoriteProperty(user);
            if (response.status == 201 && response.data.status == 1) {
                commit("setAddCurrentUserFavoriteProperty", user.property_id);
            }
        } catch (error) {
            console.log(error);
            // throw new Error("Failed to fetch your data");
        }
    },
    async removePropertyFromFavorites({ commit, rootState }, property_id) {
        try {
            const user = {
                username: rootState.AuthModule.currentUser.username,
                property_id
            }
            const response = await FavoritePropertiesService.removeAPropertyFromFavorites(user);
            if (response.status == 200 && response.data.status == 1) {
                commit("setRemoveCurrentUserFavoriteProperty", user.property_id);
            }
        } catch (error) {
            console.log(error);
            // throw new Error("Failed to fetch your data");
        }
    },
    async removePropertyFromFavoriteSection({ commit, rootState }, property_id){
        const user = {
            username: rootState.AuthModule.currentUser.username,
            property_id
        }
        const response = await FavoritePropertiesService.removeAPropertyFromFavorites(user);
        if (response.status == 200 && response.data.status == 1) {
            commit("setRemoveCurrentUserFavoritePropertyFromListAndFavoriteScreen", user.property_id);
        }
    },
    async fetchAllDetailedCurrentUserProperties({ commit, rootState }) {
        try {
            const responseSale = await FavoritePropertiesService.getAllCurrentUserFavoriteSaleProperties(rootState.AuthModule.currentUser.username);
            const responseRent = await FavoritePropertiesService.getAllCurrentUserFavoriteRentalProperties(rootState.AuthModule.currentUser.username);

            if(responseSale.status === 200 && responseRent.status === 200 && responseSale.data.status === 1 && responseRent.data.status === 1){
                const favoriteSales = (responseSale.data.result).map(sale => {
                    return {
                        actual_value: sale.actual_value_,
                        created_by: sale.property_created_by,
                        name: `${sale.division}, ${sale.suburb}`,
                        property_description: sale.property_description,
                        property_number: sale.property_number_,
                        category: sale.property_type_,
                        property_id: sale.propertyid_,
                        snapshot: sale.snapshot_,
                        islistedforid: sale.islistedforid,
                        listed_for_name: sale.listed_for_name,
                        when_saved: sale.when_saved_ // returned when saved
                    }

                });

                const favoriteRents = (responseRent.data.result).map(rental => {
                    return {
                        actual_value: rental.rental_value,
                        created_by: rental.property_created_by, 
                        name: `${rental.division}, ${rental.suburb}`,
                        property_description: rental.property_description,
                        property_number: rental.property_number_,
                        category: rental.property_type_,   
                        property_id: rental.propertyid_,
                        snapshot: rental.snapshot_,
                        islistedforid: rental.islistedforid,
                        listed_for_name: rental.listed_for_name,                                         
                        when_saved: rental.when_saved_ // returned when saved
                    }
                });

                const favorites = [...favoriteSales, ...favoriteRents];

                commit("setDetailedCurrentUserFavoriteList", favorites);
            }
        } catch (error) {
            throw new Error(error.message);
        }
    },
    // =================================================
    async checkIfUserIsAlreadyInterestedInAProperty({commit, rootState}, property_id){
        try {
            const propertyDetails = {
                property_id: property_id,
                username: rootState.AuthModule.currentUser.username
            }
            const response = await HighValuePropertyService.checkIfUserIsInterestedInAProperty(propertyDetails);
            if(response.data.status == 1){
                commit('setUserPropertyInterest', response.data.result);
            } 
            return response;
        } catch (error) {
            throw new Error(error.message);
        }
    },
    async expressInterestInBuyingAProperty({ rootState }, property_id){
        try {
            const propertyDetails = {
                property_id: property_id,
                interested_by: rootState.AuthModule.currentUser.username
            }
            const response = await HighValuePropertyService.expressInterestInProperty(propertyDetails);
            return response;
        } catch (error) {
            throw new Error(error.message);
        }
    },
    async getCurrentUserPropertiesOfInterest({commit, rootState}){
        try {
            const response = await HighValuePropertyService.getCurrentUserInterestedInProperties(rootState.AuthModule.currentUser.username);
            if(response.data.status == 1){
                commit('userInterestedInProperties', response.data.result);
            }
            return response;
        } catch (error) {
            throw new Error(error.message);
        }
    },
    async getCurrentUserRentalsOfInterest({commit, rootState}){
        try {
            const response = await HighValuePropertyService.getCurrentUserInterestedInRentals(rootState.AuthModule.currentUser.username);
            if(response.data.status == 1){
                commit('userInterestedInRentals', response.data.result);
            }
            return response;
        } catch (error) {
            throw new Error(error.message);
        }
    },
    async getCurrentUserAcquiredProperties({commit, rootState}){
        try {
            const response = await AcquiredPropertyService.getCurrentUserBoughtProperties(rootState.AuthModule.currentUser.username);
            if(response.data.status == 1){
                commit('userAcquiredProperties', response.data.result);
            }
            return response;
        } catch (error) {
            throw new Error(error.message);
        }
    },
    async getCurrentUserAcquiredRentals({commit, rootState}){
        try {
            const response = await AcquiredPropertyService.getCurrentUserBoughtRentals(rootState.AuthModule.currentUser.username);
            if(response.data.status == 1){
                commit('userAcquiredRentals', response.data.result);
            }
            return response;
        } catch (error) {
            throw new Error(error.message);
        }
    }
    // ================================================
}

const mutations = {
    setPropertyForSale: (state, returnedPropertyForSale) => (state.propertyForSale = returnedPropertyForSale
        .map(eachPropertyForSale => {
            return {
                actual_value: eachPropertyForSale.actualvalue,
                created_by: eachPropertyForSale.createdby,
                description: eachPropertyForSale.description_,
                name: `${eachPropertyForSale.division}, ${eachPropertyForSale.suburb}`,
                property_description: eachPropertyForSale.property_description,
                property_number: eachPropertyForSale.property_number_,
                category: eachPropertyForSale.property_type_,
                property_id: eachPropertyForSale.propertyid_,
                snapshot: eachPropertyForSale.snapshot_,
                visuals_id: eachPropertyForSale.visualsid,
                when_created: eachPropertyForSale.whencreated
            } 
        }
        )),
    setPropertyForRent: (state, returnedPropertyForRent) => (state.propertyForRent = returnedPropertyForRent
        .map(eachPropertyForRent => {
            return {
                actual_value: eachPropertyForRent.rental_value,
                created_by: eachPropertyForRent.createdby,
                description: eachPropertyForRent.description_,
                name: `${eachPropertyForRent.division}, ${eachPropertyForRent.suburb}`,
                property_description: eachPropertyForRent.property_description,
                property_number: eachPropertyForRent.property_number_,
                category: eachPropertyForRent.property_type_,
                property_id: eachPropertyForRent.propertyid_,
                snapshot: eachPropertyForRent.snapshot_,
                visuals_id: eachPropertyForRent.visualsid,
                when_created: eachPropertyForRent.whencreated
            }
        }
        )),
    setSinglePropertyVisuals: (state, returnedSinglePropertyVisuals) => (state.singlePropertyVisuals = returnedSinglePropertyVisuals),
    setSinglePropertyNearbyLandmarkVisuals: (state, returnedSinglePropertyLandmarkVisuals) => (state.singlePropertyNearbyLandmarkVisuals = returnedSinglePropertyLandmarkVisuals),
    setSinglePropertyNeighborhoodVisuals: (state, returnedSinglePropertyNeighborhoodVisuals) => (state.singleNeighborhoodVisuals = returnedSinglePropertyNeighborhoodVisuals),   
    setLatestListedProperties: (state, returnedLatestProperties) => state.latestProperties = returnedLatestProperties
        .map(eachLatestProperty => {
            return {
                propertyId: eachLatestProperty.propertyid_,
                propertyCode: eachLatestProperty.property_number_,
                propertyType: eachLatestProperty.is_listed_for_name,
                propertyCategory: eachLatestProperty.property_type_,
                propertyCost: eachLatestProperty.actual_value_,
                propertySnapshot: eachLatestProperty.snapshot_,
                propertyLocation: `${eachLatestProperty.division}, ${eachLatestProperty.suburb}`,
                listedBy: eachLatestProperty.listed_by,
                whenListed: eachLatestProperty.when_listed
            }
        }),
    setLatestListedRentals: (state, returnedLatestRentals) => state.latestRentals = returnedLatestRentals
        .map(eachLatestRental => {
            return {
                propertyId: eachLatestRental.propertyid_,
                propertyCode: eachLatestRental.property_number_,
                propertyType: eachLatestRental.is_listed_for_name,
                propertyCategory: eachLatestRental.property_type_,
                propertyCost: eachLatestRental.rental_value,
                propertySnapshot: eachLatestRental.snapshot_,
                propertyLocation: `${eachLatestRental.division}, ${eachLatestRental.suburb}`,
                listedBy: eachLatestRental.listed_by,
                whenListed: eachLatestRental.when_listed
            }
        }),
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
        .map(eachFeature => { 
            return { 
                name: eachFeature.name, 
                feature_type_lk_id: eachFeature.feature_type_lk_id 
            } 
        })),
    setSearchKey: (state, searchKeyword) => state.searchKeyword = searchKeyword,
    setSearchedPropertyResult: (state, returnedResults) => state.searchedResults = returnedResults.map(eachResult => {
        return {
            actual_value: eachResult.actual_value_,
            created_by: eachResult.created_by_,
            name: `${eachResult.division}, ${eachResult.suburb}`,
            property_description: eachResult.property_description,
            property_number: eachResult.property_number_,
            category: eachResult.property_type_,
            property_id: eachResult.property_id_,
            snapshot: eachResult.property_visual,
            when_created: eachResult.when_created_
        }
        // description: eachPropertyForRent.description_,
    }),
    setSearchList: (state, returnedSearchOptionsList) => state.autocompleteList = [...new Set(returnedSearchOptionsList)],
    setViewedProperty: (state, viewedProperty) => state.viewedProperty = viewedProperty,
    setRecentViewedRentals: (state, returnedViewedRentals) => state.recentViewedRentals = returnedViewedRentals.map(eachRental => {
        return {
            actual_value: eachRental.rental_value,
            created_by: eachRental.property_created_by,
            name: `${eachRental.division}, ${eachRental.suburb}`,
            property_description: eachRental.property_description,
            property_number: eachRental.property_number_,
            category: eachRental.property_type_,
            property_id: eachRental.propertyid_,
            snapshot: eachRental.snapshot_,
            last_viewed: eachRental.when_viewed_
        }
    }),
    setRecentViewedSale: (state, returnedViewedSale) => state.recentViewedSales = returnedViewedSale
        .map(eachSale => {
            return {
                actual_value: eachSale.actualvalue,
                created_by: eachSale.property_created_by,
                name: `${eachSale.division}, ${eachSale.suburb}`,
                property_description: eachSale.property_description,
                property_number: eachSale.property_number_,
                category: eachSale.property_type_,
                property_id: eachSale.propertyid_,
                snapshot: eachSale.snapshot_,
                last_viewed: eachSale.when_viewed_
            }
        }),
    setTotalFavoriteCount: (state, returnedTotalCount) => state.totalFavoriteCount = returnedTotalCount,
    // For comparision purposes
    setCurrentUserFavoriteProperties: (state, returnedCurrentUserFavoriteProperties) => state.currentUserFavoriteProperties = returnedCurrentUserFavoriteProperties
        .map(eachFavorite => eachFavorite.property_id),
    setAddCurrentUserFavoriteProperty: (state, property_id) => (
        state.currentUserFavoriteProperties = [...state.currentUserFavoriteProperties, property_id],
        state.totalFavoriteCount = state.totalFavoriteCount + 1
    ),
    setRemoveCurrentUserFavoriteProperty: (state, property_id) => (
        state.currentUserFavoriteProperties = state.currentUserFavoriteProperties
            .filter(favoriteProperty => favoriteProperty !== property_id),
        state.totalFavoriteCount = state.totalFavoriteCount - 1
    ),
    setDetailedCurrentUserFavoriteList: (state, returnedFavorites) => state.detailedCurrentUserFavoriteList = returnedFavorites,
    setRemoveCurrentUserFavoritePropertyFromListAndFavoriteScreen: (state, returnedPropertyId) => (
        state.currentUserFavoriteProperties = state.currentUserFavoriteProperties.filter(favoriteProperty => favoriteProperty !== returnedPropertyId),
        state.detailedCurrentUserFavoriteList = state.detailedCurrentUserFavoriteList.filter(currentUserFavorite => currentUserFavorite.property_id !== returnedPropertyId),
        state.totalFavoriteCount = state.totalFavoriteCount - 1
    ),
    setUserPropertyInterest: (state, userInterestedResponse) => state.alreadyInterestedInAProperty = userInterestedResponse,
    userInterestedInProperties: (state, returnedUserInterestedProperties) => state.userInterestedProperties = returnedUserInterestedProperties,
    userInterestedInRentals:  (state, returnedUserInterestedRentals) => state.userInterestedRentals = returnedUserInterestedRentals,
    userAcquiredProperties: (state, returnedAcquiredProperties) => state.userAcquiredProperties = returnedAcquiredProperties,
    userAcquiredRentals: (state, returnedAcquiredRentals) => state.userAcquiredRentals = returnedAcquiredRentals
}

export default {
    state,
    getters,
    actions,
    mutations
}
