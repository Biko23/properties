import axios from 'axios';
import URL from './urls';

const user = localStorage.getItem('currentUser') ? JSON.parse(localStorage.getItem('currentUser')) : '';
const username = user != '' ? user.username : '';

const marketPlaceApi = axios.create();

marketPlaceApi.interceptors.request.use(
      async config => {
        config.baseURL = URL.marketPlaceUrl,
        config.timeout= 10000,
        config.headers = { 
          'Authorization': localStorage.getItem('token'),
          username,
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'
        }
        return config;
      },
      error => {
        Promise.reject(error)
});


export default {
    marketPlaceApi,
    vendorsApi: axios.create({  // Vendors  route
        baseURL: URL.vendorUrl,
        timeout: 10000,
        headers: {
            'content-type': 'application/json',
            'Access-Control-Allow-Origin': '*'
        }
    })
}
