import API from '../config/connections'
// neighborhood visuals
export default {
  async getNeighborhoodVisualsById (neighborhood_visuals_id) {
    try {
      const response = await API.neighborhoodVisualsApi.get(`/neighborhood-visuals/${neighborhood_visuals_id}`)
      return response
    } catch (error) {
      throw new Error('An error occured when retrieving data')
    }
  },
  async postNeighborhoodVisuals (neighborhoodVisuals) {
    try {
      const response = await API.neighborhoodVisualsApi.post('/neighborhood-visuals', neighborhoodVisuals)
      return response
    } catch (error) {
      throw new Error('An error occured when sending data')
    }
  },
  async updateAProperty (neighborhoodVisuals) {
    try {
      const response = await API.neighborhoodVisualsApi.put(`/neighborhood-visuals/${neighborhoodVisuals.neighborhood_visuals_id}`, neighborhoodVisuals)
      return response
    } catch (error) {
      throw new Error('An error occured when updating data')
    }
  },
  async deleteAProperty (neighborhoodVisuals) {
    try {
      const response = await API.neighborhoodVisualsApi.delete(`/neighborhood-visuals/${neighborhoodVisuals.neighborhood_visuals_id}`)
      return response
    } catch (error) {
      throw new Error('An error occured when deleting data')
    }
  }
}
