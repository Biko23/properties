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
  async getAllPropertyForSale(is_listed_for_id) { //return properties based on Sale id
    try {
      const response = await API.propertyApi.get(`/properties/search-listed-for/${is_listed_for_id}`)
      return response
    } catch (error) {
      throw new Error('An error occured when retrieving data')
    }
  },
  async getAllPropertyForRent(is_listed_for_id) { //return properties based on Rent id
    try {
      const response = await API.propertyApi.get(`/properties/search-listed-for-rent/${is_listed_for_id}`)
      return response
    } catch (error) {
      throw new Error('An error occured when retrieving data')
    }
  },
  async getSearchedProperties(keyword) {
    try {
      const response = await API.propertyApi.get(`/properties/search-properties?key=${keyword}`);
      console.log('Search', response);
      return response;
    } catch (error) {
      throw new Error('An error occured when fetching data')
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
