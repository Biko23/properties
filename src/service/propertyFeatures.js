import API from '../config/connections'

export default {
    async getAllPropertyFeatures () {
      try {
        const response = await API.propertyFeatureApi.get('/property-features')
        return response
      } catch (error) {
        console.log(error)
      }
    },
    async getAllPropertyFeaturesByPropertyId (id) {
      try {
        const response = await API.propertyFeatureApi.get(`/property-features/${id}`)
        return response
      } catch (error) {
        console.log(error)
      }
    }
  }