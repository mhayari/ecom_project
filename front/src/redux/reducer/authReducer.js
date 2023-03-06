import {createSlice} from '@reduxjs/toolkit'
import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import { API_URL } from '../../config'


export const signIn=createAsyncThunk('Users/signIn',async (data)=>{
    return fetch(`${API_URL}/signIn`,{
        method:"POST",
        headers:{
        "Accept":"application/json",
        "Content-Type":"application/json"
       },
       body:JSON.stringify(data)})
       .then(res=>res.json())
    .catch(err=>{console.log(err.message)})
})


const CountSlice = createSlice({
    name : "Users",
    initialState : {
        user:{},
        error:'',
        status:''
    },
    reducers : { 

    },
    extraReducers:{
        
        [signIn.fulfilled]:(state,action)=>{

            console.log(action.payload)
            
            state.user=action.payload
            state.status='Success'
        },
        [signIn.rejected]:(state,action)=>{
            state.error=action.payload
            state.status='Rejected'
            console.log(action.payload)
        },
        [signIn.pending]:(state)=>{
            state.status='Pending'
        },
       
    }

})

// export const {add,filterFilm,deleteItem,updated} = CountSlice.actions

export default CountSlice.reducer

