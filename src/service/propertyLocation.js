import API from '../config/connections'

export default {
  async getAllPropertyLocations () {
    try {
      const response = await API.marketPlaceApi.get('/property-locations')
      return response
    } catch (error) {
      throw new Error(error.message)
    }
  },
  async getAllLocationsForApprovedProperties (is_listed_for_id) {
    try {
      const response = await API.marketPlaceApi.get(`/property-locations/approved-property-location/${is_listed_for_id}`)
      return response
    } catch (error) {
      throw new Error(error.message)
    }
  },
  async getPropertyLocationById (location_id) {
    try {
      const response = await API.marketPlaceApi.get(`/property-locations/${location_id}`)
      return response
    } catch (error) {
      throw new Error(error.message)
    }
  },
  async postAPropertyLocation (location) {
    try {
      const response = await API.marketPlaceApi.post('/property-locations', location)
      return response
    } catch (error) {
      throw new Error(error.message)
    }
  },
  async updateAPropertyLocation (location) {
    try {
      const response = await API.marketPlaceApi.put(`/property-locations/${location.location_id}`, location)
      return response
    } catch (error) {
      throw new Error(error.message)
    }
  },
  async deleteAPropertyLocation (location) {
    try {
      const response = await API.marketPlaceApi.delete(`/property-locations/${location.location_id}`)
      return response
    } catch (error) {
      throw new Error(error.message)
    }
  },
  async getAPropertyLocationByPropertyId (property_id) {
    try {
      const response = await API.marketPlaceApi.get(`/property-locations/by-property-id/${property_id}`)
      return response
    } catch (error) {
      throw new Error(error.message)
    }
  },
  // =========================================

  async getAllDistricts () {
    try {
      const response = await API.marketPlaceApi.get(`/districts`)
      return response
    } catch (error) {
      throw new Error(error.message)
    }
  },
  async getDivisionsByDistrictId (district_id) {
    try {
      const response = await API.marketPlaceApi.get(`/divisions/by-district/${district_id}`)
      return response
    } catch (error) {
      throw new Error(error.message)
    }
  },
  async getSuburbsByDivisionId (division_id) {
    try {
      const response = await API.marketPlaceApi.get(`/suburbs/by-division/${division_id}`)
      return response
    } catch (error) {
      throw new Error(error.message)
    }
  }
}
