import API from '../config/connections'
// neighborhood visuals
export default {
  async getNeighborhoodVisualsById (neighborhood_visuals_id) {
    try {
      const response = await API.marketPlaceApi.get(`/neighborhood-visuals/${neighborhood_visuals_id}`)
      return response
    } catch (error) {
      console.log(error);
      // throw new Error('An error occured when retrieving data')
    }
  },
  async getNeighborhoodVisualsByPropertyId(property_id) {
    try {
      const response = await API.marketPlaceApi.get(`/neighborhood-visuals/display-by-property-id/${property_id}`)
      return response
    } catch (error) {
      console.log(error);
      // throw new Error('An error occured when retrieving data')
    }
  },
  async postNeighborhoodVisuals (neighborhoodVisuals) {
    try {
      if (neighborhoodVisuals) {
        let formData = new FormData();
        for (let file of neighborhoodVisuals.files) {
          formData.append("file", file, file.name);
        }
        formData.append("description", neighborhoodVisuals.description);
        formData.append("property_id", neighborhoodVisuals.property_id);
        formData.append("created_by", neighborhoodVisuals.created_by);
        formData.append("updated_by", neighborhoodVisuals.updated_by);
        const response = await API.marketPlaceApi.post('/neighborhood-visuals', formData)
        return response
      } else {
        console.log("there are no files.");
      }  
    } catch (error) {
      console.log(error);
      // throw new Error('An error occured when sending data')
    }
  },
  async updateAProperty (neighborhoodVisuals) {
    try {
      const response = await API.marketPlaceApi.put(`/neighborhood-visuals/${neighborhoodVisuals.neighborhood_visuals_id}`, neighborhoodVisuals)
      return response
    } catch (error) {
      console.log(error);
      // throw new Error('An error occured when updating data')
    }
  },
  async deleteAProperty (neighborhoodVisuals) {
    try {
      const response = await API.marketPlaceApi.delete(`/neighborhood-visuals/${neighborhoodVisuals.neighborhood_visuals_id}`)
      return response
    } catch (error) {
      console.log(error);
      // throw new Error('An error occured when deleting data')
    }
  }
}
