import API from '../config/connections'
// propertyValueApi

export default {
  async getPropertyValue () {
    try {
      const response = await API.marketPlaceApi.get(`/property-value`)
      return response
    } catch (error) {
      throw new Error('An error occured when retrieving data')
    }
  },
  async getApprovedPropertyValue(is_listed_for_id){
    try {
      const response = await API.marketPlaceApi.get(`/property-value/approved-property-values/${is_listed_for_id}`)
      return response
    } catch (error) {
      console.log(error);
      // throw new Error('An error occured when retrieving data')
    }
  },
  async getPropertyValueById (property_value_id) {
    try {
      const response = await API.marketPlaceApi.get(`/property-value/${property_value_id}`)
      return response
    } catch (error) {
      throw new Error('An error occured when retrieving data')
    }
  },
  async postAPropertyValue (propertyValue) {
    try {
      const response = await API.marketPlaceApi.post('/property-value', propertyValue)
      return response
    } catch (error) {
      throw new Error('An error occured when sending data')
    }
  },
  async updateAPropertyValue (propertyValue) {
    try {
      const response = await API.marketPlaceApi.put(`/property-value/${propertyValue.property_value_id}`, propertyValue)
      return response
    } catch (error) {
      throw new Error(error.message)
    }
  },
  async deleteAPropertyValue (propertyValue) {
    try {
      const response = await API.marketPlaceApi.delete(`/property-value/${propertyValue.property_value_id}`)
      return response
    } catch (error) {
      throw new Error('An error occured when deleting data')
    }
  },
  async getPropertyValueByPropertyId (property_id) {
    try {
      const response = await API.marketPlaceApi.get(`/property-value/by-property-id/${property_id}`)
      return response
    } catch (error) {
      throw new Error('An error occured when retrieving data')
    }
  }
}
