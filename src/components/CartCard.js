import React from 'react';
import { useRecoilValue } from 'recoil';
import { cartState } from './CartState.js';
import ProductImageDesc from './ProductImageDesc';
import '../Styles/CartCard.css'
export default function CartCard(){
  const cart=useRecoilValue(cartState);
  if (cart.length === 0) {
    return <div style={{textAlign:'center'}} className='dialog-box'>No products in the cart</div>;
  }
  return(
      <div className='dialog-box'>
          {
          cart.map((product) => {
            const totalprice = product.price*product.quantityInCart;
            return (<div className='image-card'>
              <div className='img'>
                <img style={{width:'300px'}} src={ product.variants[0].url } alt={product.description} />
              </div>
              <div className='img'>
                <ProductImageDesc name={product.name} quantityInCart={product.quantityInCart} description={product.description} price={totalprice} />
              </div>
            </div>
          );
        })}   
      </div>
    );
}
