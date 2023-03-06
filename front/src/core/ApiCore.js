import axios from 'axios'
import queryString from 'query-string'
import { API_URL } from '../config'

export const getProducts=async(params)=>{
  let query=queryString.stringify(params)
    return axios.get(`${API_URL}/product?${query}`).then(res=>res.data).catch(err=>err.message)
}


export const getCategories=async()=>{
   return axios.get(`${API_URL}/category`).then(res=>res.data).catch(err=>err.message)
}

export const getRelatedProduct=async(id)=>{
   return axios.get(`${API_URL}/product/related/${id}`).then(res=>res.data).catch(err=>err.message)
}

export const getBraintreeToken=async(userId,token)=>{
 
   return  axios.get(`${API_URL}/braintree/getToken/${userId}`,{
      headers:{
         ContentType:"application/json",
         Authorization:`Bearer ${token}`
      }
   }).then(res=>res.data)
}

export const processPayment=async(userId,token,paymentData)=>{
 
   return fetch(`${API_URL}/braintree/purchase/${userId}`,{
      method:"POST",
      headers:{
                  Accept:"application/json",
                  "Content-Type":"application/json",
                  Authorization:`Bearer ${token}`
               },
               body:JSON.stringify({paymentData})
   }).then(res=>res.json())
}

export const createOrder = (userId, token, orderData) => {
   return fetch(`${API_URL}/order/create/${userId}`, {
     method: "POST",
     headers: {
       Accept: "application/json",
       "Content-Type": "application/json",
       Authorization:`Bearer ${token}`,
     },
     body: JSON.stringify({orderData}),
   })
     .then(res =>  res.json());
 };



export const getProduct=async(id)=>{
   return axios.get(`${API_URL}/product/${id}`).then(res=>res.data).catch(err=>err.message)
}

export const searchProducts=async(skip,limit,filters)=>{

  return  axios.post(`${API_URL}/product/search`,{skip,limit,filters}).then(res=>res.data).catch(err=>err.message)
}