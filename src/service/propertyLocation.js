import API from '../config/connections'

export default {
  async getAllPropertyLocations () {
    try {
      const response = await API.propertyLocationApi.get('/property-locations')
      return response
    } catch (error) {
      throw new Error('An error occured when retrieving data')
    }
  },
  async getAllLocationsForApprovedProperties (is_listed_for_id) {
    try {
      const response = await API.propertyLocationApi.get(`/property-locations/approved-property-location/${is_listed_for_id}`)
      return response
    } catch (error) {
      throw new Error('An error occured when retrieving data')
    }
  },
  async getPropertyLocationById (location_id) {
    try {
      const response = await API.propertyLocationApi.get(`/property-locations/${location_id}`)
      return response
    } catch (error) {
      throw new Error('An error occured when retrieving data')
    }
  },
  async postAPropertyLocation (location) {
    try {
      const response = await API.propertyLocationApi.post('/property-locations', location)
      return response
    } catch (error) {
      throw new Error('An error occured when sending data')
    }
  },
  async updateAPropertyLocation (location) {
    try {
      const response = await API.propertyLocationApi.put(`/property-locations/${location.location_id}`, location)
      return response
    } catch (error) {
      throw new Error('An error occured when updating data')
    }
  },
  async deleteAPropertyLocation (location) {
    try {
      const response = await API.propertyLocationApi.delete(`/property-locations/${location.location_id}`)
      return response
    } catch (error) {
      throw new Error('An error occured when deleting data')
    }
  }
}
