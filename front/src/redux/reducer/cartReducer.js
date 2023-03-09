import {createSlice} from '@reduxjs/toolkit'
import Swal from 'sweetalert2'

const cart =JSON.parse(localStorage.getItem('cart'))||[]

const CountSlice = createSlice({
    name : "Cart",
    initialState : {
        cartItems :cart,
        count:0,
        containerCartList:[],
        cartTotalAmount:0,
    },
    reducers : {
        addToCart(state,action){
          console.log(state.cartItems)
            const itemIndex=state.cartItems.findIndex(item=>item._id===action.payload._id)
            if(itemIndex>=0){
                state.cartItems[itemIndex].count+=1
              
                Swal.fire({
                    position: 'top-center',
                    icon: 'success',
                    title: 'Your cart has been updated',
                    showConfirmButton: false,
                    timer: 1500
                  })
                  // console.log(state.cartItems.length)
            }else{
                const tempProduct={...action.payload,count:1}
                state.cartItems.push(tempProduct)
                console.log(state.cartItems)
                Swal.fire({
                    position: 'top-center',
                    icon: 'success',
                    title: 'Your cart has been added',
                    showConfirmButton: false,
                    timer: 1500
                  })
            }
        //    console.log(state.cartItems)
         localStorage.setItem('cart',JSON.stringify(state.cartItems))
        },
        handelPlus(state,action){
            const itemProduct=state.cartItems.find(product=>product._id===action.payload._id)
            console.log(itemProduct);
                  if(itemProduct){
                    itemProduct.count++
                    
                      Swal.fire({
                          position: 'top-end',
                          icon: 'success',
                          title: 'Your cart has been updated',
                          showConfirmButton: false,
                          timer: 1500
                        })
                  }
            localStorage.setItem('cart',JSON.stringify(itemProduct))
          },
          handelMinus(state,action){
            const itemProduct=state.cartItems.find(product=>product._id===action.payload._id)
            console.log(itemProduct);
                  if(itemProduct){
                    itemProduct.count--
                  if(itemProduct.count===0){  
                                state.cartItems=state.cartItems.filter(product=>product._id!==action.payload._id) 
                                                                          
                    }
                    Swal.fire({
                        position: 'top-end',
                        icon: 'warning',
                        title: 'Your cart has been updated',
                        showConfirmButton: false,
                        timer: 1500
                      })}
                      localStorage.setItem('cart',JSON.stringify(itemProduct))
                    },
                      deleteItem(state,action){
                          state.cartItems=state.cartItems.filter(product=>product._id!==action.payload._id) 
                          Swal.fire({
                            position: 'top-end',
                            icon: 'warning',
                            title: 'Your cart has been removed',
                            showConfirmButton: false,
                            timer: 1500
                          })
                          localStorage.setItem('cart',JSON.stringify(state.cartItems))
                      },
                      clearCart(state,action){
                        state.cartItems=[]
                        Swal.fire({
                          position: 'top-end',
                          icon: 'warning',
                          title: 'Your cart has been removed',
                          showConfirmButton: false,
                          timer: 1500
                        })
                        localStorage.setItem('cart',JSON.stringify(state.cartItems))
                      }
                    }
})

export const {addToCart,handelPlus,handelMinus,deleteItem,clearCart} = CountSlice.actions
export default CountSlice.reducer
