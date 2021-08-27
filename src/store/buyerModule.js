import PropertyService from '@/service/property/property';
import PropertyVisualsService from '@/service/propertyVisuals';
import PropertyNearbyLandmarkService from '@/service/propertyNearbyLandmark';
import NeighborhoodVisualsService from '@/service/neighborhoodVisuals';
import PropertyValueService from '@/service/propertyValue';
import PropertyRentalValueService from '@/service/propertyRentalValue';
import PropertyPriceHistoryService from '@/service/propertyPriceHistories';
import FeatureTypeLookupService from '@/service/property/featureTypeLookup';
import PropertyLocationService from '@/service/propertyLocation';
import PropertyLandmarkTypeService from '@/service/propertyLandmarkTypes';
import ViewedPropertiesService from '@/service/property/viewedProperties';
import FavoritePropertiesService from '@/service/property/favoriteProperties';

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
    searchKeyword: '',
    autocompleteList: [],
    viewedProperty: false,
    recentViewedRentals: [],
    recentViewedSales: [],
    totalFavoriteCount: 0,
    currentUserFavoriteProperties: [],
    currentUserFavoriteSaleList: [],
    currentUserFavoriteRentList: []
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
    allSearchedResults: state => state.searchedResults,
    allAutocompletedList: state => state.autocompleteList,
    currentViewedProperty: state => state.viewedProperty,
    allRecentViewedRentals: state => state.recentViewedRentals,
    allRecentViewedProperties: state => state.recentViewedSales,
    currentUserFavoriteTotalCount: state => state.totalFavoriteCount,
    allCurrentUserFavoriteProperties: state => state.currentUserFavoriteProperties,
    allCurrentUserFavoriteSaleList: state => state.currentUserFavoriteSaleList,
    allCurrentUserFavoriteRentList: state => state.currentUserFavoriteRentList
};

