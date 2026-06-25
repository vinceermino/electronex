import { useState } from "react";

interface MenuProps {
  image: string;
  price: number;
  rating: number;
  name: string;
  description: string;
  onAddToOrder: (quantity: number) => void;
}

export default function Menu(props: MenuProps) {

  const handleIncrement = () => {
  };

  const handleDecrement = () => {
  };

  const handleAddClick = () => {
  };

  return (
    <div className="menu-card">
      <div className="menu-image-container">
        <img
          className="menu-image"
          src={props.image}
          alt={props.name}
        />
      </div>
      
      <div className="menu-info">
        <h3 className="menu-title">{props.name}</h3>
        <p className="menu-description">{props.description}</p>
        <div className="menu-details">
          <span className="menu-price">₱{props.price.toLocaleString()}</span>
          <span className="menu-rating">
            <svg
              className="star-icon"
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
            </svg>
            {props.rating}
          </span>
        </div>
      </div>

      <div className="menu-action-container">
        <div className="quantity-controller">
          <button onClick={handleDecrement} className="quantity-btn" aria-label="Decrease quantity" disabled={true}>
            −
          </button>
          <span className="quantity-count">{0}</span>
          <button onClick={handleIncrement} className="quantity-btn" aria-label="Increase quantity">
            +
          </button>
        </div>
        
        <button onClick={handleAddClick} className="add-btn" disabled={true}>
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="12" y1="5" x2="12" y2="19"></line>
            <line x1="5" y1="12" x2="19" y2="12"></line>
          </svg>
          Add to Cart
        </button>
      </div>
    </div>
  );
}
