import axios from "axios"
import { API_URL } from "../../config"




// export const lisOrders=async(userId,token)=>{
 
//     return  axios.get(`${API_URL}/order/${userId}`,{
//        headers:{
//           "Content-Type":"application/json",
//           Authorization:`Bearer ${token}`
//        }
//     }).then(res=>res.data)
//  }

 export const listOrders=async(userId,token)=>{
 
    return fetch(`${API_URL}/order/${userId}`,{
       method:"GET",
       headers:{
                   "Content-Type":"application/json",
                   Authorization:`Bearer ${token}`
                },
    }).then(res=>res.json())
 }
 export const getStatus=async(userId,token)=>{
 
    return fetch(`${API_URL}/order/status/${userId}`,{
       method:"GET",
       headers:{
                   "Content-Type":"application/json",
                   Authorization:`Bearer ${token}`
                },
    }).then(res=>res.json())
 }

 export const updateOrderStatus=async(userId,token,orderId,status)=>{
 
    return fetch(`${API_URL}/order/${orderId}/status/${userId}`,{
       method:"PATCH",
       headers:{
                   "Content-Type":"application/json",
                   Authorization:`Bearer ${token}`
                },
                body:JSON.stringify({status})
    }).then(res=>res.json())
 }