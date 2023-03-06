import React from 'react'

const FilterByPrice = ({handelFilter}) => {
    const prices = [
        {
            id: 1,
            name: "Any",
            value: []
        },
        {
            id: 2,
            name: "0$ to 39$",
            value: [0, 39]
        },
        {
            id: 3,
            name: "40$ to 79$",
            value: [40, 79]
        },
        {
            _id: 4,
            name: "80$ to 119$",
            value: [80, 119]
        },
        {
            id: 5,
            name: "120$ to 160$",
            value: [120, 160]
        },
        {
            id: 6,
            name: "More",
            value: [161, 9999999]
        }
    ]
    const handelChange=(e)=>{
       handelFilter(prices[e.target.value]['value'])
    }
  return (
    <div>
        <h4>Filter by Price</h4>
      {prices.map((price,i)=>(
        <div key={i} className='my-3 mx-4 '>
        <label htmlFor={`${i}-${price.name}`}>
        <input value={i} onChange={handelChange} type="radio" name="price" id={`${i}-${price.name}`}/>
        {price.name}</label>
        </div>
      ))}
    </div>
  )
}

export default FilterByPrice
