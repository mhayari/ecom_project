import { useEffect, useState } from "react"
import { getProducts } from "./ApiCore"
import Card from "./Card"
import Layout from "./Layout"
import Search from "./Search"

const Home = () => {
  const [productsBestSellers,setProductsBestSellers]=useState([])
  const [productsArrivals,setProductsArrivals]=useState([])
  const loadBestSellers=()=>{
    getProducts({sortBy:'sold',order:'desc',limit:6}).then(products=>setProductsBestSellers(products))
  }
  const loadArrivals=()=>{
    getProducts({sortBy:'createdAt',order:'desc',limit:3}).then(products=>setProductsArrivals(products)).catch(err=>console.log(err.message))
  }
  useEffect(()=>{
    loadBestSellers()
    loadArrivals()
  },[])
  return (
    <div>
    <Layout title='Hom Page' description='Home ' className='container'>
      <Search/>
        <h1>Arrival Products</h1>
        <div className="row mt-3 mb-5">
          {productsArrivals.map((products,i)=>(
          <div key={i} className="col-md-4">
        <Card product={products}/>
        </div>
        ))}
        </div>
        <br/>
        <h2>Best Seller Products</h2>
        <div className="row mt-3 mb-5">
          {productsBestSellers.map((products,i)=>(
          <div key={i} className="col-md-4">
        <Card product={products}/>
        </div>
        ))}
        </div>
    </Layout>
    </div>
  )
}

export default Home
