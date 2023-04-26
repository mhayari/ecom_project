import { useEffect, useState } from "react"
import {useParams } from "react-router-dom"
import { getProduct, getRelatedProduct } from "./ApiCore"
import Card from "./Card"
import Layout from "./Layout"

const Product = () => {
    const [product,setProduct]=useState({})
    const [related,setRelated]=useState([])
    const {id}=useParams()
    
    useEffect(()=>{
      console.log(id)
        getProduct(id).then(res=>{setProduct(res)
           return getRelatedProduct(id) })
        .then(res=>setRelated(res)).catch(err=>console.log(err.message))
    },[id])
  return (
    <>
        {product&&product.name&&(
    <Layout title={product.name}  className='container'>
      <div className="row">
        <div className="col-md-8">
        <Card product={product} showButton={true}/>
        {product.description}
        </div>
        <div  className="col-md-4">
            {related.map(product=>(
        <Card key={product._id}  product={product} />
        ))}
        </div>
      </div>    
  </Layout>
        )}
        </>
  )
}

export default Product
