# ElectroNex — React State Management Practice

A React + TypeScript e-commerce app for electronics. The UI is fully built — **your job is to implement the logic**.

---

## Getting Started

```bash
npm install
npm run dev
```

Open `http://localhost:5173` in your browser. You will see the UI, but nothing works yet.

---

## Project Structure

```
electronex/
├── public/images/              # Product images
├── src/
│   ├── Components/
│   │   ├── Menu.tsx            # Product card component (TODOs 1–4)
│   │   └── OrderSummary.tsx    # (unused in current layout)
│   ├── App.tsx                 # Main app with cart management (TODOs 6–11)
│   ├── App.css                 # (empty — styles are in index.css)
│   ├── index.css               # All styling (DO NOT MODIFY)
│   └── main.tsx                # Entry point (DO NOT MODIFY)
├── package.json
└── README.md
```

---

## Concepts You Will Practice

| Concept | Where You Will Use It |
|---|---|
| `useState` hook | TODOs 1, 6 |
| State updater functions | TODOs 2, 3, 7, 8, 9, 10 |
| Functional state updates | TODOs 7, 8, 9 |
| Callback props (child → parent) | TODOs 4, 7 |
| Array methods: `.find()`, `.map()`, `.filter()` | TODOs 7, 8, 9 |
| `.reduce()` for computed values | TODO 11 |
| Displaying state in JSX | TODOs 1, 11 |
| The spread operator `{ ...obj }` | TODOs 7, 8 |

---

## Architecture Overview

```
+----------------------------------------------------------+
|                        App.tsx                            |
|                                                          |
|  State: orders[] -------------------------+              |
|                                           |              |
|  +-----------------+    +---------------+ |              |
|  |   Cart Modal    |    |   Menu Grid   | |              |
|  |   (Drawer)      |    |               | |              |
|  |                 |    |  +----------+ | |              |
|  |  Reads orders[] |    |  | Menu.tsx | | |              |
|  |  to display the |    |  |          | | |              |
|  |  cart items      |    |  | Has its  | | |              |
|  |                 |    |  | own qty  | | |              |
|  |  Calls:         |    |  | state    | | |              |
|  |  handleUpdate   |    |  |          |---+              |
|  |    Quantity     |    |  | Calls    |                  |
|  |  handleRemove   |    |  | onAddTo |                  |
|  |    Item         |    |  | Order   |                  |
|  |  handleClear    |    |  | (callback|                  |
|  |    Order        |    |  | to parent|                  |
|  +-----------------+    |  +----------+                  |
|                         +---------------+                |
+----------------------------------------------------------+
```

**Data flow:**
1. Each `Menu` card manages its **own** quantity (local state).
2. When the user clicks "Add to Cart", `Menu` calls the `onAddToOrder` callback, passing the quantity up to `App`.
3. `App` updates the shared `orders[]` state.
4. The cart modal reads `orders[]` to display the cart, totals, and controls.

---

## TODO Walkthrough

Complete these in order. Each one builds on the previous.

---

### File: `src/Components/Menu.tsx`

#### TODO 1 — Create quantity state

Create a `quantity` state variable initialized to `0`.

**What you need to know:**
- `useState` returns an array: the current value and a setter function.
- Syntax: `const [value, setValue] = useState(initialValue);`
- After creating the state, replace the hardcoded `{0}` inside `<span className="quantity-count">` with your state variable.
- Update `disabled={true}` on the decrement button to `disabled={quantity === 0}`.
- Update `disabled={true}` on the "Add to Cart" button to `disabled={quantity === 0}`.

#### TODO 2 — Implement `handleIncrement`

Increase the quantity by 1 when the `+` button is clicked.

**What you need to know:**
- Call your setter: `setQuantity(prev => prev + 1)`

#### TODO 3 — Implement `handleDecrement`

Decrease the quantity by 1, but never below 0.

**What you need to know:**
- Use an `if` guard: only decrease if `quantity > 0`.

#### TODO 4 — Implement `handleAddClick`

Two things happen when "Add to Cart" is clicked:
1. If `quantity === 0`, return early (do nothing).
2. Call `props.onAddToOrder(quantity)` to send the quantity to the parent.
3. Reset the local quantity back to `0`.

