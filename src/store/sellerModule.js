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
    propertyThirdPageData: null,
    createdProperty: {}
}

const getters = {
    allPropertyTypes: (state) => state.propertyTypes,
    allPropertyFeatures: (state) => state.propertyFeatures,
    allPropertyLandmarkTypes: (state) => state.propertyLandmarkTypes,
    allPropertyFirstPageData: (state) => state.propertyFirstPageData,
    allPropertySecondPageData: (state) => state.propertySecondPageData,
    allPropertyThirdPageData: (state) => state.propertyThirdPageData,
    newCreatedProperty: (state) => state.createdProperty
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
    async addPropertyDataFromPageOne({ commit }, propertyDataOne) {
            try {
            await commit('setPropertyRegisterFirstData', propertyDataOne);
            const newProperty = {
                isListedForId: propertyDataOne.type,
                created_by: "Isaac",
                updated_by: "Isaac"
            }
            console.log(propertyDataOne);
            const response = await PropertyService.postAProperty(newProperty);
            commit('setCreatedProperty', response.data.result);
        } catch (error) {
            throw new Error('Failed to save property details')
        }
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
                name: state.propertyFirstPageData.location,
                property_id: state.createdProperty.property_id,
                latitude: 19393982,
                longitude: 1959494,
                created_by: 'Isaac',
                updated_by: 'Isaac'
            }
            const selectedPropertyFeatures = {
                propertyFeatures: state.propertyFirstPageData.features,
                property_id: state.createdProperty.property_id,
                created_by: 'Isaac',
                updated_by: 'Isaac'
            }
            const propertyVisuals = {
                description: state.propertyFirstPageData.description,
                files: state.propertyFirstPageData.visuals,
                property_id: state.createdProperty.property_id,
                created_by: 'Isaac',
                updated_by: 'Isaac'
            }

            console.log('visuals', state.propertyFirstPageData.visuals);
            const propertyValue = {
                actual_value: state.propertySecondPageData.expected_value,
                property_id: state.createdProperty.property_id,
                created_by: 'Isaac',
                updated_by: 'Isaac'
            }

            const neighborhoodVisuals = {
                description: state.propertySecondPageData.description,
                files: state.propertySecondPageData.neighborhoodVisuals,
                property_id: state.createdProperty.property_id,
                created_by: "Isaac",
                updated_by: "Isaac"
            }

            const nearbyLandmarkVisuals = {
                landmark_name: state.propertyThirdPageData.landmark_name,
                distance_from_property: state.propertyThirdPageData.distance_from_property,
                landmark_type_id: state.propertyThirdPageData.landmark_type_id,
                description: state.propertyThirdPageData.description,
                files: state.propertyThirdPageData.landmarkVisuals,
                property_id: state.createdProperty.property_id,
                created_by: "Isaac",
                updated_by: "Isaac"
            }

            // Api calls
            await PropertyLocationService.postAPropertyLocation(propertyLocation);
            await PropertyValueService.postAPropertyValue(propertyValue);
            await PropertyNearbyLandmarkService.postAPropertyNearbyLandmark(nearbyLandmarkVisuals);
            await NeighborhoodVisualsService.postNeighborhoodVisuals(neighborhoodVisuals);
            await PropertyVisualsService.postPropertyVisuals(propertyVisuals);
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
    setPropertyRegisterThreeData: (state, propertyDataThree) => (state.propertyThirdPageData = propertyDataThree),
    setCreatedProperty: (state, returnedProperty) => (state.createdProperty = returnedProperty)
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