import React, { useState } from 'react'

const FilterByCategories = ({categories,handelFilter}) => {
  const [checked]=useState(new Set())
 

  const handelClick=(category)=>{
    if(checked.has(category._id)){
      checked.delete(category._id)
    }else{
      checked.add(category._id)
    }
    console.log(Array.from(checked))
    handelFilter(Array.from(checked))
      }

  return (
    <div>
        <ul>
            {categories&&categories.map((category,i)=>(
            <li key={i} className="list-unstyled">
                <input onClick={()=>handelClick(category)} type="checkbox" value={category._id} id={i} className='form-check-input' />
              <label  htmlFor={i} className="form-check-label"> 
              {category.name}
              </label>
            </li>
            ))}
        </ul>
    </div>
  )
}

export default FilterByCategories
