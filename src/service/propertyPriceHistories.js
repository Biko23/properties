/**
 * @author Isaac Ssemugenyi
 * @copyright flyhub Uganda Ltd
*/
import API from '../config/connections'

export default {
  async getPropertyPriceHistoriesByPropertyId (property_id) {
    try {
      const response = await API.marketPlaceApi.get(`property-price-histories/by-property-id/${property_id}`)
      return response
    } catch (error) {
      console.log(error);
      // throw new Error('An error occured when retrieving data')
    }
  },
}