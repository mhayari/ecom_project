import {createSlice} from '@reduxjs/toolkit'
import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import { API_URL } from '../../config'


export const getCategories=createAsyncThunk('Categories/getCategories',async ()=>{
    return axios.get(`${API_URL}/category`).then(res=>res.data).catch(err=>err.message)
})

// export const getCategories=async()=>{
//     return axios.get(`${API_URL}/category`).then(res=>res.data).catch(err=>err.message)
//  }

const CountSlice = createSlice({
    name : "Categories",
    initialState : {
        Categories:[],
        error:'',
        status:''
    },
    reducers : { 

    },
    extraReducers:{
        
        [getCategories.fulfilled]:(state,action)=>{            
            state.Categories=action.payload
            state.status='Success'
        },
        [getCategories.rejected]:(state,action)=>{
            state.error=action.payload
            state.status='Rejected'
        },
        [getCategories.pending]:(state)=>{
            state.status='Pending'
        },
       
    }

})

// export const {add,filterFilm,deleteItem,updated} = CountSlice.actions

export default CountSlice.reducer

