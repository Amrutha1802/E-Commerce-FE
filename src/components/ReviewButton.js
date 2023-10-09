import React from 'react'
import '../Styles/CreateProductButton.css'
import { useState } from 'react';
import '../Styles/CreateProductButton.css'
import ReviewForm from './ReviewForm.js';

function ReviewButton({id}) {
    const [isButtonVisible, setIsButtonVisible] = useState(false);
    const toggleCartVisibility = () => {
        setIsButtonVisible(!isButtonVisible);
    };
    return (
        <div>
            <button className='prod-button' onClick={toggleCartVisibility}>Add a Review</button>
            {isButtonVisible && <ReviewForm id={id}/>}
        </div>
    )
}

export default ReviewButton