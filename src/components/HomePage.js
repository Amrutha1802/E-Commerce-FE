import React from 'react';
import axios from 'axios';
import { useQuery } from 'react-query';
import '../Styles//HomePage.css'
import { Link } from 'react-router-dom'
import ProductItem from './ProductItem.js'


const HomePage = () => {
  const { data, isLoading, isError } = useQuery('products',  ()=>{
    return axios.get('http://localhost:4000/products');
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error loading joke</div>;
  }

  return (
    <div className='image-container'>
    {data?.data.map(product=>(
      <div className='image-item'>
        <Link to={`/products/${product.id}`} class='text'>
          <ProductItem key={product.id} name={product.name} url={product.variants[0].url} description={product.description} price={product.price}/>
        </Link>
      </div>
    ))}
    </div>
  );
};

export default HomePage;
