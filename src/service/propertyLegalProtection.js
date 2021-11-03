import API from '../config/connections'

export default {
  async getPropertyLegalProtectionByPropertyId (property_id) {
    try {
      const response = await API.marketPlaceApi.get(`/property-legal-protections/by-property-id/${property_id}`)
      return response
    } catch (error) {
        throw new Error(error.message);
    }
  },
  async postAPropertyLegalProtection (legalDetails) {
    try {
      const response = await API.marketPlaceApi.post('/property-legal-protections', legalDetails)
      return response
    } catch (error) {
        throw new Error(error.message);
    }
  },
  async updateAPropertyLegalProtection (legalDetails) {
    try {
      const response = await API.marketPlaceApi.put(`/property-legal-protections/${legalDetails.legal_protection_id}`, legalDetails)
      return response
    } catch (error) {
        throw new Error(error.message);
    }
  }
}
