/**
 * @author Isaac Ssemugenyi
 * @copyright flyhub Uganda Ltd
*/
import API from '../../config/connections'

export default {
  async expressInterestInProperty (property) {
    try {
      const response = await API.marketPlaceApi.post('/high-value-properties', property);
      return response
    } catch (error) {
      console.log(error);
    }
  },
  async getCurrentUserInterestedInProperties (username) {
    try {
      const response = await API.marketPlaceApi.get(`/high-value-properties/high-value-properties-for-sale/by-username?username=${username}`);
      return response
    } catch (error) {
      console.log(error);
    }
  },
  async getCurrentUserInterestedInRentals (username) {
    try {
      const response = await API.marketPlaceApi.get(`/high-value-properties/high-value-properties-for-rent/by-username?username=${username}`);
      return response
    } catch (error) {
      console.log(error);
    }
  },
  async checkIfUserIsInterestedInAProperty (payload) {
    try {
      const response = await API.marketPlaceApi.get(`/high-value-properties/check-whether-user-is-interested-in-property/${payload.property_id}?username=${payload.username}`);
      return response
    } catch (error) {
      console.log(error);
    }
  }
}
