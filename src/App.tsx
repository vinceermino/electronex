import { useState } from "react";
import Menu from "./Components/Menu";
import "./App.css";

interface OrderItem {
  name: string;
  price: number;
  quantity: number;
  image: string;
}

const PRODUCTS = [
  {
    name: "Titanium Phone Ultra",
    price: 59999,
    description: "Sleek titanium body, 200MP camera, 120Hz display, and all-day battery life.",
    rating: 4.9,
    image: "/images/smartphone.png",
    category: "Smartphones"
  },
  {
    name: "ProBook X14",
    price: 79999,
    description: "Next-gen laptop with 14-inch OLED screen, 32GB RAM, and blazing-fast performance.",
    rating: 4.8,
    image: "/images/laptop.png",
    category: "Laptops"
  },
  {
    name: "SoundPro ANC Headphones",
    price: 14499,
    description: "Active noise-canceling wireless headphones with studio-quality audio.",
    rating: 4.7,
    image: "/images/headphones.png",
    category: "Audio"
  },
  {
    name: "SmartWatch Elite",
    price: 9999,
    description: "Track your health, fitness, and notifications with an elegant sapphire glass screen.",
    rating: 4.6,
    image: "/images/smartwatch.png",
    category: "Wearables"
  },
  {
    name: "Ultra Tab 11",
    price: 24999,
    description: "Lightweight 11-inch tablet, ideal for creators with pencil support and 120Hz refresh rate.",
    rating: 4.7,
    image: "/images/tablet.png",
    category: "Tablets"
  },
  {
    name: "CinemaCore Soundbar",
    price: 18999,
    description: "Immersive Dolby Atmos surround soundbar with wireless subwoofer for your home theater.",
    rating: 4.8,
    image: "/images/soundbar.png",
    category: "Audio"
  },
  {
    name: "4K Pro Stream Camera",
    price: 6499,
    description: "Crystal clear 4K webcam with auto-focus and dual stereo noise-canceling microphones.",
    rating: 4.5,
    image: "/images/webcam.png",
    category: "Accessories"
  },
  {
    name: "ChargeDock Duo",
    price: 2499,
    description: "Fast wireless charging stand for your smartphone and smartwatch simultaneously.",
    rating: 4.4,
    image: "https://images.unsplash.com/photo-1622445262465-2481c457487f?w=500&auto=format&fit=crop&q=60",
    category: "Accessories"
  },
  {
    name: "CyberGrip Mouse",
    price: 3999,
    description: "Ergonomic wireless gaming mouse with 26K DPI sensor and custom RGB lighting.",
    rating: 4.6,
    image: "https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?w=500&auto=format&fit=crop&q=60",
    category: "Accessories"
  },
  {
    name: "Apex Mechanical Keyboard",
    price: 5999,
    description: "Hot-swappable tactile mechanical keyboard with premium PBT keycaps and aluminum frame.",
    rating: 4.7,
    image: "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=500&auto=format&fit=crop&q=60",
    category: "Accessories"
  }
];

const CATEGORIES = ["All", "Smartphones", "Laptops", "Audio", "Wearables", "Tablets", "Accessories"];

const getCategoryIcon = (category: string) => {
  switch (category) {
    case "All":
      return (
        <svg className="category-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="3" width="7" height="7"></rect>
          <rect x="14" y="3" width="7" height="7"></rect>
          <rect x="14" y="14" width="7" height="7"></rect>
          <rect x="3" y="14" width="7" height="7"></rect>
        </svg>
      );
    case "Smartphones":
      return (
        <svg className="category-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <rect x="5" y="2" width="14" height="20" rx="2" ry="2"></rect>
          <line x1="12" y1="18" x2="12.01" y2="18"></line>
        </svg>
      );
    case "Laptops":
      return (
        <svg className="category-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect>
          <line x1="2" y1="20" x2="22" y2="20"></line>
          <line x1="12" y1="17" x2="12" y2="20"></line>
        </svg>
      );
    case "Audio":
      return (
        <svg className="category-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M3 18v-6a9 9 0 0 1 18 0v6"></path>
          <path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z"></path>
        </svg>
      );
    case "Wearables":
      return (
        <svg className="category-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="7"></circle>
          <polyline points="12 9 12 12 13.5 13.5"></polyline>
          <path d="M16.51 7.49L18 2h-6l1.49 5.49M7.49 16.51L6 22h6l-1.49-5.49"></path>
        </svg>
      );
    case "Tablets":
      return (
        <svg className="category-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <rect x="4" y="2" width="16" height="20" rx="2" ry="2" transform="rotate(90 12 12)"></rect>
          <line x1="12" y1="18" x2="12.01" y2="18"></line>
        </svg>
      );
    case "Accessories":
      return (
        <svg className="category-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path>
          <polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline>
          <line x1="12" y1="22.08" x2="12" y2="12"></line>
        </svg>
      );
    default:
      return null;
  }
};

