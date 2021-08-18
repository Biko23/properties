import API from '../../config/connections'

export default {
    async getPropertyFeatureTypesByPropertyId(property_id) {
        try {
            const response = await API.propertyApi.get(`/feature-type-lookup/${property_id}`)
            return response
        } catch (error) {
            throw new Error('An error occured when retrieving data')
        }
    },
    async postAPropertyFeatures(selectedFeatures) {
        try {
            if (selectedFeatures) {
                const featuresToSave = (selectedFeatures.propertyFeatures).map(eachFeature => {
                    return {
                        feature_type_id:  eachFeature.value,
                        name: eachFeature.text
                    }
                })

                let formData = new FormData();
                for (let feature of featuresToSave) {
                    formData.append("feature_type_id", feature.feature_type_id);
                    formData.append("name", feature.name);
                }
                const response = await API.propertyApi.post(`/feature-type-lookup/${selectedFeatures.property_id}`, formData)
                return response
            }

        } catch (error) {
            throw new Error('An error occured when sending data')
        }
    }

}