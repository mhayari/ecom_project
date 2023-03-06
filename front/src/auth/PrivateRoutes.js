import { Outlet, useNavigate } from "react-router-dom"
import { isAuthenticate } from "./helpers"
const PrivateRoute = () => {
const navigate=useNavigate()
let auth=isAuthenticate()
   return (
    !auth? navigate('/signIn'):<Outlet/> 

   )
}

export default PrivateRoute