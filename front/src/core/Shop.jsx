import React, { useEffect, useState } from 'react'
import Layout from './Layout'
import {getCategories,searchProducts} from './ApiCore'
import FilterByCategories from './FilterByCategories'
import FilterByPrice from './FilterByPrice'
import Card from './Card'



const Shop = () => {
  const [categories,setCategories]=useState([])
  const [limit,setLimit]=useState(3)
  const [skip,setSkip]=useState(0)
  const [size,setSize]=useState(0)
  const [productsFiltered,setProductsFiltered]=useState([])
  const [myFilters,setMyFilters]=useState({
    category:[],
    price:[]
  })
 console.log(limit)

  useEffect(()=>{
    getCategories().then(res=>setCategories(res))
    .catch(err=>console.log(err.message))
  searchProducts(skip,limit,myFilters).then(res=>{setProductsFiltered(res.data)
    setSkip(0)
    setSize(res.data.length) 
}).catch(err=>console.log(err.message))
  },[myFilters])
  const handelFilter=(data,filterBy)=>{
    setMyFilters({...myFilters,[filterBy]:data})
  }
 
  const loadMore = () => {
    let toSkip = skip + limit;
    searchProducts(toSkip, limit, myFilters).then((res) => {
        setProductsFiltered([...productsFiltered, ...res.data]);
        setSize(res.data.length);
        setSkip(toSkip);
      
    });
  };

  return (
    <Layout title='shop page'
      description='Choose your favorite product in your store'
      className='container'
    >
        <div className="row">
            <div className="col-md-3 ">
                <h4>Filter by Categories</h4>
                <FilterByCategories handelFilter={(data)=>handelFilter(data,'category')}   categories={categories}/>
                <br/>
                <FilterByPrice handelFilter={data=>handelFilter(data,'price')}/>
              
            </div>
            <div className="col-md-9">
               <h2>filtered Products</h2>
        <div className="row mt-3 mb-5">
          {productsFiltered.map((products,i)=>(
          <div key={i} className="col-md-4">
        <Card product={products}/>
        </div>
        ))}
        </div>
        {size>0&&size>=limit&&(
          <div className='text-center'>
            <button className='btn btn-info' onClick={loadMore}>more</button>
            </div>
        )}
            </div>
        </div>
    </Layout>
  )
}

export default Shop
