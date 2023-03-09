import {Link, NavLink} from 'react-router-dom'
import axios from 'axios'
import { API_URL } from '../config'
import toastr from 'toastr'
import "toastr/build/toastr.css"
import { useNavigate } from "react-router-dom"
import { isAuthenticate } from '../auth/helpers'
import { useSelector } from "react-redux"


const Menu = () => {
  const navigate=useNavigate() 
  const cart=useSelector(state=>state.cart.cartItems)
// console.log((cart))
// console.log(isAuthenticate())
  const handelSignOut=_=>{
    axios.get(`${API_URL}/signOut`).then(()=>{toastr.success('You quit','by',{positionClass:"toast-bottom-left"})
    localStorage.removeItem('jwt_info')
    navigate('/signIn')
  }).catch(err=>console.log(err.message))
  }
  return (
    <nav className="navbar fixed-top  navbar-expand-lg navbar-dark bg-success">
  <div className="container-fluid">
    <NavLink  className={({isActive})=>isActive?'navbar-brand active':'navbar-brand'} to="/">E-commerce</NavLink>
    <button
      className="navbar-toggler"
      type="button"
      data-mdb-toggle="collapse"
      data-mdb-target="#navbarTogglerDemo02"
      aria-controls="navbarTogglerDemo02"
      aria-expanded="false"
      aria-label="Toggle navigation"
    >
      <i className="fas fa-bars"></i>
    </button>
    <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
      <ul className="navbar-nav me-auto mb-2 mb-lg-0">
        <li className="nav-item">
          <NavLink  className={({isActive})=>isActive?'nav-link active':'nav-link'}  aria-current="page" to="/">Home</NavLink>
        </li>        
        <li className="nav-item">
          <NavLink  className={({isActive})=>isActive?'nav-link active':'nav-link'}  aria-current="page" to="/shop">Shop</NavLink>
        </li>  
        {isAuthenticate()&&
      
        <li>
          <NavLink  className={({isActive})=>isActive?'nav-link active':'nav-link'}  aria-current="page" to={`${isAuthenticate().user.role===1?'/admin':''}/dashboard`}>Dashboard</NavLink>
          {/* {console.log(isAuthenticate().user)} */}
        </li>
}
      </ul>
      <ul className="navbar-nav ml-auto mb-2 mb-lg-0">
        <li className="nav-item">
          <NavLink className={({isActive})=>isActive?'nav-link active':'nav-link'} to="/cart"  aria-current="page" >Carts <span className='badge badge-dark '>{cart.length}</span></NavLink>
        </li>
        {!isAuthenticate()&&
          <>
        <li className="nav-item">
          <NavLink  className={({isActive})=>isActive?'nav-link active':'nav-link'}  aria-current="page" to="/signIn">connection</NavLink>
        </li>
        <li className="nav-item">
          <NavLink className={({isActive})=>isActive?'nav-link active':'nav-link'} to="signUp">register</NavLink>
        </li>
        </>
}
{isAuthenticate()&&
      <>
        <li className="nav-item">
          <NavLink className='nav-link' style={{cursor:'pointer'}} onClick={handelSignOut} >LogOut</NavLink>
        </li>
      </>
}
      </ul>
    </div>
  </div>
</nav>
  )
}

export default Menu
