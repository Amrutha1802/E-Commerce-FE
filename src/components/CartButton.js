import React,{ useState } from 'react';
import { useRecoilValue } from 'recoil';
import CartCard from './CartCard';
import '../Styles/CreateProductButton.css'
import { cartState } from './CartState';
export default function CartButton({cartlength}){
    const [isCartVisible, setIsCartVisible] = useState(false);
    const toggleCartVisibility = () => {
        setIsCartVisible(!isCartVisible);
    };
        
    const cart=useRecoilValue(cartState);
    return (
        <div>
            <button className='prod-button' onClick={toggleCartVisibility}>Cart ({cart.length})</button>
            {isCartVisible && <CartCard/>}
        </div>
    )
}
