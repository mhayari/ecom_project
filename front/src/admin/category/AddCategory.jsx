import React, { useState } from 'react'
import { isAuthenticate } from '../../auth/helpers'
import { API_URL } from '../../config'
import Layout from '../../core/Layout'
import toastr from 'toastr'
import "toastr/build/toastr.css"

const AddCategory = () => {
    const [name,setName]=useState('')
    const {user,token}=isAuthenticate()
    const handelSubmit=e=>{
        e.preventDefault()
        fetch(`${API_URL}/category/create/${user._id}`,{method:"POST",headers:{
            "Accept":"application/json",
            "Content-Type":"application/json",
            "Authorization":`Bearer ${token}`
           },body:JSON.stringify({name})}).then(res=>res.json()).then(res=>{if(res.error){toastr.warning(res.error,'Please check Category name !',{positionClass:"toast-bottom-left"})}else{toastr.success('Category is created successfully','New Category',{positionClass:"toast-bottom-left"})}}).catch(err=>toastr.error(err,'server error !',{positionClass:"toast-bottom-left"}))
         setName('')
    }
  return (
    <Layout title='Hom Page' description='Home ' className='container'>
        <div className="row">
            <div className="col-md-6 mx-auto">
                <form onSubmit={handelSubmit}>
                    <div className="form-group">
                        <label htmlFor="" className="text-muted"></label>
                        <input autoFocus placeholder='add name of category' onChange={(e)=>setName(e.target.value)} value={name} type="text" className="form-control" />
                        </div>
                    
                    <button className="btn btn-outline-primary bg-secondary my-2">new category</button>
                </form>
            </div>
        </div>
    </Layout>
  )
}

export default AddCategory
