import API from '../../config/connections'

export default {
  async getAllProperty () {
    try {
      const response = await API.propertyApi.get('/properties')
      return response
    } catch (error) {
      throw new Error('An error occured when retrieving data')
    }
  },
  async getPropertyById (property_id) {
    try {
      const response = await API.propertyApi.get(`/properties/${property_id}`)
      return response
    } catch (error) {
      throw new Error('An error occured when retrieving data')
    }
  },
  async getAllPropertyForSale(is_listed_for_id) { //return properties based on Sale or Rent
    try {
      console.log(is_listed_for_id);
      const response = await API.propertyApi.get(`/properties/search-listed-for/${is_listed_for_id}`)
      return response
    } catch (error) {
      throw new Error('An error occured when retrieving data')
    }
  },
  async postAProperty (property) {
    try {
      const response = await API.propertyApi.post('/properties', property)
      return response
    } catch (error) {
      throw new Error('An error occured when sending data')
    }
  },
  async updateAProperty (property) {
    try {
      const response = await API.propertyApi.put(`/properties/${property.property_id}`, property)
      return response
    } catch (error) {
      throw new Error('An error occured when updating data')
    }
  },
  async deleteAProperty (property) {
    try {
      const response = await API.propertyApi.delete(`/properties/${property.property_id}`)
      return response
    } catch (error) {
      throw new Error('An error occured when deleting data')
    }
  }
}
