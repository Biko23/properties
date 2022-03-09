/**
 * @author Isaac Ssemugenyi
 * @copyright flyhub Uganda Ltd
*/
import API from '../../config/connections'

export default {
    async getPropertyFeatureTypesByPropertyId(property_id) {
        try {
            const response = await API.marketPlaceApi.get(`/feature-type-lookup/by-property-id/${property_id}`)
            return response
        } catch (error) {
            console.log(error);
            // throw new Error('An error occured when retrieving data')
        }
    },
    async postAPropertyFeatures(selectedFeatures) {
        console.log(selectedFeatures);
        try {
            if (selectedFeatures) {
                // const featuresToSave = (selectedFeatures.propertyFeatures).map(eachFeature => {
                //     return {
                //         feature_type_id:  eachFeature.feature_type_id,
                //         name: eachFeature.name,
                //         quantity: eachFeature.quantity
                //     }
                // })

                // let formData = new FormData();
                // for (let feature of featuresToSave) {
                //     formData.append("feature_type_id", feature.feature_type_id);
                //     formData.append("name", feature.name);
                //     formData.append("quantity", feature.quantity);
                // }
                const response = await API.marketPlaceApi.post(`/feature-type-lookup/${selectedFeatures.property_id}`, selectedFeatures.propertyFeatures)
                console.log(response);
                return response
            }

        } catch (error) {
            throw new Error(error.message);
        }
    },
    async deleteAPropertyFeature(feature_type_lk_id){
        try {
            const response = await API.marketPlaceApi.delete(`/feature-type-lookup/${feature_type_lk_id}`);
            return response;
        } catch (error) {
            throw new Error(error.message);
        }
    }

}