import API from '../../config/connections'

export default {
  async getAllProperty () {
    try {
      const response = await API.marketPlaceApi.get('/properties')
      return response
    } catch (error) {
      console.log(error);
      // throw new Error('An error occured when retrieving data')
    }
  },
  async getPropertyById (property_id) {
    try {
      const response = await API.marketPlaceApi.get(`/properties/${property_id}`)
      return response
    } catch (error) {
      console.log(error);
      // throw new Error('An error occured when retrieving data')
    }
  },
  async getAllPropertyForSale(is_listed_for_id) { //return properties based on Sale id
    try {
      const response = await API.marketPlaceApi.get(`/properties/search-listed-for/${is_listed_for_id}`)
      return response
    } catch (error) {
      console.log(error);
      // throw new Error('An error occured when retrieving data')
    }
  },
  async getAllPropertyForRent(is_listed_for_id) { //return properties based on Rent id
    try {
      const response = await API.marketPlaceApi.get(`/properties/search-listed-for-rent/${is_listed_for_id}`)
      return response
    } catch (error) {
      console.log(error);
      // throw new Error('An error occured when retrieving data')
    }
  },
  async getSearchedProperties(keyword) {
    try {
      const response = await API.marketPlaceApi.get(`/properties/search-properties?key=${keyword}`);
      return response;
    } catch (error) {
      console.log(error);
      // throw new Error('An error occured when fetching data')
    }
  },
  async postAProperty (property) {
    try {
      const response = await API.marketPlaceApi.post('/properties', property)
      return response
    } catch (error) {
      console.log(error);
      // throw new Error('An error occured when sending data')
    }
  },
  async updateAProperty (property) {
    try {
      const response = await API.marketPlaceApi.put(`/properties/${property.property_id}`, property)
      return response
    } catch (error) {
      console.log(error);
      // throw new Error('An error occured when updating data')
    }
  },
  async deleteAProperty (property) {
    try {
      const response = await API.marketPlaceApi.delete(`/properties/${property.property_id}`)
      return response
    } catch (error) {
      console.log(error);
      // throw new Error('An error occured when deleting data')
    }
  },
  async getListedPropertiesByUsername(username) {
    try {
      const response = await API.marketPlaceApi.get(`/properties/listed-properties/by-username?username=${username}`);
      return response;
    } catch (error) {
      throw new Error(error);
    }
  },
  async getUncertifiedPropertiesByUsername(username) {
    try {
      const response = await API.marketPlaceApi.get(`/properties/pending-certification-properties/by-username?username=${username}`);
      return response;
    } catch (error) {
      console.log(error);
      // throw new Error(error);
    }
  },
  async getUnlistedPropertiesByUsername(username) {
    try {
      const response = await API.marketPlaceApi.get(`/properties/unlisted-properties/by-username?username=${username}`);
      return response;
    } catch (error) {
      throw new Error(error.message);
    }
  },
  // ----------- Rentals
  async getListedRentalsByUsername(username) {
    try {
      const response = await API.marketPlaceApi.get(`/properties/listed-rentals/by-username?username=${username}`);
      return response;
    } catch (error) {
      throw new Error(error);
    }
  },
  async getUnlistedRentalsByUsername(username) {
    try {
      const response = await API.marketPlaceApi.get(`/properties/unlisted-rentals/by-username?username=${username}`);
      return response;
    } catch (error) {
      throw new Error(error);
    }
  },
  async getUncertifiedRentalsByUsername(username) {
    try {
      const response = await API.marketPlaceApi.get(`/properties/pending-certification-rentals/by-username?username=${username}`);
      return response;
    } catch (error) {
      throw new Error(error);
    }
  },
  async unlistPropertyFromMarketPlace(property_id){
    try {
      const response = await API.marketPlaceApi.put(`/properties/unlist-property-by-landlord/${property_id}`);
      return response;
    } catch (error) {
      throw new Error(error.message);
    }
  },
  async requestToListPropertyBackOnMarketPlace(property_id){
    try {
      const response = await API.marketPlaceApi.put(`/properties/request-to-recertify-property/${property_id}`);
      return response;
    } catch (error) {
      throw new Error(error.message);
    }
  },
  // ------------------------------------------ latest properties
  async getLatestListedProperties() {
    try {
      const response = await API.marketPlaceApi.get(`/properties/latest-properties-for-sale`)
      return response
    } catch (error) {
      throw new Error(error.message)
    }
  },
  async getLatestListedRentals() {
    try {
      const response = await API.marketPlaceApi.get(`/properties/latest-rentals`)
      return response
    } catch (error) {
      throw new Error(error.message)
    }
  },
  async getSimilarProperties(propertyDetails){
    try {
      const response = await API.marketPlaceApi.get(`/properties/similar-properties?property_value=${propertyDetails.property_value}&property_type=${propertyDetails.property_type}&district=${propertyDetails.property_district}&listed_for=${propertyDetails.listed_for}`);
      return response;
    } catch (error) {
      throw new Error(error.message)
    }
  },
  async getAdvancedSearchedProperties(searchParameters){
    try {
      const response = await API.marketPlaceApi.get(`/properties/advanced-property-search?lower_price=${searchParameters.lower_price}&upper_price=${searchParameters.upper_price}&main_feature=${searchParameters.main_feature}&category=${searchParameters.category}&landmark=${searchParameters.landmark}&district=${searchParameters.district}&division=${searchParameters.division}&suburb=${searchParameters.suburb}`);
      return response;
    } catch (error) {
      throw new Error(error.message)
    }
  }
}


