import {configureStore} from "@reduxjs/toolkit"
import cartReducer from "./reducer/cartReducer"
import authReducer from './reducer/authReducer'
import productReducer from "./reducer/productReducer"
import categoryReducer from "./reducer/categoryReducer"



const store = configureStore({
    reducer : {
         
           auth:authReducer,
           cart:cartReducer,
           productReducer:productReducer,
           categoryReducer:categoryReducer
    }
})


export default store