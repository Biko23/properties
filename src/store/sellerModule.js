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

const getters  = {
    allPropertyTypes: (state) => state.propertyTypes,
    allPropertyFeatures: (state) => state.propertyFeatures,
    allPropertyLandmarkTypes: (state) => state.propertyLandmarkTypes,
    allPropertyFirstPageData: (state) => state.propertyFirstPageData,
    allPropertySecondPageData: (state) => state.propertySecondPageData,
    allPropertyThirdPageData: (state) => state.propertyThirdPageData
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
    async fetchPropertyLandmarkTypes({ commit }){
        try {
            const response = await PropertyLandmarkTypeService.getAllPropertyLandmarkTypes();
            commit('setPropertyLandkmarkTypes', response.data.result);
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
    },
    addPropertyDataFromPageThird(context, propertyDataFinal){
        context.commit('setPropertyRegisterThreeData', propertyDataFinal);
        console.log('From global state three', propertyDataFinal);
    },
    async submitAllPropertyData({state}){
        try {
            const property = {
                ...state.propertyFirstPageData, 
                ...state.propertySecondPageData, 
                ...state.propertyThirdPageData
            };

            const response = await PropertyService.postAProperty(property);
            console.log(response);
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