const actions = {
    // fetchPropertyVisuals
    async fetchPropertyForSale({ commit, rootState }) {
        try {
            const is_listed_for_id = rootState.SellerModule.saleCategory[0].id
            const response = await PropertyService.getAllPropertyForSale(is_listed_for_id);
            commit('setPropertyForSale', response.data.result);
        } catch (error) {
            throw new Error("Failed on loading current properties")
        }
    },
    async fetchPropertyForRent({ commit, rootState }) {
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
    async fetchSinglePropertyVisuals({ commit }, property_id) {
        try {
            const response = await PropertyVisualsService.getPropertyVisualsByPropertyId(property_id);
            commit("setSinglePropertyVisuals", response.data.result);
        } catch (error) {
            throw new Error("Failed on loading current property visuals")
        }
    },
    async fetchPropertyNearbyLandmarkVisuals({ commit }, property_id) {
        try {
            const response = await PropertyNearbyLandmarkService.getPropertyNearbyLandmarkByPropertyId(property_id);
            commit("setSinglePropertyNearbyLandmarkVisuals", response.data.result);
        } catch (error) {
            throw new Error("Failed on loading current property visuals")
        }
    },
    async fetchPropertyNeighborhoodVisuals({ commit }, property_id) {
        try {
            const response = await NeighborhoodVisualsService.getNeighborhoodVisualsByPropertyId(property_id);
            commit("setSinglePropertyNeighborhoodVisuals", response.data.result);
        } catch (error) {
            throw new Error("Failed on loading current property visuals")
        }
    },
    async fetchCurrentPropertySelectedFeatures({ commit }, property_id) {
        try {
            const response = await FeatureTypeLookupService.getPropertyFeatureTypesByPropertyId(property_id);
            commit("setCurrentPropertyFeatures", response.data.result);
        } catch (error) {
            throw new Error("Failed on loading current property features")
        }
    },
    async fetchCurrentPropertyValue({ commit }, property_id) {
        try {
            const response = await PropertyValueService.getPropertyValueByPropertyId(property_id);
            commit("setSinglePropertyValue", response.data.result);
        } catch (error) {
            throw new Error("Failed on loading current property value")
        }
    },
    async fetchPropertyRentalValue({ commit }, property_id) {
        try {
            const response = await PropertyRentalValueService.getPropertyRentalValueByPropertyId(property_id);
            commit("setSingleRentalValue", response.data.result);
        } catch (error) {
            throw new Error("Failed on loading current property value")
        }
    },
    async fetchPropertyPriceHistories({ commit }, property_id) {
        try {
            const response = await PropertyPriceHistoryService.getPropertyPriceHistoriesByPropertyId(property_id);
            commit("setSinglePropertyPriceHistory", response.data.result);
        } catch (error) {
            throw new Error("Failed on loading current property price histories")
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
            throw new Error("Failed to fetch your data");
        }
    },
    async fetchAutoCompleteWords({ commit, rootState }) {
        try {
            const locationResponse = await PropertyLocationService.getAllLocationsForApprovedProperties(rootState.SellerModule.saleCategory[0].id);
            const landmarkTypeResponse = await PropertyLandmarkTypeService.getAllPropertyLandmarkTypes();
            const valueResponse = await PropertyValueService.getApprovedPropertyValue(rootState.SellerModule.saleCategory[0].id);

            const locationList = (locationResponse.data.result).map(location => {
                return {
                    option: location.name_
                }
            })
            const landmarkList = (landmarkTypeResponse.data.result).map(landmark => {
                return {
                    option: landmark.landmark_type
                }
            })
            const valueList = (valueResponse.data.result).map(value => {
                return {
                    option: value.actualvalue
                }
            })

            const mergedList = [...locationList, ...landmarkList, ...valueList];
            const searchList = mergedList.map(eachItem => eachItem.option);
            commit("setSearchList", searchList);
        } catch (error) {
            throw new Error("Failed to fetch your data");
        }
    },
    // Viewed Properties
    async addAViewedProperty({ rootState }, property_id) {
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
            throw new Error("Failed to post your data");
        }
    },
    async fetchViewedRentalProperties({ commit, rootState }) {
        try {
            const response = await ViewedPropertiesService.getViewedPropertyForRent(rootState.AuthModule.currentUser.username);
            if (response.status === 200) {
                commit('setRecentViewedRentals', response.data.result);
            }
        } catch (error) {
            throw new Error("Failed to post your data");
        }
    },
    async fetchViewedSaleProperties({ commit, rootState }) {
        try {
            const response = await ViewedPropertiesService.getViewedPropertyForSale(rootState.AuthModule.currentUser.username);
            if (response.status === 200) {
                commit('setRecentViewedSale', response.data.result);
            }
        } catch (error) {
            throw new Error("Failed to post your data");
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
        } catch (error) {
            throw new Error("Failed to post your data");
        }
    },
    async fetchFavoritePropertiesForComparision({ commit, rootState }) {
        try {
            const response = await FavoritePropertiesService.getFavoritePropertiesForComparision(rootState.AuthModule.currentUser.username);
            commit("setCurrentUserFavoriteProperties", response.data.result);
        } catch (error) {
            throw new Error("Failed to fetch your data");
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
            throw new Error("Failed to fetch your data");
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
            throw new Error("Failed to fetch your data");
        }
    },
    async fetchAllCurrentUserSaleProperties({ commit, rootState }) {
        try {
            const response = await FavoritePropertiesService.getAllCurrentUserFavoriteSaleProperties(rootState.AuthModule.currentUser.username);
            commit("loadCurrentUserFavoritePropertiesForSaleList", response.data.result);
        } catch (error) {
            throw new Error("Failed to fetch your data");
        }
    },
    async fetchAllCurrentUserRentalProperties({ commit, rootState }) {
        try {
            const response = await FavoritePropertiesService.getAllCurrentUserFavoriteRentalProperties(rootState.AuthModule.currentUser.username);
            commit("loadCurrentUserFavoritePropertiesForRentList", response.data.result);
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
                category: eachPropertyForSale.property_type_,
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
                category: eachPropertyForRent.property_type_,
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
        .map(eachFeature => { return { name: eachFeature.name } })),
    setSearchKey: (state, searchKeyword) => state.searchKeyword = searchKeyword,
    setSearchedPropertyResult: (state, returnedResults) => state.searchedResults = returnedResults.map(eachResult => {
        return {
            property_id: eachResult.property_id_,
            snapshot: eachResult.property_visual,
            actual_value: eachResult.actual_value_,
            category: eachResult.property_type_,
            name: eachResult.location_name,
            when_created: eachResult.when_created_,
            created_by: eachResult.created_by_
        }
        // description: eachPropertyForRent.description_,
    }),
    setSearchList: (state, returnedSearchOptionsList) => state.autocompleteList = [...new Set(returnedSearchOptionsList)],
    setViewedProperty: (state, viewedProperty) => state.viewedProperty = viewedProperty,
    setRecentViewedRentals: (state, returnedViewedRentals) => state.recentViewedRentals = returnedViewedRentals.map(eachRental => {
        return {
            property_id: eachRental.propertyid_,
            snapshot: eachRental.snapshot_,
            actual_value: eachRental.rental_value,
            category: eachRental.property_type_,
            name: eachRental.location_name,
            last_viewed: eachRental.when_viewed_,
            created_by: eachRental.property_created_by
        }
    }),
    setRecentViewedSale: (state, returnedViewedSale) => state.recentViewedSales = returnedViewedSale
        .map(eachSale => {
            return {
                property_id: eachSale.propertyid_,
                snapshot: eachSale.snapshot_,
                actual_value: eachSale.actualvalue,
                category: eachSale.property_type_,
                name: eachSale.location_name,
                last_viewed: eachSale.when_viewed_,
                created_by: eachSale.property_created_by
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
    loadCurrentUserFavoritePropertiesForSaleList: (state, returnedCurrentUserFavoriteSaleList) => state.currentUserFavoriteSaleList = returnedCurrentUserFavoriteSaleList
        .map(eachFavoriteSaleProperty => {
            return {
                property_id: eachFavoriteSaleProperty.propertyid_,
                snapshot: eachFavoriteSaleProperty.snapshot_,
                islistedforid: eachFavoriteSaleProperty.islistedforid,
                actual_value: eachFavoriteSaleProperty.actual_value_,
                category: eachFavoriteSaleProperty.property_type_,
                name: eachFavoriteSaleProperty.location_name,
                when_saved: eachFavoriteSaleProperty.when_saved_, // returned when saved
                created_by: eachFavoriteSaleProperty.property_created_by
            }
        }),
    loadCurrentUserFavoritePropertiesForRentList: (state, returnedCurrentUserFavoriteRentList) => state.currentUserFavoriteRentList = returnedCurrentUserFavoriteRentList
        .map(eachFavoriteRentProperty => {
            return {
                property_id: eachFavoriteRentProperty.propertyid_,
                snapshot: eachFavoriteRentProperty.snapshot_,
                islistedforid: eachFavoriteRentProperty.islistedforid,
                actual_value: eachFavoriteRentProperty.rental_value,
                category: eachFavoriteRentProperty.property_type_,
                name: eachFavoriteRentProperty.location_name,
                when_saved: eachFavoriteRentProperty.when_saved_, // returned when saved
                created_by: eachFavoriteRentProperty.property_created_by
            }
        })
}

export default {
    state,
    getters,
    actions,
    mutations
}
