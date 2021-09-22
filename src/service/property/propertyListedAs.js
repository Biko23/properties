import API from '../../config/connections'

export default {
  async getPropertyListingTypes () { //Sale, Rent
    try {
      const response = await API.marketPlaceApi.get('/property-listed-types')
      return response
    } catch (error) {
      throw new Error('An error occured when retrieving data');
    }
  },
  async getPropertyListingTypeById (id) {
    try {
      const response = await API.marketPlaceApi.get(`/property-listed-types/${id}`)
      return response
    } catch (error) {
      throw new Error('An error occured when retrieving data');
    }
  }
}
