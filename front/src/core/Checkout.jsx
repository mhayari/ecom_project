import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { isAuthenticate } from '../auth/helpers'
import { createOrder, getBraintreeToken } from './ApiCore'
import DropIn from 'braintree-web-drop-in-react'
import toastr from 'toastr'
import "toastr/build/toastr.css"
import { processPayment } from './ApiCore'

const Checkout = ({cart}) => {
    const [data,setData]=useState({
        braintreeToken:null,
        error:null,
        instance:{},
        address:''
    })
    console.log(data)
    const handelInput=(e)=>{
      setData({...data,address:e.target.value})
    }
    const totalCheckout=(cart)=>{
      return cart.reduce((acc,item)=>acc+=item.price*item.count,0)
    }
    const userId=isAuthenticate()&&isAuthenticate().user._id
    const token=isAuthenticate()&&isAuthenticate().token
    const dropIn=()=>(
        <>
        {data.braintreeToken!==null&&cart.length>0 &&(
            <DropIn options={{authorization:data.braintreeToken,
            paypal:{
              flow:"vault"
            }}}
            onInstance={instance=>data.instance=instance}/>
        )}
        </>
    )
    const buy=()=> {
      const deliveryData=data.address
data.instance.requestPaymentMethod().then(data=>{
  let paymentData={
    amount:totalCheckout(cart),
    paymentMethodNonce:data.nonce
  }
  processPayment(userId,token,paymentData).then(res=>{
    console.log(43,res)
    let orderData={
      products:cart,
      transaction_id:res.transaction.id,
      amount:res.transaction.amount,
      address:deliveryData,
    }
    createOrder(userId,token,orderData).then(res=>console.log(50,res)
).catch(err=>console.error(50,err))
    {toastr.success('Valid','good Payment',{positionClass:"toast-bottom-left"})}
    localStorage.removeItem('cart')
  })
  .catch(err=>{toastr.error('inValid',err.message,{positionClass:"toast-bottom-left"})})

  {toastr.success('Valid','good Payment',{positionClass:"toast-bottom-left"})}}).catch(err=>{toastr.error('inValid',err.message,{positionClass:"toast-bottom-left"})});


    }
    useEffect(()=>{
        getBraintreeToken(userId,token).then(res=>setData({...data,braintreeToken:res.token})).catch(err=>setData({...data,error:err}))
        },[])
  return (
    <div>
      <h2>Total :     <span className="badge bg-success rounded-pill">${totalCheckout(cart)}</span></h2>
      {isAuthenticate()?(
        <>
        <label htmlFor='address'>Address</label>
        <textarea id='address' className='form-control' onChange={handelInput} rows="2"/>
        {dropIn()}
        {cart.length>0&&(
        <button onClick={buy} className="btn btn-raised btn-success btn-block">Pay</button>
        )}
        </>
      ):(
        <Link to='/signIn'><button className="btn btn-raised btn-warning btn-block">sign in</button></Link>
      )}
    </div>
  )
}

export default Checkout
