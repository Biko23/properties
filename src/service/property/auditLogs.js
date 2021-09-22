import API from '@/config/connections'

export default {
  async postAUserLog (userLog) {
    try {
      const response = await API.marketPlaceApi.post(`/user-logs`, userLog)
      return response
    } catch (error) {
      throw new Error('An error occured when posting data')
    }
  },
  async getASingleUserLog (username) {
    try {
      const response = await API.marketPlaceApi.get(`/user-logs/by-username?user=${username}`)
      return response
    } catch (error) {
      throw new Error('An error occured when posting data')
    }
  }
}