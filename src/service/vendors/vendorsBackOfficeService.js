import API from '../../config/connections'
// neighborhood visuals
export default {
  async getVendorsCategories () {
    try {
      const response = await API.vendorsApi.get(`/vendor-categories`)
      return response
    } catch (error) {
      throw new Error('An error occured when retrieving data')
    }
  },
  async postProfessional (vendorsProfession) {
    try {
      const response = await API.vendorsApi.post('/vendors/self-register', vendorsProfession)
      console.log(response);
      return response
    } catch (error) {
      throw new Error('An error occured when sending data')
    }
  },
async getVendors () {
    try {
      const response = await API.vendorsApi.get(`/vendors/vetted-vendors`)
      return response
    } catch (error) {
      throw new Error('An error occured when retrieving data')
    }
  },
  async likeAVendor (data) {
    try {
      const response = await API.vendorsApi.post(`/vendors/add-points/${data.vendor_id}/${data.liked_by}`)
      return response
    } catch (error) {
      //console.log(error)
      alert(error)
    }
  },
  async unLikeAVendor (data) {
    try {
      const response = await API.vendorsApi.post(`/vendors/deduct-points/${data.vendor_id}/${data.disliked_by}`)
      return response
    } catch (error) {
      console.log(error)
    }
  },
}
