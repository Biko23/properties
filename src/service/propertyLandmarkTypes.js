import API from '../config/connections'

export default {
    async getAllPropertyLandmarkTypes () {
      try {
        const response = await API.landmarkTypeApi.get('/landmark-types')
        return response
      } catch (error) {
        console.log(error)
      }
    }
}