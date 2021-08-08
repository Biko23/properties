import dateFormat from "dateformat";

export const formatDate = (date) => {
    return dateFormat(date, "dddd, mmmm dS, yyyy");
}