import React, { useEffect, useState } from 'react'
import { isAuthenticate } from '../../auth/helpers'
import { API_URL } from '../../config'
import Layout from '../../core/Layout'
import toastr from 'toastr'
import "toastr/build/toastr.css"

const AddProduct = () => {
    const {user,token}=isAuthenticate()
    const [product,setProduct]=useState({
        name:'',
        description:'',
        price:0,
        quantity:0,
        category:0,
        shipping:false
        })
    
    const [formData,setFormData]=useState(new FormData())    
    const [categories,setCategories]=useState([])  
    useEffect(()=>{
        getCategories()
    },[])  
    const getCategories=()=>{
        fetch(`${API_URL}/category`,{method:"GET",headers:{
            "Accept":"application/json",
            "Content-Type":"application/json"
           }}).then(res=>res.json()).then(res=>setCategories(res)).catch(err=>console.log(err.message))
    }
    const handelChange=(e)=>{
        const value=e.target.id==='photo'?e.target.files[0]:e.target.value
        formData.set(e.target.id,value)
        setProduct({...product,[e.target.id]:value})
    }
    const handelSubmit=e=>{
        e.preventDefault()
        fetch(`${API_URL}/product/create/${user._id}`,
        {method:"POST",
        headers:{
            "Accept":"application/json",
            "Authorization":`Bearer ${token}`
           },
           body:formData})
           .then(res=>res.json()).then(res=>{
            console.log(res)
            if(res.error){
                toastr.warning(res.error,'Please check form !',{positionClass:"toast-bottom-left"})
            }else{
                toastr.success(`product ${product.name} is created successfully`,'New product',{positionClass:"toast-bottom-left"})
           setProduct({
            name:'',
            description:'',
            price:0,
            quantity:0,
            category:0,
            shipping:false
            })
            setFormData(new FormData())
        }}).catch(err=>toastr.error(err,'server error !',{positionClass:"toast-bottom-left"}))
         
    }
  return (
      <Layout title='product' description='new Product' className='container'>
        <div className="row">
            <div className="col-md-6 mx-auto">
                <form onSubmit={handelSubmit}>
                   <label className="form-label" htmlFor="customFile">Upload photo</label>
                    <input onChange={handelChange}   type="file" className="form-control" id="photo" />
                    <div className="form-group">
                        <label htmlFor="" className="text-muted"></label>
                        <input id='name'  autoFocus placeholder='add name of product' onChange={handelChange} value={product.name} 
                        type="text" className="form-control" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="description" className="text-muted">description</label>
                        <textarea  autoFocus name="description" id="description" 
                        cols="30" rows="3" placeholder='description' onChange={handelChange} value={product.description} type="text" 
                        className="form-control" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="quantity" className="text-muted">quantity</label>
                        <input  autoFocus placeholder='quantity' id='quantity' onChange={handelChange} value={product.quantity} 
                        type="number" className="form-control" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="price" className="text-muted">price</label>
                        <input  autoFocus id='price' placeholder='price' onChange={handelChange} value={product.price} type="number" 
                        className="form-control" />
                    </div>
                    <div className='form-group'>
                        <label htmlFor='category'>category</label>
                        <select  name='category' id='category' value={product.category} onChange={handelChange} className='form-control'>
                            <option value='0' >Select a Category</option>
                            {categories&&categories.map((category,i)=>(
                            <option key={i} value={category._id} >{category.name}</option>
                            ))}
                        </select>
                    </div>
                    <div className='form-group'>
                        <label htmlFor='shipping'>shipping</label>
                        <select onChange={handelChange} value={product.shipping} name='shipping' id='shipping' className='form-control'>
                            <option value="" >no</option>
                            <option value="1" >yes</option>
                        </select>
                    </div>
                    <button className="btn btn-outline-primary bg-light mt-3 btn-block">ADD</button>
                </form>
            </div>
        </div>
    </Layout>
  )
}

export default AddProduct
