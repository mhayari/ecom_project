import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getProducts } from '../redux/reducer/productReducer'
import Card from './Card'

const BestSellerProduct = () => {
    const Dispatch=useDispatch()
      const products=useSelector(state=>state.productReducer.product)
      console.log(products)


    useEffect(()=>{
        Dispatch(getProducts({sortBy:'sold',order:'desc',limit:1}))
     },[])
  return (
    <div className="row mt-3 mb-5">
      {products.map((products,i)=>(
          <div key={i} className="col-md-4">
        <Card product={products}/>
        </div>
        ))}
    </div>
  )
}

export default BestSellerProduct
