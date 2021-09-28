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
            console.log("rental", property_id);
            const response = await API.marketPlaceApi.get(`/property-rental-values/by-property-id/${property_id}`);
            return response
        } catch (error) {
            console.log(error);
            // throw new Error('An error occured when retrieving data')
        }
    }
}


