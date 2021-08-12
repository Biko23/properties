import API from '../config/connections'
export default{
 async getCurrencies(){
     try{
        const response = await API.propertyValueApi.get(`/currencies`)
        return response
     }catch(error){
         throw new Error("Error occured while retrieving Currencies")
     }
 }
}