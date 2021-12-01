import axios from 'axios';
import URL from './urls';

// const Cryptr = require('cryptr');
// const cryptr = new Cryptr('kfkfkfdkdsksdsdksdkdsksdkdsksdk4304040dkdsksdkdsk');
// const user = localStorage.getItem('currentUser') ? JSON.parse(localStorage.getItem('currentUser')) : '';
// const username = user != '' ? user.username : localStorage.getItem('token') !== null ? decode(localStorage.getItem('token')).sub : '';

const marketPlaceApi = axios.create();
const backOfficeApi = axios.create();

marketPlaceApi.interceptors.request.use(
      async config => {
        config.baseURL = URL.marketPlaceUrl,
        config.timeout= 10000,
        config.headers = { 
          'Authorization': localStorage.getItem('token'),
          'username': localStorage.getItem('username'),
          // 'username': cryptr.decrypt(localStorage.getItem('username')),
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'
        }
        return config;
      },
      error => {
        Promise.reject(error)
});

backOfficeApi.interceptors.request.use(
  async config => {
    config.baseURL = URL.backOfficeUrl,
    config.timeout= 10000,
    config.headers = { 
      'Authorization': process.env.VUE_APP_ACCESS_TOKEN,
      'username': process.env.VUE_APP_ACCESS_USERNAME,
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*'
    }
    return config;
  },
  error => {
    Promise.reject(error)
});


export default {
    marketPlaceApi: marketPlaceApi,
    backOfficeApi: backOfficeApi 
}
