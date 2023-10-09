import React, { useEffect, useState} from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import ProductImage from './ProductImage';
import '../Styles/ProductDetails.css'
import ProductImageDesc from './ProductImageDesc';
import VariantButton from './VariantButtons';
import '../Styles/CartButton.css'
import { useRecoilState } from 'recoil';
import { cartState } from './CartState';
import '../Styles/VariantButtons.css'
import { useQuery } from 'react-query';
import ReviewButton from './ReviewButton.js';

const fetchProduct = async (id) => {
  const response = await axios.get(`http://localhost:4000/products/${id}`);
  return response.data;
};

const fetchReviews = async (id) => {
  const response = await axios.get("http://localhost:4000/reviewsdata");
  return response.data;
};
const ProductDetails = () => {
  const { id } = useParams(); 
  const [selectedUrl,setSelectedUrl]=useState(null);
  const [cart,setCart]=useRecoilState(cartState);
  const { data: product, isLoading: isProductLoading } = useQuery(['product', id], () => fetchProduct(id));
  const { data: reviews, isLoading: areReviewsLoading } = useQuery(['reviews', id], () => fetchReviews(id));
  useEffect(()=>{
    if(product){   
      setSelectedUrl(product.variants[0].url);
    }
  },[product])
  if (isProductLoading || areReviewsLoading) {
    return <div>Loading...</div>;
  }
  const handleVariantClick=(variant)=>{
    console.log('handling');
    setSelectedUrl(variant.url);
  }
  const addToCart=()=>{
    const index=cart.findIndex(items=>items.id===product.id);
    if(index<0){
      setCart([...cart, { ...product, quantityInCart: 1 ,isAddingToCart:false}]);
    }
  }
  const incrementQuantity=()=>{
    const ind = cart.findIndex(item => item.id === product.id);
    const updatedCart = [...cart];
    updatedCart[ind] = {
      ...updatedCart[ind],
      quantityInCart: updatedCart[ind].quantityInCart +1,
      };
      setCart(updatedCart);
    }
  const decrementQuantity=()=>{
    const ind = cart.findIndex(item => item.id === product.id);
    if (ind !== -1) {
    if(cart[ind].quantityInCart>1){
        const updatedCart = [...cart];
        updatedCart[ind] = {
          ...updatedCart[ind],
          quantityInCart: updatedCart[ind].quantityInCart -1,
        };
        setCart(updatedCart);
      }
      else{
        setCart(cart.filter(item => item.id !== product.id));
      }
    }
  };
  if (!product) {
    return (
    <div>
        <h1>Product not found</h1>
    </div>);
  }
  const quantity=product.quantity;
  return (
    <div>
      <div class='prod-details'>
          <div className='image'>
              <ProductImage url={selectedUrl} description={product.description}/>
          </div>
          <div className='image-desc'>
            <div>
              <ProductImageDesc name={product.name} description={product.description} price={product.price}/>
              <div style={{marginLeft:'10px'}}>
                {
                  quantity <= 10 ? (
                    <p>Selling Fast</p>
                  ) : quantity > 10 ? (
                    <p>Available</p>
                  ) : quantity === 0 ? (
                    <p>Unavailable</p>
                  ) : null
                }
              </div>
              <div className='variant-buttons-container'>
                {product.variants.map((variant) => (
                  <div>
                    <VariantButton key={variant.id} variant={variant} onVariantClick={handleVariantClick}/>
                  </div>
                ))}
              </div>
                {
                cart.findIndex(items=>items.id===product.id) <0 ? (
                <button className='prod-button' onClick={addToCart}>
                  Add to Cart
                </button>
                ) : (
                <div  className='variant-buttons-container'>
                  <button className="prod-button" onClick={decrementQuantity}>-</button>
                  <span style={{marginTop:'30px',marginLeft:'10px'}}>{cart[cart.findIndex(items=>items.id===product.id)].quantityInCart}</span>
                  <button disabled={product.quantity === cart[cart.findIndex(item => item.id === product.id)].quantityInCart} className="prod-button" onClick={incrementQuantity}>+</button>
                </div>
                
              )}
              <div class='reviews'>
                <h3>Reviews</h3>
                {reviews && reviews.map((item) => {
                  if(item.productid===product.id){
                    return (
                      <div key={item.id} style={{marginBottom:'10px'}}>
                        <div><strong>Customer Name:</strong> {item.name }</div>
                        <div><strong>Rating : </strong>{item.rating} </div>
                        <div><strong>Review : </strong>{item.review}</div>
                      </div>
                    );
                  }
                  return null;
                })
                } 
              </div>
              <ReviewButton id={product.id}/>
            </div>
          </div>
      </div>
      {/* <ReviewButton id={product.id}/> */}
    </div>
  );
}

export default ProductDetails;
