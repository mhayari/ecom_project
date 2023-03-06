import {BrowserRouter,Route,Routes} from 'react-router-dom'
import Home from './core/Home'
import Menu from './core/Menu'
import SignIn from './user/SignIn'
import SignUp from './user/SignUp'
import Dashboard from './user/Dashboard'
import PrivateRoute from './auth/PrivateRoutes'
import AdminDashboard from './user/AdminDashboard'
import AdminRoute from './auth/AdminRoute'
import AddCategory from './admin/category/AddCategory'
import AddProduct from './admin/product/AddProduct'
import Shop from './core/Shop'
import Product from './core/Product'
import Cart from './core/Cart'
import Profile from './core/Profile'
import ListOrders from './admin/order/ListOrders'
const Router = () => {
  return (
    <BrowserRouter>
        <Menu/>
      <Routes>
          <Route path='/'  element={<Home/>}/>
        <Route element={<PrivateRoute/>}>
          <Route path='/shop'  element={<Shop/>}/>
          <Route path='/dashboard'  element={<Dashboard/>}/>
          <Route path='/profile'  element={<Profile/>}/>
        </Route>
          <Route path='/product/:id' element={<Product/>}/>
        <Route element={<AdminRoute/>}>
          <Route path='/admin/dashboard' element={<AdminDashboard/>}/>
          <Route path='/category/create' element={<AddCategory/>}/>
          <Route path='/product/create' element={<AddProduct/>}/>
          <Route path='/admin/orders' element={<ListOrders/>}/>
          </Route>
          <Route path='/cart' element={<Cart/>}/>
        <Route path='/signIn' element={<SignIn/>}/>
        <Route path='/SignUp' element={<SignUp/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default Router
