import dateFormat from "dateformat";

// const user = localStorage.getItem('currentUser') ? JSON.parse(localStorage.getItem('currentUser')) : '';
// const username = user != '' ? user.username : '';

// export function axiosInstance(currentInstance, url) {
//     return currentInstance.interceptors.request.use(
//         async config => {
//         config.baseURL = url,
//         config.timeout= 10000,
//         config.headers = { 
//             'Authorization': localStorage.getItem('token'),
//             username,
//             'Content-Type': 'application/json'
//         }
//         return config;
//         },
//         error => {
//         Promise.reject(error)
//     })
// }

export const formatDate = (dateToFormat) => {
    let currentDate = new Date();
    let returnedFormattedDate = new Date(dateToFormat);
    let difference = Math.abs(returnedFormattedDate - currentDate);
    let days = (difference/(1000 * 3600 * 24)).toFixed(0);
    let result;
    switch(+days){
        case 0:
            result = "Added today"; break;
        case 1:
            result = "1 days ago"; break;
        case 2:
            result = "2 days ago"; break;
        case 3:
            result = "3 days ago"; break;
        case 4:
            result = "4 days ago"; break;
        case 5:
            result = "5 days ago"; break;
        case 6:
            result = "6 days ago"; break;
        case 7:
            result = "7 days ago"; break;
        default: 
           result = dateFormat(returnedFormattedDate, "ddd, mmm dS, yyyy"); break;
    }
    return result;
}