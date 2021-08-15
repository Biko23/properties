import API from '../../config/connections'

export default {
  async getPropertyCategory () {
    try {
      const response = await API.propertyTypesApi.get('/property-types')
      return response
    } catch (error) {
      throw new Error('An error occured when retrieving data');
    }
  }
}