**What you need to know:**
- Props contain callback functions that let child components communicate with parents.
- This is React's standard pattern for child-to-parent communication.

---

### File: `src/App.tsx`

#### TODO 6 — Create orders state

Replace the plain `const orders: OrderItem[] = [];` with a proper `useState` call.

**What you need to know:**
- Use a TypeScript generic to tell React the type:
  ```tsx
  const [orders, setOrders] = useState<OrderItem[]>([]);
  ```
- The `OrderItem` interface is already defined at the top of the file.

#### TODO 7 — Implement `handleAddToOrder` (the hardest one!)

When a menu item is added:
1. Check if it already exists in `orders` (by `name`).
2. If it exists: update its quantity (add the new quantity to the old one).
3. If it does not exist: append a new `OrderItem`.

**What you need to know:**
- **Functional updates:** `setOrders(prevOrders => { ... return newOrders })` ensures you work with the latest state.
- **`.find()`:** Returns the first matching element, or `undefined`.
  ```tsx
  const existing = prevOrders.find(item => item.name === name);
  ```
- **`.map()`:** Creates a new array by transforming each element.
  ```tsx
  prevOrders.map(item =>
    item.name === name
      ? { ...item, quantity: item.quantity + quantity }
      : item
  )
  ```
- **Spread operator:** `{ ...item, quantity: newValue }` creates a copy with `quantity` overridden.

#### TODO 8 — Implement `handleUpdateQuantity`

When `+` or `−` is clicked in the cart:
1. Update the matching item's quantity by `delta` (+1 or -1).
2. Remove items where quantity drops to 0.

**What you need to know:**
- Chain `.map()` then `.filter()`:
  ```tsx
  prevOrders
    .map(item => item.name === name ? { ...item, quantity: item.quantity + delta } : item)
    .filter(item => item.quantity > 0)
  ```

#### TODO 9 — Implement `handleRemoveItem`

Remove an item from the orders array by name.

**What you need to know:**
- `.filter()` returns a new array excluding the match:
  ```tsx
  prevOrders.filter(item => item.name !== name)
  ```

#### TODO 10 — Implement `handleClearOrder`

Reset orders to an empty array and close the cart modal.

**What you need to know:**
- Call `setOrders([])` and `setIsCartOpen(false)`.

#### TODO 11 — Calculate `totalItems`, `subtotalPrice`, `shippingFee`, and `totalPrice`

Replace the hardcoded `0` values with computed values.

**What you need to know:**
- `.reduce()` accumulates a single result from an array:
  ```tsx
  const totalItems = orders.reduce((sum, item) => sum + item.quantity, 0);
  const subtotalPrice = orders.reduce((sum, item) => sum + item.quantity * item.price, 0);
  ```
- Shipping fee: free if subtotal is 0 or over ₱15,000, otherwise ₱150.
- Total price: subtotal + shipping fee.

---

## How to Test Your Progress

| After completing... | You should see... |
|---|---|
| TODOs 1–4 | Menu card quantity buttons work (increment, decrement, resets after add) |
| TODO 6 | App compiles without errors (orders state exists) |
| TODO 7 | Clicking "Add to Cart" adds items to the cart |
| TODO 8 | Cart +/− buttons update quantities (removes at 0) |
| TODO 9 | The ✕ button removes items from cart |
| TODO 10 | "Clear All" empties the cart |
| TODO 11 | Header badge and cart summary show correct totals |

---

## Key Principles

1. **Never mutate state directly.** Do not use `orders.push(...)`. Always create a new array/object.
2. **Use functional updates** when new state depends on old state: `setState(prev => ...)`
3. **The spread operator** `{ ...obj, key: newValue }` is your tool for immutable updates.
4. **Derived values** (like totals) should be calculated on every render, not stored in state.
5. **Props are one-way** (parent → child). Use **callback props** for child → parent communication.

---

## When You Are Done

Switch to the `main` branch to compare your solution with the complete code:

```bash
git checkout main
```

Or compare side-by-side:

```bash
git diff main -- src/App.tsx src/Components/Menu.tsx
```

Good luck!
