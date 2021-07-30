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
  // async postAProperty (property) {
  //   try {
  //     const response = await API.propertyApi.post('/properties', property)
  //     return response
  //   } catch (error) {
  //     throw new Error('An error occured when sending data')
  //   }
  // },
  async postAProperty (property) {
    try {
     return property
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
