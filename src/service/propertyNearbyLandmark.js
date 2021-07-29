import API from '../config/connections'
// property-nearby-landmarks
export default {
  async getAPropertyNearbyLandmarkById (property_nearby_landmark_id) {
    try {
      const response = await API.propertyNearbyLandmarkApi.get(`/property-nearby-landmarks/${property_nearby_landmark_id}`)
      return response
    } catch (error) {
      throw new Error('An error occured when retrieving data')
    }
  },
  async postAPropertyNearbyLandmark (propertyNearbyLandmark) {
    try {
      const response = await API.propertyNearbyLandmarkApi.post('/property-nearby-landmarks', propertyNearbyLandmark)
      return response
    } catch (error) {
      throw new Error('An error occured when sending data')
    }
  },
  async updateAPropertyNearbyLandmark (propertyNearbyLandmark) {
    try {
      const response = await API.propertyNearbyLandmarkApi.put(`/property-nearby-landmarks/${propertyNearbyLandmark.property_nearby_landmark_id}`, propertyNearbyLandmark)
      return response
    } catch (error) {
      throw new Error('An error occured when updating data')
    }
  },
  async deleteAPropertyNearbyLandmark (propertyNearbyLandmark) {
    try {
      const response = await API.propertyNearbyLandmarkApi.delete(`/property-nearby-landmarks/${propertyNearbyLandmark.property_nearby_landmark_id}`)
      return response
    } catch (error) {
      throw new Error('An error occured when deleting data')
    }
  }
}
