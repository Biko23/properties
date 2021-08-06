import API from '../config/connections'

export default {
  async getCurrentLoggedinUserByID (user_id) {
    try {
      const response = await API.userApi.get(`/users/${user_id}`)
      return response
    } catch (error) {
      throw new Error('An error occured when retrieving data')
    }
  },
  async signupANewUser(newUser) {
    try {
      const response = await API.userApi.post('/users', newUser)
      return response
    } catch (error) {
      throw new Error('An error occured when sending data')
    }
  },
  async loggingUser (loginUser) {
    try {
      const response = await API.userApi.post('/authenticate', loginUser)
      return response
    } catch (error) {
      throw new Error('An error occured when sending data')
    }
  },
  async fetchLoggedUser(username){
    try {
      const response = await API.userApi.get(`/users/user?username=${username}`)
      return response
    } catch (error) {
      console.log(error);
      throw new Error('An error occured when getting user data')
    }
  },
  async updateUserProfile (user) {
    try {
      const response = await API.userApi.put(`/users/${user.user_id}`, user)
      return response
    } catch (error) {
      throw new Error('An error occured when updating data')
    }
  },
  async deleteAUserAccount (user) {
    try {
      const response = await API.userApi.delete(`/property-locations/${user.user_id}`)
      return response
    } catch (error) {
      throw new Error('An error occured when deleting data')
    }
  }
}
