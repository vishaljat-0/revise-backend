 import axios from "axios"
const productInstance = axios.create({
    baseURL:"/api/seller/",
    withCredentials:true
})
   export const createProductApi=async(formdata)=>{
    const response = await productInstance.post("/productAdd",formdata)
     return response.data
  }
    export const getProductsApi=async()=>{
    const response = await productInstance.get("/getProducts")
     return response.data
  }