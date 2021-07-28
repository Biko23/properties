import API from '../../config/connections'

export default {
  async getAllProperty () {
    try {
      const response = await API.propertyApi.get('/properties')
      return response
    } catch (error) {
      console.log(error)
    }
  },
  async getPropertyById (property_id) {
    try {
      const response = await API.propertyApi.put(`/properties/${property_id}`)
      return response
    } catch (error) {
      console.log(error)
    }
  },
  // async postAProperty (property) {
  //   try {
  //     const response = await API.propertyApi.post('/properties', property)
  //     return response
  //   } catch (error) {
  //     console.log(error)
  //   }
  // },
  async postAProperty (property) {
    try {
     return property
    } catch (error) {
      console.log(error)
    }
  },
  async updateAProperty (property) {
    try {
      const response = await API.propertyApi.put(`/properties/${property.property_id}`, property)
      return response
    } catch (error) {
      console.log(error)
    }
  },
  async deleteAServiceCall (property) {
    try {
      const response = await API.propertyApi.delete(`/properties/${property.property_id}`)
      return response
    } catch (error) {
      console.log(error)
    }
  }
}
