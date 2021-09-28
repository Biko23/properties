import API from '../../config/connections'

export default {
    async postViewedProperty(propertyViewed) {
        try {
            const response = await API.marketPlaceApi.post(`/viewed-properties`, propertyViewed)
            return response
        } catch (error) {
            console.log(error);
            // throw new Error('An error occured when retrieving data')
        }
    },
    async getViewedPropertyForRent(username) {
        try {
            const response = await API.marketPlaceApi.get(`/viewed-properties/for-rent?user=${username}`)
            return response
        } catch (error) {
            console.log(error);
            // throw new Error('An error occured when retrieving data')
        }
    },
    async getViewedPropertyForSale(username) {
        try {
            const response = await API.marketPlaceApi.get(`/viewed-properties/for-sale?user=${username}`)
            return response
        } catch (error) {
            console.log(error);
            // throw new Error('An error occured when retrieving data')
        }
    }
}
