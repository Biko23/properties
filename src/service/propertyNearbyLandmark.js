import API from '../config/connections'
// property-nearby-landmarks
export default {
  async getAPropertyNearbyLandmarkById (property_nearby_landmark_id) {
    try {
      const response = await API.marketPlaceApi.get(`/property-nearby-landmarks/${property_nearby_landmark_id}`)
      return response
    } catch (error) {
      console.log(error);
      // throw new Error('An error occured when retrieving data')
    }
  },
  async getPropertyNearbyLandmarkByPropertyId(property_id) {
    try {
      const response = await API.marketPlaceApi.get(`/property-nearby-landmarks/by-property-id/${property_id}`)
      return response
    } catch (error) {
      console.log(error);
      // throw new Error('An error occured when retrieving data')
    }
  },
  async postAPropertyNearbyLandmark (propertyNearbyLandmark) {
    try {

      if (propertyNearbyLandmark) {
        const { 
          landmark_name, distance_from_property, landmark_type_id, description,
          files, property_id, created_by, updated_by
         } = propertyNearbyLandmark;

        let formData = new FormData();

        if(Array.isArray(files)){
          for (let file of files) {
            formData.append("file", file, file.name);
          }
        } else {
          formData.append("file", files, files.name);
        }
        formData.append("landmark_name", landmark_name);
        formData.append("distance_from_property", distance_from_property);
        formData.append("landmark_type_id", landmark_type_id);
        formData.append("description", description);
        formData.append("property_id", property_id);
        formData.append("created_by", created_by);
        formData.append("updated_by", updated_by);
        const response = await API.marketPlaceApi.post('/property-nearby-landmarks', formData)
        return response
      }
    } catch (error) {
      throw new Error(error.message)
    }
  },
  async updateAPropertyNearbyLandmark (propertyNearbyLandmark) {
    try {
      let formData = new FormData();
      formData.append("file", propertyNearbyLandmark.editedVisualImage, propertyNearbyLandmark.editedVisualImage.name);
      formData.append("landmark_name", propertyNearbyLandmark.landmark_name);
      formData.append("distance_from_property", propertyNearbyLandmark.distance_from_property);
      formData.append("landmark_type_id", propertyNearbyLandmark.landmark_type_id);
      formData.append("description", propertyNearbyLandmark.description);
      formData.append("property_id", propertyNearbyLandmark.property_id);
      formData.append("created_by", propertyNearbyLandmark.created_by);
      formData.append("updated_by", propertyNearbyLandmark.updated_by);
      const response = await API.marketPlaceApi.put(`/property-nearby-landmarks/${propertyNearbyLandmark.property_nearby_landmark_id}`, formData)
      return response
    } catch (error) {
      throw new Error(error.message)
    }
  },
  async deleteAPropertyNearbyLandmark (propertyNearbyLandmark) {
    try {
      const response = await API.marketPlaceApi.delete(`/property-nearby-landmarks/${propertyNearbyLandmark.property_nearby_landmark_id}`)
      return response
    } catch (error) {
      console.log(error);
      // throw new Error('An error occured when deleting data')
    }
  }
}