function App() {
  const [orders, setOrders] = useState<OrderItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>("All");

  const filteredProducts = selectedCategory === "All"
    ? PRODUCTS
    : PRODUCTS.filter(product => product.category === selectedCategory);

  const handleAddToOrder = (name: string, price: number, image: string, quantity: number) => {
    setOrders(prevOrders => {
      const existing = prevOrders.find(item => item.name === name);
      if (existing) {
        return prevOrders.map(item =>
          item.name === name ? { ...item, quantity: item.quantity + quantity } : item
        );
      }
      return [...prevOrders, { name, price, image, quantity }];
    });
  };

  const handleUpdateQuantity = (name: string, delta: number) => {
    setOrders(prevOrders =>
      prevOrders
        .map(item => item.name === name ? { ...item, quantity: item.quantity + delta } : item)
        .filter(item => item.quantity > 0)
    );
  };

  const handleRemoveItem = (name: string) => {
    setOrders(prevOrders => prevOrders.filter(item => item.name !== name));
  };

  const handleClearOrder = () => {
    setOrders([]);
    setIsCartOpen(false);
  };

  const totalItems = orders.reduce((sum, item) => sum + item.quantity, 0);
  const subtotalPrice = orders.reduce((sum, item) => sum + item.quantity * item.price, 0);
  const shippingFee = subtotalPrice === 0 ? 0 : subtotalPrice > 15000 ? 0 : 150;
  const totalPrice = subtotalPrice + shippingFee;

  return (
    <div className="app-layout">
      {/* Top Header Tracker */}
      <header className="main-header">
        <div className="header-brand">
          <div className="brand-logo-container">
            <svg className="brand-logo" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect>
              <line x1="8" y1="21" x2="16" y2="21"></line>
              <line x1="12" y1="17" x2="12" y2="21"></line>
            </svg>
            <h1 className="header-title">ElectroNex</h1>
          </div>
          <p className="header-subtitle">Premium gadgets, state-of-the-art tech, and fast shipping.</p>
        </div>
        <div 
          className={`order-tracker-badge ${totalItems === 0 ? "disabled" : "clickable"}`}
          onClick={() => totalItems > 0 && setIsCartOpen(true)}
          role="button"
          aria-disabled={totalItems === 0}
        >
          <div className="cart-icon-wrapper">
            <svg
              className="cart-icon"
              width="20"
              height="20"
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
            {totalItems > 0 && (
              <span className="cart-count-badge">{totalItems}</span>
            )}
          </div>
          <span className="tracker-text">
            {totalItems === 0 ? "Cart Empty" : `${totalItems} items | ₱${totalPrice.toLocaleString()}`}
          </span>
        </div>
      </header>

      {/* Main Grid Workspace */}
      <div className="main-content">
        {/* Full-width catalog grid */}
        <main className="menu-section">
          {/* Promo Hero Banner */}
          

          {/* Catalog Header */}
          <div className="catalog-header">
            <div>
              <h2 className="catalog-title">Product Catalog</h2>
              <span className="catalog-count">{filteredProducts.length} Premium Items Available</span>
            </div>

            {/* Category Dropdown */}
            <div className="category-dropdown-container">
              <label htmlFor="category-select" className="dropdown-label">Category</label>
              <div className="select-wrapper">
                {getCategoryIcon(selectedCategory)}
                <select
                  id="category-select"
                  className="category-select-dropdown"
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                >
                  {CATEGORIES.map(category => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
                <svg className="dropdown-arrow" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="6 9 12 15 18 9"></polyline>
                </svg>
              </div>
            </div>
          </div>

          <div className="menu-grid">
            {filteredProducts.map(product => (
              <Menu
                key={product.name}
                image={product.image}
                price={product.price}
                rating={product.rating}
                name={product.name}
                description={product.description}
                onAddToOrder={(qty) => handleAddToOrder(product.name, product.price, product.image, qty)}
              />
            ))}
          </div>
        </main>
      </div>

      {/* Cart Modal Slide-out Drawer */}
      {isCartOpen && orders.length > 0 && (
        <div className="cart-modal-overlay" onClick={() => setIsCartOpen(false)}>
          <div className="cart-modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="cart-modal-header">
              <h2 className="sidebar-title">Manage Cart</h2>
              <button className="close-modal-btn" onClick={() => setIsCartOpen(false)} aria-label="Close cart">
                ✕
              </button>
            </div>

            <div className="order-list-container">
              <div className="order-items-list">
                {orders.map(item => (
                  <div key={item.name} className="order-item-card">
                    <img src={item.image} alt={item.name} className="order-item-thumb" />
                    <div className="order-item-details">
                      <div className="order-item-header">
                        <span className="order-item-name">{item.name}</span>
                        <button onClick={() => handleRemoveItem(item.name)} className="item-remove-btn" title="Remove item">
                          ✕
                        </button>
                      </div>
                      <div className="order-item-pricing">
                        <span className="order-item-subtotal">₱{(item.price * item.quantity).toLocaleString()}</span>
                        <div className="order-item-controls">
                          <button onClick={() => handleUpdateQuantity(item.name, -1)} className="order-qty-btn">
                            −
                          </button>
                          <span className="order-qty-val">{item.quantity}</span>
                          <button onClick={() => handleUpdateQuantity(item.name, 1)} className="order-qty-btn">
                            +
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="order-summary">
                <div className="summary-row">
                  <span>Total Items</span>
                  <span className="summary-val">{totalItems}</span>
                </div>
                <div className="summary-row">
                  <span>Subtotal Price</span>
                  <span className="summary-val">₱{subtotalPrice.toLocaleString()}</span>
                </div>
                <div className="summary-row">
                  <span>Shipping Fee</span>
                  <span className="summary-val">
                    {shippingFee === 0 ? (
                      <span style={{ color: "#22c55e", fontWeight: "600" }}>FREE</span>
                    ) : (
                      `₱${shippingFee}`
                    )}
                  </span>
                </div>
                <div className="summary-row total-price-row">
                  <span>Total Price</span>
                  <span className="summary-val">₱{totalPrice.toLocaleString()}</span>
                </div>
                <div className="summary-actions">
                  <button onClick={handleClearOrder} className="clear-btn">
                    Clear All
                  </button>
                  <button onClick={() => alert(`Checkout successful! Total amount charged: ₱${totalPrice.toLocaleString()}`)} className="checkout-btn">
                    Checkout
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
