import API from '../../config/connections'

export default {
  async getPropertyListingTypes () {
    try {
      const response = await API.propertyApi.get('/property-listed-types')
      return response
    } catch (error) {
      console.log(error)
    }
  },
  async getPropertyListingTypeById (id) {
    try {
      const response = await API.propertyApi.get(`/property-listed-types/${id}`)
      return response
    } catch (error) {
      console.log(error)
    }
  }
}
