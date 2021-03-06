/**
 * @author Isaac Ssemugenyi
 * @copyright flyhub Uganda Ltd
*/
import API from '../../config/connections'

export default {
    async postAFavoriteProperty(favoriteProperty) {
        try {
            const response = await API.marketPlaceApi.post(`/saved-properties`, favoriteProperty)
            return response
            // response.status == 201 && response.data.status == 1 success
            // response.status == 201 && response.data.status == 0 Already Exists in favorites
            // {
            //     "username":"alexkisoro",
            //     "property_id":89
            // }
        } catch (error) {
            console.log(error);
            // throw new Error('An error occured when posting data')
        }
    },
    async removeAPropertyFromFavorites(favoriteProperty) {
        try {
            console.log(favoriteProperty);
            const response = await API.marketPlaceApi.post(`/saved-properties/remove-favorite-property`, favoriteProperty)
            return response
        } catch (error) {
            console.log(error);
            // throw new Error('An error occured when posting data')
        }
    },
    async getTotalCountOfFavoriteProperties(username) {
        try {
            const response = await API.marketPlaceApi.get(`/saved-properties/total-liked-properties?user=${username}`)
            return response
        } catch (error) {
            console.log(error);
            // throw new Error('An error occured when retrieving data')
        }
    },
    async getFavoritePropertiesForComparision(username) {
        try {
            const response = await API.marketPlaceApi.get(`/saved-properties/by-username?user=${username}`)
            return response
        } catch (error) {
            console.log(error);
            // throw new Error('An error occured when retrieving data')
        }
    },
    async getAllCurrentUserFavoriteRentalProperties(username) {
        try {
            const response = await API.marketPlaceApi.get(`/saved-properties/for-rent?user=${username}`)
            return response
        } catch (error) {
            console.log(error);
            // throw new Error('An error occured when retrieving data')
        }
    },
    async getAllCurrentUserFavoriteSaleProperties(username) {
        try {
            const response = await API.marketPlaceApi.get(`/saved-properties/for-sale?user=${username}`)
            return response
        } catch (error) {
            console.log(error);
            // throw new Error('An error occured when retrieving data')
        }
    }
}

