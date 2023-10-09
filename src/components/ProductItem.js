import React from 'react'
import ProductImage from './ProductImage';
import ProductImageDesc from './ProductImageDesc';
import '../Styles/ProductsImage.css'
function ProductItem({name,url,description,price}) {
  return (
    <div>
        <ProductImage url={url} description={description} />
        <div className='text'>
            <ProductImageDesc name={name} description={description} price={price}/>
        </div>
    </div>
  )
}

export default ProductItem