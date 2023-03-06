import { useState } from "react"
import Layout from "../core/Layout"
import toastr from 'toastr'
import "toastr/build/toastr.css"
import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import { signIn } from "../redux/reducer/authReducer"
import { Link } from "react-router-dom"



const SignIn = () => {
  const [user,setUser]=useState({email:'',password:''})
  const [mess,setMess]=useState('')
  const navigate=useNavigate()
  const Dispatch=useDispatch()

  const handelChange=e=>{
    setUser({...user,[e.target.id]:e.target.value})
  }
  const hanselSubmit=(e)=>{
    e.preventDefault()
    Dispatch(signIn(user)).then(res=>{
      if(res.payload.error){toastr.warning(res.error,'Please Check form !',{positionClass:"toast-bottom-left"})}else{toastr.success('USer is logIn successfully','welcome',{positionClass:"toast-bottom-left"})
      localStorage.setItem('jwt_info',JSON.stringify(res.payload))
      navigate('/')
    }}).catch(err=>toastr.error(err,'server error !',{positionClass:"toast-bottom-left"}))
      }
    
  
  const form=()=>(
    <form onSubmit={hanselSubmit}>
    <div className="form-group">
      <label htmlFor="email" className="text-muted">
      </label>email<input onChange={handelChange} type="email" className="form-control" id="email" />
    </div>
    <div className="form-group">
      <label htmlFor="password" className="text-muted">
      </label>password<input onChange={handelChange} type="password" className="form-control" id="password" />
    </div>
    <button className="btn btn-lg btn-block btn-outline-info">connection</button>
    <Link to='/signUp'>Sing Up</Link>
      <h5>{mess}</h5>
    </form>
    
  )
  return (
    <Layout title='SignIn Page' description='SignIn ' className='container'>
      <div className="row">
        <div className="col-md-6 mx-auto">
        {form()}
        </div>
      </div>
    </Layout>
  )
}

export default SignIn
