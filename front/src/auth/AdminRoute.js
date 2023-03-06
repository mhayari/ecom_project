import { Outlet, useNavigate } from "react-router-dom"
import { isAuthenticate } from "./helpers"
const PrivateRoute = () => {
const navigate=useNavigate()
let auth=isAuthenticate()
   return (
    auth&&auth.user.role===1?<Outlet/> : navigate('/')

   )
}

export default PrivateRoute