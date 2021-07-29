import API from '../config/connections'
// propertyValueApi

export default {
  async getPropertyValueById (property_value_id) {
    try {
      const response = await API.propertyValueApi.get(`/property-value/${property_value_id}`)
      return response
    } catch (error) {
      throw new Error('An error occured when retrieving data')
    }
  },
  async postAPropertyValue (propertyValue) {
    try {
      const response = await API.propertyValueApi.post('/property-value', propertyValue)
      return response
    } catch (error) {
      throw new Error('An error occured when sending data')
    }
  },
  async updateAPropertyValue (propertyValue) {
    try {
      const response = await API.propertyValueApi.put(`/property-value/${propertyValue.property_value_id}`, propertyValue)
      return response
    } catch (error) {
      throw new Error('An error occured when updating data')
    }
  },
  async deleteAPropertyValue (propertyValue) {
    try {
      const response = await API.propertyValueApi.delete(`/property-value/${propertyValue.property_value_id}`)
      return response
    } catch (error) {
      throw new Error('An error occured when deleting data')
    }
  }
}
