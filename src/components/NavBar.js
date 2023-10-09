import '../Styles/NavBar.css';
import React from 'react'
import { NavLink } from 'react-router-dom'
import CartButton from './CartButton.js';
import { useRecoilValue } from 'recoil';
import { cartState } from './CartState';
import '../Styles/CartButton.css'
function Navbar() {
  const cart=useRecoilValue(cartState);
  return (
    <div className='nav-bar'>
      <nav>
          <NavLink to='/' className='nav-link'>Home</NavLink>
          <NavLink to='/products/:id' className='nav-link'>Product</NavLink>
          <div className='cart-container'>
          <CartButton cartlength={cart.length}/>
        </div>  
      </nav>
    </div>
  )
}

export default Navbar