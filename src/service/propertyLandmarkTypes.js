import API from '../config/connections'

export default {
    async getAllPropertyLandmarkTypes () {
      try {
        const response = await API.marketPlaceApi.get('/landmark-types')
        return response
      } catch (error) {
        console.log(error);
        // throw new Error('An error occured when retrieving data');
        // { name: 'Error', message: 'String you pass in the constructor' }
      }
    }
}