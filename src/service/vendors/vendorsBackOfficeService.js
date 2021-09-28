import API from '../../config/connections'
// neighborhood visuals
export default {
  async getVendorsCategories () {
    try {
      const response = await API.backOfficeApi.get(`/vendor-categories`)
      return response
    } catch (error) {
      throw new Error('An error occured when retrieving data')
    }
  },
  async postProfessional (vendorsProfession) {
    try {
      const response = await API.backOfficeApi.post('/vendors/self-register', vendorsProfession)
      console.log(response);
      return response
    } catch (error) {
      throw new Error('An error occured when sending data')
    }
  },
async getVendors (vendor_category_id) {
    try {
      // const response = await API.vendorsApi.get(`/vendors/vetted-vendors`)
      const response = await API.backOfficeApi.get(`/vendors/vendors-by-category/${vendor_category_id}`)
      return response
    } catch (error) {
      throw new Error('An error occured when retrieving data')
    }
  },
  async likeAVendor (data) {
    try {
      const response = await API.backOfficeApi.post(`/vendors/add-points/${data.vendor_id}/${data.liked_by}`)
      return response
    } catch (error) {
      console.log(error);
      // throw new Error('Failed to add a like')
    }
  },
  async unLikeAVendor (data) {
    try {
      const response = await API.backOfficeApi.post(`/vendors/deduct-points/${data.vendor_id}/${data.disliked_by}`)
      return response
    } catch (error) {
      console.log(error);
      // throw new Error('Failed to dislike this provider')
    }
  },
  async getListOfLikedVendorsByUserId (liked_by) {
    try {
      const response = await API.backOfficeApi.get(`/vendors/liked-by/${liked_by}`)
      return response
    } catch (error) {
      console.log(error)
    }
  },
  async getListOfUnlikedVendorsByUserId (disliked_by) {
    try {
      const response = await API.backOfficeApi.get(`/vendors/disliked-by/${disliked_by}`)
      return response
    } catch (error) {
      console.log(error)
    }
  }
}
