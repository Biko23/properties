import dateFormat from "dateformat";

// export const formatDate = (date) => {
//     return dateFormat(date, "dddd, mmmm dS, yyyy");
// }
export const formatDate = (dateToFormat) => {
    let currentDate = new Date();
    let returnedFormattedDate = new Date(dateToFormat);
    let difference = Math.abs(returnedFormattedDate - currentDate);
    let days = (difference/(1000 * 3600 * 24)).toFixed(0);
    console.log(days);

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

// export const userInfo = (username, activity, btn_clicked) => {

// }