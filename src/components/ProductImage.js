import React from 'react'
import './HomePage.js'
import '../Styles/ProductsImage.css'

function ProductImage({url,description}) {
  return (
    <div className='image'>
      <img style={{width:'400px'}} src={ url } alt={description} />
    </div>
  )
}

export default ProductImage