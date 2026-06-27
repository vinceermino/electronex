interface OrderItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

interface OrderSummaryProps {
  orders: OrderItem[];
  totalItems: number;
  totalPrice: number;
  onUpdateQuantity: (id: number, delta: number) => void;
  onRemoveItem: (name: string) => void;
  onClearOrder: () => void;
}

export default function OrderSummary({
  orders,
  totalItems,
  totalPrice,
  onUpdateQuantity,
  onRemoveItem,
  onClearOrder,
}: OrderSummaryProps) {
  return (
    <aside className="sidebar-section">
      <h2 className="sidebar-title">Manage Order</h2>

      {orders.length === 0 ? (
        <div className="empty-state">
          <svg
            className="empty-icon"
            width="48"
            height="48"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="9" cy="21" r="1"></circle>
            <circle cx="20" cy="21" r="1"></circle>
            <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
          </svg>
          <p>Your order is empty.</p>
          <p className="empty-sub">Choose items from the menu to add.</p>
        </div>
      ) : (
        <div className="order-list-container">
          <div className="order-items-list">
            {orders.map(item => (
              <div key={item.name} className="order-item-card">
                <img src={item.image} alt={item.name} className="order-item-thumb" />
                <div className="order-item-details">
                  <div className="order-item-header">
                    <span className="order-item-name">{item.name}</span>
                    <button onClick={() => onRemoveItem(item.name)} className="item-remove-btn" title="Remove item">
                      ✕
                    </button>
                  </div>
                  <div className="order-item-pricing">
                    <span className="order-item-subtotal">₱{item.price * item.quantity}</span>
                    <div className="order-item-controls">
                      <button onClick={() => onUpdateQuantity(item.id, -1)} className="order-qty-btn">
                        −
                      </button>
                      <span className="order-qty-val">{item.quantity}</span>
                      <button onClick={() => onUpdateQuantity(item.id, 1)} className="order-qty-btn">
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
            <div className="summary-row total-price-row">
              <span>Total Price</span>
              <span className="summary-val">₱{totalPrice}</span>
            </div>
            <div className="summary-actions">
              <button onClick={onClearOrder} className="clear-btn">
                Clear All
              </button>
              <button onClick={() => alert(`Order placed successfully! Total: ₱${totalPrice}`)} className="checkout-btn">
                Place Order
              </button>
            </div>
          </div>
        </div>
      )}
    </aside>
  );
}
