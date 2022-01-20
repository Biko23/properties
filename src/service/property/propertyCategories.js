import API from '../../config/connections'

export default {
  async getPropertyCategory () { //Flat, Apartments, Land
    try {
      const response = await API.marketPlaceApi.get('/property-types')
      return response
    } catch (error) {
      console.log(error);
      // throw new Error('An error occured when retrieving data');
    }
  }
}