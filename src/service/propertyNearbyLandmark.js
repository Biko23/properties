import API from '../config/connections'
// property-nearby-landmarks
export default {
  async getAPropertyNearbyLandmarkById (property_nearby_landmark_id) {
    try {
      const response = await API.marketPlaceApi.get(`/property-nearby-landmarks/${property_nearby_landmark_id}`)
      return response
    } catch (error) {
      throw new Error('An error occured when retrieving data')
    }
  },
  async getPropertyNearbyLandmarkByPropertyId(property_id) {
    try {
      const response = await API.marketPlaceApi.get(`/property-nearby-landmarks/by-property-id/${property_id}`)
      return response
    } catch (error) {
      throw new Error('An error occured when retrieving data')
    }
  },
  async postAPropertyNearbyLandmark (propertyNearbyLandmark) {
    try {
      if (propertyNearbyLandmark) {
        let formData = new FormData();
        for (let file of propertyNearbyLandmark.files) {
          formData.append("file", file, file.name);
        }
        formData.append("landmark_name", propertyNearbyLandmark.landmark_name);
        formData.append("distance_from_property", propertyNearbyLandmark.distance_from_property);
        formData.append("landmark_type_id", propertyNearbyLandmark.landmark_type_id);
        formData.append("description", propertyNearbyLandmark.description);
        formData.append("property_id", propertyNearbyLandmark.property_id);
        formData.append("created_by", propertyNearbyLandmark.created_by);
        formData.append("updated_by", propertyNearbyLandmark.updated_by);
        const response = await API.marketPlaceApi.post('/property-nearby-landmarks', formData)
        return response
      } else {
        console.log("there are no files.");
      }  

    } catch (error) {
      throw new Error('An error occured when sending data')
    }
  },
  async updateAPropertyNearbyLandmark (propertyNearbyLandmark) {
    try {
      const response = await API.marketPlaceApi.put(`/property-nearby-landmarks/${propertyNearbyLandmark.property_nearby_landmark_id}`, propertyNearbyLandmark)
      return response
    } catch (error) {
      throw new Error('An error occured when updating data')
    }
  },
  async deleteAPropertyNearbyLandmark (propertyNearbyLandmark) {
    try {
      const response = await API.marketPlaceApi.delete(`/property-nearby-landmarks/${propertyNearbyLandmark.property_nearby_landmark_id}`)
      return response
    } catch (error) {
      throw new Error('An error occured when deleting data')
    }
  }
}
