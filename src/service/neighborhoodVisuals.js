/**
 * @author Isaac Ssemugenyi
 * @copyright flyhub Uganda Ltd
*/
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
        const { description, files, property_id, created_by, updated_by } = neighborhoodVisuals;

        let formData = new FormData();

        if(Array.isArray(files)){
          for (let file of files) {
            formData.append("file", file, file.name);
          }
        } else {
          formData.append("file", files, files.name);
        }

        formData.append("description",description);
        formData.append("property_id", property_id);
        formData.append("created_by", created_by);
        formData.append("updated_by", updated_by);
        const response = await API.marketPlaceApi.post('/neighborhood-visuals', formData)
        return response
      } else {
        console.log("there are no files.");
      } 
    } catch (error) {
      throw new Error(error.message);
    }
  },
  async updateAProperty (neighborhoodVisuals) {
    try {
      let formData = new FormData();
      formData.append("file", neighborhoodVisuals.editedVisualImage, neighborhoodVisuals.editedVisualImage.name);
      formData.append("description", neighborhoodVisuals.description);
      formData.append("property_id", neighborhoodVisuals.property_id);
      formData.append("created_by", neighborhoodVisuals.created_by);
      formData.append("updated_by", neighborhoodVisuals.updated_by);

      const response = await API.marketPlaceApi.put(`/neighborhood-visuals/${neighborhoodVisuals.neighborhood_visuals_id}`, formData);
      return response
    } catch (error) {
      throw new Error(error.message)
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
