import React from 'react'
import '../Styles/ProductsImage.css'

function ProductImageDesc({name,description,quantityInCart,price}) {
  return (
    <div className="productDesc text">
        <h2>{name}</h2>
        <p>{description}</p>
        {quantityInCart && <p>Quantity: {quantityInCart}</p>}
        <p>Price <strong>$ {price}</strong></p>
    </div>
  )
}

export default ProductImageDesc