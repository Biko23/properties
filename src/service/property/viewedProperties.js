/**
 * @author Isaac Ssemugenyi
 * @copyright flyhub Uganda Ltd
*/
import API from '../../config/connections'

export default {
    async postViewedProperty(propertyViewed) {
        try {
            const response = await API.marketPlaceApi.post(`/viewed-properties`, propertyViewed)
            return response
        } catch (error) {
            throw new Error(error.message);
        }
    },
    async getViewedPropertyForRent(username) {
        try {
            const response = await API.marketPlaceApi.get(`/viewed-properties/for-rent?user=${username}`)
            return response
        } catch (error) {
            throw new Error(error.message);
        }
    },
    async getViewedPropertyForSale(username) {
        try {
            const response = await API.marketPlaceApi.get(`/viewed-properties/for-sale?user=${username}`)
            return response
        } catch (error) {
            throw new Error(error.message);
        }
    }
}
