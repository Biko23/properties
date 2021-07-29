import API from '../config/connections'
// property visuals
export default {
  async getAllPropertyVisuals () {
    try {
      const response = await API.propertyVisualsApi.get(`/property-visuals`)
      return response
    } catch (error) {
      throw new Error('An error occured when retrieving data')
    }
  },
  async getPropertyVisualsById (visuals_id) {
    try {
      const response = await API.propertyVisualsApi.get(`/property-visuals/${visuals_id}`)
      return response
    } catch (error) {
      throw new Error('An error occured when retrieving data')
    }
  },
  async postPropertyVisuals (propertyVisuals) {
    try {
          if (propertyVisuals) {
            let formData = new FormData();
            for (let file of propertyVisuals.files) {
              formData.append("file", file, file.name);
            }
            formData.append("description", propertyVisuals.description);
            formData.append("created_by", propertyVisuals.created_by);
            formData.append("updated_by", propertyVisuals.updated_by);
            console.log(formData);
            const response = await API.propertyVisualsApi.post('/property-visuals', formData)
            return response
          } else {
            console.log("there are no files.");
          }      
    } catch (error) {
      throw new Error('An error occured when sending data')
    }
  },
  async updateAPropertyVisual (propertyVisuals) {
    try {
      const response = await API.propertyVisualsApi.put(`/property-visuals/${propertyVisuals.visuals_id}`, propertyVisuals)
      return response
    } catch (error) {
      throw new Error('An error occured when updating data')
    }
  },
  async deleteAPropertyVisual (propertyVisuals) {
    try {
      const response = await API.propertyVisualsApi.delete(`/property-visuals/${propertyVisuals.visuals_id}`)
      return response
    } catch (error) {
      throw new Error('An error occured when deleting data')
    }
  }
}
