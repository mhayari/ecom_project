import { useState } from "react"
import Layout from "../core/Layout"
import toastr from 'toastr'
import "toastr/build/toastr.css"
import {API_URL} from '../config'
import { useNavigate } from "react-router-dom"



const SignUp = () => {
  const [user,setUser]=useState({name:'',email:'',password:''})
  const navigate=useNavigate()

  const handelChange=e=>{
    setUser({...user,[e.target.id]:e.target.value})
  }
  const hanselSubmit=(e)=>{
    e.preventDefault()
   fetch(`${API_URL}/signUp`,{method:"POST",headers:{
    "Accept":"application/json",
    "Content-Type":"application/json"
   },body:JSON.stringify(user)}).then(res=>res.json()).then(res=>{if(res.error){toastr.warning(res.error,'Please Check form !',{positionClass:"toast-bottom-left"})}else{toastr.success('USer is created successfully','New Account',{positionClass:"toast-bottom-left"})
   navigate('/signIn')}}).catch(err=>toastr.error(err,'server error !',{positionClass:"toast-bottom-left"}))
  }
  const form=()=>(
    <form onSubmit={hanselSubmit}>
    <div className="form-group">
      <label htmlFor="name" className="text-muted">
      </label>name<input onChange={handelChange} type="text" className="form-control" id="name" />
    </div>
    <div className="form-group">
      <label htmlFor="email" className="text-muted">
      </label>email<input onChange={handelChange} type="email" className="form-control" id="email" />
    </div>
    <div className="form-group">
      <label htmlFor="password" className="text-muted">
      </label>password<input onChange={handelChange} type="password" className="form-control" id="password" />
    </div>
    <button className="btn btn-lg btn-block btn-outline-success">register</button>
    </form>
    
  )
  return (
    <Layout title='SignUp Page' description='SignUp ' className='container'>
      <div className="row">
        <div className="col-md-6 mx-auto">
        {form()}
        </div>
      </div>
    </Layout>
  )
}

export default SignUp
