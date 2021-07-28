import PropertyLocationService from '@/service/propertyLocation';
import PropertyValueService from '@/service/propertyValue';
import PropertyNearbyLandmarkService from '@/service/propertyNearbyLandmark';
import NeighborhoodVisualsService from '@/service/neighborhoodVisuals';
import PropertyVisualsService from '@/service/propertyVisuals';
import PropertyService from '@/service/property/property';
import PropertyTypeService from '@/service/property/propertyListedAs';
import PropertyFeatureService from '@/service/propertyFeatures';
import PropertyLandmarkTypeService from '@/service/propertyLandmarkTypes';

const state = {
    propertyTypes: [],
    propertyFeatures: [],
    propertyLandmarkTypes: [],
    propertyFirstPageData: null,
    propertySecondPageData: null,
    propertyThirdPageData: null
}

const getters = {
    allPropertyTypes: (state) => state.propertyTypes,
    allPropertyFeatures: (state) => state.propertyFeatures,
    allPropertyLandmarkTypes: (state) => state.propertyLandmarkTypes,
    allPropertyFirstPageData: (state) => state.propertyFirstPageData,
    allPropertySecondPageData: (state) => state.propertySecondPageData,
    allPropertyThirdPageData: (state) => state.propertyThirdPageData
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
    addPropertyDataFromPageOne({ commit }, propertyDataOne) {
        commit('setPropertyRegisterFirstData', propertyDataOne);
    },
    addPropertyDataFromPageTwo({ commit }, propertyDataTwo) {
        commit('setPropertyRegisterTwoData', propertyDataTwo);
    },
    addPropertyDataFromPageThird({ commit }, propertyDataFinal) {
        commit('setPropertyRegisterThreeData', propertyDataFinal);
    },
    async submitAllPropertyData({ state }) {
        try {
            const propertyLocation = {
                location: state.propertyFirstPageData.location,
                created_by: 'Isaac',
                updated_by: 'Isaac'
            }
            const propertyType = {
                property_type_id: state.propertyFirstPageData.type,
            }
            const selectedPropertyFeatures = {
                propertyFeatures: state.propertyFirstPageData.features,
                created_by: 'Isaac',
                updated_by: 'Isaac'
            }
            const propertyVisuals = {
                description: state.propertyFirstPageData.description,
                files: state.propertyFirstPageData.visuals,
                created_by: 'Isaac',
                updated_by: 'Isaac'
            }

            const propertyValue = {
                actual_value: state.propertySecondPageData.expected_value,
                created_by: 'Isaac',
                updated_by: 'Isaac'
            }

            const neighborhoodVisuals = {
                description: state.propertySecondPageData.description,
                files: state.propertySecondPageData.neighborhoodVisuals,
                created_by: "Isaac",
                updated_by: "Isaac"
            }

            const nearbyLandmarkVisuals = {
                landmark_name: state.propertyThirdPageData.landmark_name,
                distance_from_property: state.propertyThirdPageData.distance_from_property,
                landmark_type_id: state.propertyThirdPageData.landmark_type_id,
                description: state.propertyThirdPageData.description,
                files: state.propertyThirdPageData.landmarkVisuals,
                created_by: "Isaac",
                updated_by: "Isaac"
            }

            // Api calls
            const locationResponse = await PropertyLocationService.postAPropertyLocation(propertyLocation);
            const valueResponse = await PropertyValueService.postAPropertyValue(propertyValue);
            const landmarkResponse = await PropertyNearbyLandmarkService.postAPropertyNearbyLandmark(nearbyLandmarkVisuals);
            const neighborhoodResponse = await NeighborhoodVisualsService.postNeighborhoodVisuals(neighborhoodVisuals);
            const propertyVisualResponse = await PropertyVisualsService.postPropertyVisuals(propertyVisuals);
            // const response = await PropertyService.postAProperty(property);
            locationResponse ? console.log("location", locationResponse) : ""
            valueResponse ? console.log("value", valueResponse) : ""
            landmarkResponse ? console.log("landmark", landmarkResponse) : ""
            neighborhoodResponse ? console.log("neighborhood", neighborhoodResponse) : ""
            propertyVisualResponse ? console.log("visuals", propertyVisualResponse) : ""

            // this.$swal('Great!','Movie added successfully!','success');
        } catch (error) {
            // this.$swal('ooh!','Unable to finish!','error');
        }
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
    setPropertyLandkmarkTypes: (state, propertyLandmarkTypes) => (state.propertyLandmarkTypes = propertyLandmarkTypes.map(propertyLandmarkType => {
        return {
            value: propertyLandmarkType.landmark_type_id,
            text: propertyLandmarkType.landmark_type
        }
    })),
    setPropertyRegisterFirstData: (state, propertyDataOne) => (state.propertyFirstPageData = propertyDataOne),
    setPropertyRegisterTwoData: (state, propertyDataTwo) => (state.propertySecondPageData = propertyDataTwo),
    setPropertyRegisterThreeData: (state, propertyDataThree) => (state.propertyThirdPageData = propertyDataThree)
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