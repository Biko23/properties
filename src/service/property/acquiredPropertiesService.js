import API from '../../config/connections'

export default {
  async getCurrentUserBoughtProperties (username) {
    try {
      const response = await API.marketPlaceApi.get(`/bought-properties/bought-properties/by-bought-by?bought_by=${username}`);
      return response
    } catch (error) {
      console.log(error);
    }
  },
  async getCurrentUserBoughtRentals (username) {
    try {
      const response = await API.marketPlaceApi.get(`/bought-properties/rented-properties/by-rented-by?rented_by=${username}`);
      return response
    } catch (error) {
      console.log(error);
    }
  }
}
