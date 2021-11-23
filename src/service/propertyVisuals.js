import API from '../config/connections'
// property visuals
export default {
  // Returns all visuals where is_main = true
  async getAllPropertyVisuals() {
    try {
      const response = await API.marketPlaceApi.get(`/property-visuals/display-main-visual`)
      return response
    } catch (error) {
      console.log(error);
      // throw new Error('An error occured when retrieving data')
    }
  },
  // ------------------------------------------ latest properties
  async getLatestPropertyVisuals() {
    try {
      const response = await API.marketPlaceApi.get(`/property-visuals/display-latest-properties`)
      return response
    } catch (error) {
      console.log(error);
      // throw new Error('An error occured when retrieving data')
    }
  },
  async getPropertyVisualsById(visuals_id) {
    try {
      const response = await API.marketPlaceApi.get(`/property-visuals/${visuals_id}`)
      return response
    } catch (error) {
      console.log(error);
      // throw new Error('An error occured when retrieving data')
    }
  },
  async getPropertyVisualsByPropertyId(property_id) {
    try {
      const response = await API.marketPlaceApi.get(`/property-visuals/display-by-property-id/${property_id}`)
      return response
    } catch (error) {
      console.log(error);
      // throw new Error('An error occured when retrieving data')
    }
  },
  async postPropertyVisuals(propertyVisuals) {
    try {
      // review
      if (propertyVisuals) {
        const { created_by, description, files, property_id, updated_by } = propertyVisuals;
        let formData = new FormData();
        if(Array.isArray(files)){
          for (let file of files) {
            formData.append("file", file, file.name);
          }
        } else {
          formData.append("file", files, files.name);
        }
       
        formData.append("description", description);
        formData.append("property_id", property_id);
        formData.append("created_by", created_by);
        formData.append("updated_by", updated_by);
        const response = await API.marketPlaceApi.post('/property-visuals', formData);
        return response
      } else {
        console.log("there are no files.");
      }
    } catch (error) {
      console.log(error);
      // throw new Error('An error occured when sending data')
    }
  },
  async updateAPropertyVisual(propertyVisuals) {
    try {
      let formData = new FormData();
      formData.append("file", propertyVisuals.editedVisualImage, propertyVisuals.editedVisualImage.name);
      formData.append("description", propertyVisuals.description);
      formData.append("visuals_id", propertyVisuals.visuals_id);
      formData.append("updated_by", propertyVisuals.updated_by);
      const response = await API.marketPlaceApi.put(`/property-visuals/${propertyVisuals.visuals_id}`, formData)
      return response
    } catch (error) {
      throw new Error(error.message);
    }
  },
  async deleteAPropertyVisual(propertyVisuals) {
    try {
      const response = await API.marketPlaceApi.delete(`/property-visuals/${propertyVisuals.visuals_id}`)
      return response
    } catch (error) {
      console.log(error);
      // throw new Error('An error occured when deleting data')
    }
  }
}
