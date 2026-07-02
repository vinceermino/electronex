import { useState } from "react";

interface MenuProps {
  image: string;
  price: number;
  rating: number;
  name: string;
  description: string;
  stock: number;
  category: string;
  onAddToOrder: (qty: number) => void;
}

export default function Menu(props: MenuProps) {
  const [quantity, setQuantity] = useState(0);

  const handleIncrement = () => {
    if (quantity < props.stock) {
      setQuantity(quantity + 1);
    }
  };

  const handleDecrement = () => {
    if (quantity > 0) {
      setQuantity(quantity - 1);
    }
  };

  const handleAddClick = () => {
    if (quantity > 0) {
      props.onAddToOrder(quantity);
      setQuantity(0);
    }
  };

  const isOutOfStock = props.stock === 0;
  const isLowStock = props.stock > 0 && props.stock <= 5;

  return (
    <div className={`menu-card ${isOutOfStock ? 'out-of-stock' : ''}`}>
      {/* Product Image Container */}
      <div className="menu-image-container">
        <img
          className="menu-image"
          src={props.image}
          alt={props.name}
          loading="lazy"
        />
        
        {/* Category Badge */}
        <span className="menu-category-badge">{props.category}</span>

        {/* Stock Status Overlays */}
        {isOutOfStock ? (
          <div className="out-of-stock-overlay">
            <span className="out-of-stock-badge">Sold Out</span>
          </div>
        ) : isLowStock ? (
          <span className="low-stock-badge">Only {props.stock} left!</span>
        ) : null}
      </div>
      
      {/* Product Information */}
      <div className="menu-info">
        <h3 className="menu-title" title={props.name}>{props.name}</h3>
        <p className="menu-description" title={props.description}>{props.description}</p>
        
        <div className="menu-meta-row">
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
            {props.rating.toFixed(1)}
          </span>

          <span className={`stock-status-pill ${isOutOfStock ? 'status-empty' : isLowStock ? 'status-low' : 'status-ok'}`}>
            {isOutOfStock ? 'Out of Stock' : isLowStock ? `Low Stock (${props.stock})` : `In Stock (${props.stock})`}
          </span>
        </div>

        <div className="menu-price-container">
          <span className="menu-price-label">Price</span>
          <span className="menu-price">₱{props.price.toLocaleString()}</span>
        </div>
      </div>

      {/* Product Actions */}
      <div className="menu-action-container">
        {isOutOfStock ? (
          <button className="sold-out-btn" disabled>
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
              <circle cx="12" cy="12" r="10"></circle>
              <line x1="4.93" y1="4.93" x2="19.07" y2="19.07"></line>
            </svg>
            Out of Stock
          </button>
        ) : (
          <>
            <div className="quantity-controller">
              <button 
                onClick={handleDecrement} 
                className="quantity-btn decrement" 
                aria-label="Decrease quantity" 
                disabled={quantity === 0}
              >
                −
              </button>
              <span className="quantity-count">{quantity}</span>
              <button 
                onClick={handleIncrement} 
                className="quantity-btn increment" 
                aria-label="Increase quantity" 
                disabled={quantity === props.stock}
              >
                +
              </button>
            </div>
            
            <button 
              onClick={handleAddClick} 
              className={`add-btn ${quantity > 0 ? 'active' : ''}`}
              disabled={quantity === 0}
            >
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
                <circle cx="9" cy="21" r="1"></circle>
                <circle cx="20" cy="21" r="1"></circle>
                <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
              </svg>
              {quantity > 0 ? `Add ${quantity} to Cart` : 'Add to Cart'}
            </button>
          </>
        )}
      </div>
    </div>
  );
}