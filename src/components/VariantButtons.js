import React from 'react';
import '../Styles/VariantButtons.css'

const VariantButton = ({ variant,onVariantClick }) => {
  return (
    <div className="variant-buttons-container">
          <button
            key={variant.id}
            className="variant-button"
            style={{ backgroundColor: variant.color }}
            onClick={()=>onVariantClick(variant)}
          >
          </button>
    </div>
  );
};

export default VariantButton;
