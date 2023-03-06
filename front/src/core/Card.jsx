import React from 'react'
import { Link } from 'react-router-dom'
import ShowImage from './ShowImage'
import moment from 'moment'
import {useDispatch} from 'react-redux'
import { addToCart } from '../redux/reducer/cartReducer'
const Card = ({product,showButton}) => {
  const dispatch=useDispatch()
  const showStock=(quantity)=>{
    return quantity>0?<span className="badge bade-primary">{quantity} in STOCK</span>:<span className="badge badge-danger">out of STOCK</span>
}
  return (
    <>
      <div className="card bg-secondary text-light px-2 my-2">
        <div className="card-header"><h4 className='display-6'>{product.name}</h4></div>
       <ShowImage item={product} url="product/photo" className="card-img-top"/>
        <div className="card-body">
            <p>{product.description.substring(0,50)}</p>
            <div className='text-center m-3'>
              <h4><span style={{fontSize:'20px'}} className='badge badge-info '>${product.price}</span></h4><br/>
              <span className='ml-5 badge badge-dark'>{product.category.name}</span>
            </div>
            <Link to={`/product/${product._id}`}>
            {!showButton&&(
            <button className=" btn btn-warning mr-1" >View </button>
            )}
           
            </Link>
            {product.quantity>0&&(
            <button onClick={()=>dispatch(addToCart(product))} className=" btn btn-success ">Add To Cart</button>
              )}
        </div>
        <h4>{showStock(product.quantity)}</h4>
        {showButton&&(
        <div className="well">
{moment(product.createdAt).fromNow()}</div>
        )}
      </div>
    </>
  )
}

export default Card
