// import Vue from 'vue'
// import axios from 'axios'

// const customInterceptor = {
//     install(Vue) {  
//         Vue.myInstance = function() {
//           return interceptors.request.use(
//             async config => {
//               config.baseURL = URL.propertyUrl,
//               config.timeout= 10000,
//               config.headers = { 
//                 'Authorization': localStorage.getItem('token'),
//                 username,
//                 'Content-Type': 'application/json'
//               }
//               return config;
//             },
//             error => {
//               Promise.reject(error)
//           })
//         }
//       }
// }

// // Vue.use(customInterceptor)

  
//   export default customInterceptor