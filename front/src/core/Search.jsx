import React, { useEffect, useState } from 'react'
import { getProducts } from '../redux/reducer/productReducer'
import {getCategories} from '../redux/reducer/categoryReducer'
import Card from './Card'
import { useDispatch,useSelector } from 'react-redux'

const Search = () => {
    // const [categories,setCategories]=useState([])
    // const [products,setProducts]=useState([])
    const [searchData,setSearchData]=useState({category:'',search:''})
    const Dispatch=useDispatch()
    const categories=useSelector(state=>state.categoryReducer.Categories)
    const products=useSelector(state=>state.productReducer.product)
    // console.log(categories)
    const handelChange=(e)=>{
        setSearchData({...searchData,[e.target.id]:e.target.value})
    }
    const handelSubmit=(e)=>{
        e.preventDefault()
        const {search,category}=searchData
        // console.log(search,category)
        // console.log(products)
        if(search||category)
        
        Dispatch(getProducts({search:search||undefined,category}))
    }
    useEffect(()=>{
Dispatch(getCategories())
    },[])
  return (
    <div>
      <form onSubmit={handelSubmit}>
        <div className="input-group input-group-lg">
            <div className="input-group-prepend">
                <select onChange={handelChange} id="category"  className="btn-outline-info rounded">
                    <option  value="">Select a Category</option>
                    
                    {categories.map((category,i)=>(
                    <option    name={category.name} key={i} value={category._id}>{category.name}</option>
                    ))}
                </select>
            </div>
            <input onChange={handelChange} id="search" type="search" className="form-control mx-4" />
            <div className="input-group-append">
                <button className="btn">Search</button></div>
        </div>
      </form>
      <hr/>
      <div className='row'>
          {products.length>0&&(
            <h2>{`${products.length} product${products.length>1?'s':''}`}</h2>
          )}
      {products.map((product,i)=>(
        <>
          <div key={i} className="col-md-4">
        <Card product={product}/>
        </div>
        </>
        ))}
      </div>
    </div>
  )
}

export default Search
