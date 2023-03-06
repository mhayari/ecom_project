import {createSlice} from '@reduxjs/toolkit'
import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import { API_URL } from '../../config'
import queryString from 'query-string'



export const getProducts=createAsyncThunk('Products/getProducts',async(params)=>{
    let query=queryString.stringify(params)
      return axios.get(`${API_URL}/product?${query}`).then(res=>res.data).catch(err=>err.message)
  })


  export const getRelatedProduct=createAsyncThunk('Products/getRelatedProduct',async(id)=>{
    return axios.get(`${API_URL}/product/related/${id}`).then(res=>res.data).catch(err=>err.message)
 })



const CountSlice = createSlice({
    name : "Products",
    initialState : {
        product:[],
        error:'',
        status:''
    },
    reducers : { 

    },
    extraReducers:{
        
        [getProducts.fulfilled]:(state,action)=>{

            console.log(state.product)
            state.product=action.payload
            state.status='Success'
        },
        [getProducts.rejected]:(state,action)=>{
            state.error=action.payload
            state.status='Rejected'
        },
        [getProducts.pending]:(state)=>{
            state.status='Pending'
        },
        [getRelatedProduct.fulfilled]:(state,action)=>{

            
            state.product=action.payload
            state.status='Success'
        },
        [getRelatedProduct.rejected]:(state,action)=>{
            state.error=action.payload
            state.status='Rejected'
        },
        [getRelatedProduct.pending]:(state)=>{
            state.status='Pending'
        },
       
    }

})

// export const {add,filterFilm,deleteItem,updated} = CountSlice.actions

export default CountSlice.reducer

