/**
 * @author Isaac Ssemugenyi
 * @copyright flyhub Uganda Ltd
*/
import API from '../config/connections'

export default {
    async getAllPropertyFeatures () {
      try {
        const response = await API.marketPlaceApi.get('/property-features')
        return response
      } catch (error) {
        console.log(error);
        // throw new Error('An error occured when retrieving data');
      }
    },
    async getAllPropertyFeaturesByPropertyId (id) {
      try {
        const response = await API.marketPlaceApi.get(`/property-features/${id}`)
        return response
      } catch (error) {
        console.log(error);
        // throw new Error('An error occured when retrieving data');
      }
    }
  }