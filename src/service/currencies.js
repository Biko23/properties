import API from '../config/connections'
export default{
 async getCurrencies(){
     try{
        const response = await API.marketPlaceApi.get(`/currencies`)
        return response
     }catch(error){
        console.log(error);
        //  throw new Error("Error occured while retrieving Currencies")
     }
 }
}