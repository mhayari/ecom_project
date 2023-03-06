import { useEffect, useState } from "react"
import {isAuthenticate} from '../../auth/helpers'
import { getStatus, listOrders, updateOrderStatus } from "./apiAdmin"
import Layout from "../../core/Layout"
import moment from "moment"

const ListOrders = () => {
    const [orders,setOrders]=useState([])
    const [status,setStatus]=useState([])
    // console.log((orders))
    const {user,token}=isAuthenticate()
    const showInput=(key,value)=>{
        return (
            <div className="form-group my-4 ">
                <label htmlFor={key}>{key}</label>
                <input id={key} value={value} readOnly type="text" className="form-control "/>
            </div>
        )
    }
    const loadOrders=(user,token)=>{
        listOrders(user._id,token).then(res=>setOrders(res)).catch(err=>console.log(err.message))
    }
    
    const loadStatus=(user,token)=>{
        getStatus(user._id,token).then(res=>setStatus(res)).catch(err=>console.log(err.message))
    }
const handelStatus=(e,order)=>{
    console.log(e.target.value)
    updateOrderStatus(user._id,token,order._id,e.target.value).then(res=>{
        if(res.error){
            console.log(res.error)
        }
        console.log(user._id)
        loadOrders(user,token)
    })
}
    const showStatus=(order)=>{
        return status.length && (
            <>
            <h4>Status : {order.status}</h4>
            <select onChange={e=>handelStatus(e,order)} className="form-control">
                <option value=''>Select Status</option>
                {status.map(s=>(
                    <option key={s} value={s}>{s}</option>
                ))}

            </select>
            </>
        )
    }
    useEffect(()=>{
        loadOrders(user,token)
        loadStatus(user,token)
    },[])
  return (
    <div>
        <Layout title='List Page' description='listOrders ' className='container'>
            <div className="list-group list-group-light">
                {orders.length>0?(
                <div className="list-group-item text-center active px-2">
                 Total Orders  {orders.length}
                </div>):(
                <div className="list-group-item text-center bg-warning px-2">
                 No order Yet
                </div>)
}
            </div>
    {orders&&orders.map(order=>(
        <div className="my-3" key={order._id}>
            <ul className="list-group list-group-light ">
  <li className="list-group-item bg-info px-2"> <strong> Transact Id </strong>  {order.transaction_id}</li>
  <li className="list-group-item"><strong>Amount : </strong> {order.amount}</li>
  <li className="list-group-item">{showStatus(order)}</li>
  <li className="list-group-item"><strong>Ordered On : </strong> {moment(order.createdAt).fromNow()}</li>
  <li className="list-group-item"><strong>Customer : </strong> {order.user.name}</li>
  <li className="list-group-item"><strong>Delivery Address : </strong> {order.address}</li>
</ul>
<div className="my-5">
    {order.products.map(product=>(

    <div className="card text-light my-2 bg-secondary" key={product._id} style={{width: "18rem"}}>
  <div className="card-body">
    <h5 className="card-title">{product.name}</h5>
    {showInput('Product Id',product._id)}
    {showInput('Product Name',product.name)}
    {showInput('Product Price',product.price)}
    {showInput('Product Quantity',product.count)}
   
  </div>
</div>
    ) )}
</div>
        </div>
    ))}
    </Layout>
    </div>
  )
}

export default ListOrders
