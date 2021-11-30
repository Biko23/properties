import API from"../config/connections"

export default {
    async postPropertyRentalValue(propertyRentalValue) {
        try {
            const response = await API.marketPlaceApi.post(`/property-rental-values`, propertyRentalValue);
            return response
        } catch (error) {
            console.log(error);
            // throw new Error('An error occured when retrieving data')
        }
    },
    async getPropertyRentalValueByPropertyId(property_id) {
        try {
            const response = await API.marketPlaceApi.get(`/property-rental-values/by-property-id/${property_id}`);
            return response
        } catch (error) {
            console.log(error);
            // throw new Error('An error occured when retrieving data')
        }
    },
    async updatePropertyRentalValue(propertyRentalValue) {
        try {
            const response = await API.marketPlaceApi.put(`/property-rental-values/${propertyRentalValue.rental_value_id}`, propertyRentalValue);
            return response
        } catch (error) {
            throw new Error(error.message);
        }
    }
}


