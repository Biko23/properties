import API from '../config/connections'
// property visuals
export default {
  // Returns all visuals where is_main = true
  async getAllPropertyVisuals() {
    try {
      const response = await API.propertyVisualsApi.get(`/property-visuals/display-main-visual`)
      return response
    } catch (error) {
      throw new Error('An error occured when retrieving data')
    }
  },
  async getPropertyVisualsById(visuals_id) {
    try {
      const response = await API.propertyVisualsApi.get(`/property-visuals/${visuals_id}`)
      return response
    } catch (error) {
      throw new Error('An error occured when retrieving data')
    }
  },
  async getUncertifiedPropertyVisualsByUsername(username) {
    try {
      const response = await API.propertyVisualsApi.get(`/property-visuals/display-uncertified-property-by-username/${username}`);
      return response;
    } catch (error) {
      throw new Error(error);
    }
  },
  async getListedPropertyVisualsByUsername(username) {
    try {
      const response = await API.propertyVisualsApi.get(`/property-visuals/display-listed-property-by-username/${username}`);
      return response;
    } catch (error) {
      throw new Error(error);
    }
  },
  async getUnlistedPropertyVisualsByUsername(username) {
    try {
      const response = await API.propertyVisualsApi.get(`/property-visuals/display-unlisted-property-by-username/${username}`);
      return response;
    } catch (error) {
      throw new Error(error);
    }
  },
  async updatePropertyVisualAvailabilityStatus(property_id){
    try {
      const visualsResponse = await API.propertyVisualsApi.put(`/property-visuals/property-visual-available-or-unavailable/${property_id}`);
      const propertyResponse = await API.propertyApi.put(`/properties/change-property-available-status/${property_id}`);
      if(
        (visualsResponse.status === 200 || visualsResponse.status === 201) &&
        (propertyResponse.status === 200 || propertyResponse.status === 201)
        ){
          return {
            visualsResponse, propertyResponse
          }
        }
    } catch (error) {
      throw new Error(error);
    }
  },
  async getPropertyVisualsByPropertyId(property_id) {
    try {
      const response = await API.propertyVisualsApi.get(`/property-visuals/display-by-property-id/${property_id}`)
      return response
    } catch (error) {
      throw new Error('An error occured when retrieving data')
    }
  },
  async postPropertyVisuals(propertyVisuals) {
    try {
      if (propertyVisuals) {
        let formData = new FormData();
        for (let file of propertyVisuals.files) {
          formData.append("file", file, file.name);
        }
        formData.append("description", propertyVisuals.description);
        formData.append("property_id", propertyVisuals.property_id);
        formData.append("created_by", propertyVisuals.created_by);
        formData.append("updated_by", propertyVisuals.updated_by);
        const response = await API.propertyVisualsApi.post('/property-visuals', formData)
        return response
      } else {
        console.log("there are no files.");
      }
    } catch (error) {
      throw new Error('An error occured when sending data')
    }
  },
  async updateAPropertyVisual(propertyVisuals) {
    try {
      const response = await API.propertyVisualsApi.put(`/property-visuals/${propertyVisuals.visuals_id}`, propertyVisuals)
      return response
    } catch (error) {
      throw new Error('An error occured when updating data')
    }
  },
  async deleteAPropertyVisual(propertyVisuals) {
    try {
      const response = await API.propertyVisualsApi.delete(`/property-visuals/${propertyVisuals.visuals_id}`)
      return response
    } catch (error) {
      throw new Error('An error occured when deleting data')
    }
  }
}
