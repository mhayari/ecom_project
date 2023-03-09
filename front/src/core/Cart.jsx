import { useSelector } from "react-redux"
import Swal from "sweetalert2"
import { useDispatch } from "react-redux"
import { handelPlus,handelMinus,deleteItem } from "../redux/reducer/cartReducer"
import Layout from "./Layout"
import ShowImage from "./ShowImage"
import Checkout from "./Checkout"
// import 'bootstrap/dist/css/bootstrap.min.css'
// import 'bootstrap-icons/font/bootstrap-icons.css'

const Cart = () => {
    const cart=useSelector(state=>state.cart.cartItems)
    console.log(cart)
    const Dispatch=useDispatch()
  

  return (
    <Layout
    title="Cart"
    description="List of Products in Cart"
    className="container"
    >
    <div className="row mt-5 ">
    <div className="col-md-9">
            <table className="table">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Image</th>
                  <th>Name</th>
                  <th className="px-5">Quantity</th>
                  <th>Price</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
              {cart.length<1?<tr className="text-center"><td colSpan={6}>----- <strong>no items</strong> ------</td></tr>:
        cart.length&&cart.map((item,i)=>(
            <tr key={item._id}>
              <td>{i+1}</td>
              <td width="80px" ><ShowImage  item={item} className="card-img-top"  url='product/photo'  alt={item.name}/></td>
            <td><h5>{item.name}</h5>
            <p className="well">{item.description}</p>
            </td>
            <td >
                <div className="btn-group" role="group" aria-label="Basic example">
  <button type="button" onClick={()=>Dispatch(handelPlus(item))}  className="btn btn-success"><i className="fas fa-plus"></i></button>
  <button type="button"  className="btn btn-primary">{item.count}</button>
  <button type="button" onClick={()=>Dispatch(handelMinus(item))}  className="btn btn-info"><i className="fas fa-minus"></i></button>
</div>
                </td>
            <td>${item.price}</td>
              <td>{item.price*item.count}</td>
              <td><span onClick={()=>Dispatch(deleteItem(item))} className=" text-danger" style={{cursor:'pointer'}}>X</span></td>
            </tr>
        ))}
              </tbody>
            </table>
      </div>
      <div className="col-md-3">

      <Checkout cart={cart}/>
      </div>
    </div>
    </Layout>
  )
}

export default Cart
