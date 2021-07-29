import API from '../config/connections'

export default {
    async getAllPropertyLandmarkTypes () {
      try {
        const response = await API.landmarkTypeApi.get('/landmark-types')
        return response
      } catch (error) {
        throw new Error('An error occured when retrieving data');
        // { name: 'Error', message: 'String you pass in the constructor' }
      }
    }
}