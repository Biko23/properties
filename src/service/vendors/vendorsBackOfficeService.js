import API from '../../config/connections'
// neighborhood visuals
export default {
  async getVendorsCategories () {
    try {
      const response = await API.vendorsApi.get(`/vendor-categories`)
      return response
    } catch (error) {
      throw new Error('An error occured when retrieving data')
    }
  },
  async postProfessional (vendorsProfession) {
    try {
      const response = await API.vendorsApi.post('/vendors/self-register', vendorsProfession)
      console.log(response);
      return response
    } catch (error) {
      throw new Error('An error occured when sending data')
    }
  },
//   async updateAProperty (neighborhoodVisuals) {
//     try {
//       const response = await API.neighborhoodVisualsApi.put(`/neighborhood-visuals/${neighborhoodVisuals.neighborhood_visuals_id}`, neighborhoodVisuals)
//       return response
//     } catch (error) {
//       throw new Error('An error occured when updating data')
//     }
//   },
//   async deleteAProperty (neighborhoodVisuals) {
//     try {
//       const response = await API.neighborhoodVisualsApi.delete(`/neighborhood-visuals/${neighborhoodVisuals.neighborhood_visuals_id}`)
//       return response
//     } catch (error) {
//       throw new Error('An error occured when deleting data')
//     }
//   }
}
