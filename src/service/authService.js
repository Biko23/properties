/**
 * @author Isaac Ssemugenyi
 * @copyright flyhub Uganda Ltd
*/
import API from '../config/connections'

export default {
  async getCurrentLoggedinUserByID (user_id) {
    try {
      const response = await API.marketPlaceApi.get(`/users/${user_id}`)
      return response
    } catch (error) {
      console.log(error);
      // throw new Error('An error occured when retrieving data')
    }
  },
  async signupANewUser(newUser) {
    try {
      const response = await API.marketPlaceApi.post('/users', newUser)
      return response
    } catch (error) {
      console.log(error);
        // throw new Error(error);
    }
  },
  async loggingUser (loginUser) {
    try {
      const response = await API.marketPlaceApi.post('/authenticate', loginUser)
      return response
    } catch (error) {
      console.log(error);
      // throw new Error('An error occured when sending data')
    }
  },
  async autoUpdateToken(){
    try {
      const response = await API.marketPlaceApi.post('/authenticate/activate-token');
      return response
    } catch (error) {
      console.log(error);
    }
  },
  async fetchLoggedUser(username){
    try {
      const response = await API.marketPlaceApi.get(`/users/user?username=${username}`)
      return response
    } catch (error) {
      console.log(error);
      // throw new Error('An error occured when getting user data')
    }
  },
  async updateUserProfile(user) {
    console.log('user', user);
    try {
      const response = await API.marketPlaceApi.put(`/users/${user.user_id}`, user)
      const roleResponse = await API.marketPlaceApi.post(`/users/add-role/${user.user_id}/${user.role_id}`)
      return {
        userUpdateResponse: response,
        roleResponse: roleResponse
      }
    } catch (error) {
      console.log(error);
      // throw new Error('An error occured when updating data')
    }
  },
  async updateUserProfileOnly(payload){
    try {
      const response = await API.marketPlaceApi.put(`/users/${payload.user_id}`, payload);
      return response;
    } catch (error) {
      console.log(error);
      // throw new Error('An error occured when updating data')
    }
  },
  async deleteAUserAccount (user) {
    try {
      const response = await API.marketPlaceApi.delete(`/users/${user.user_id}`)
      return response
    } catch (error) {
      console.log(error);
      // throw new Error('An error occured when deleting data')
    }
  },
  async getAllUserRoles () {
    try {
      const response = await API.marketPlaceApi.get('/roles')
      return response;
    } catch (error) {
      console.log(error);
      // throw new Error('An error occured while fetching user roles')
    }
  },

  async generatePasswordResetOTP (userEmail) {
    try {
      const response = await API.marketPlaceApi.post(`/users/generate-password-reset-otp/${userEmail}`)
      return response;
    } catch (error) {
      throw new Error(error.message)
    }
  },
  async validateSubmittedOTP (user) {
    try {
      const response = await API.marketPlaceApi.post(`/users/validate-otp?email=${user.userEmail}&otp=${user.userOTP}`)
      return response;
    } catch (error) {
      throw new Error(error.message)
    }
  },
  async resetPassword (user) {
    try {
      const response = await API.marketPlaceApi.post(`/users/reset-password?email=${user.userEmail}&otp=${user.userOTP}&new_password=${user.userPassword}`)
      return response;
    } catch (error) {
      throw new Error(error.message)
    }
  }
}
