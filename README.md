# Filipino Menu Ordering App - Learning Guide

A React + TypeScript menu ordering app for Filipino dishes. The UI is fully built — **your job is to implement the logic**.

---

## Project Structure

```
menu/
├── public/images/         # Food images (adobo, sinigang, kaldereta)
├── src/
│   ├── Components/
│   │   └── Menu.tsx       # Individual menu item card (TODOs 1-5)
│   ├── App.tsx            # Main app with order management (TODOs 6-13)
│   ├── App.css            # (empty — styles are in index.css)
│   ├── index.css          # All styling (DO NOT MODIFY)
│   └── main.tsx           # Entry point (DO NOT MODIFY)
├── package.json
└── README.md              # You are here
```

---

## Getting Started

```bash
# Install dependencies
npm install

# Start the development server
npm run dev
```

Open `http://localhost:5173` in your browser. You will see the UI, but nothing works yet — that is your job!

---

## Concepts You Will Practice

| Concept | Where You Will Use It |
|---|---|
| `useState` hook | TODOs 1, 6 |
| State updater functions | TODOs 2, 3, 7, 8, 9, 10 |
| Functional state updates | TODOs 7, 8, 9 |
| Callback props (child to parent) | TODOs 4, 7 |
| Array methods: `.find()`, `.map()`, `.filter()` | TODOs 7, 8, 9 |
| `.reduce()` for computed values | TODO 11 |
| Displaying state in JSX | TODOs 5, 13 |
| Conditional rendering | TODO 12 |
| The spread operator `{ ...obj }` | TODOs 7, 8 |

---

## How the App Works (Architecture Overview)

```
+----------------------------------------------------------+
|                        App.tsx                            |
|                                                          |
|  State: orders[] -------------------------+              |
|                                           |              |
|  +-----------------+    +---------------+ |              |
|  |   Sidebar       |    |   Menu Grid   | |              |
|  |   (Order List)  |    |               | |              |
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
2. When the user clicks "Add to Order", `Menu` calls the `onAddToOrder` callback, passing the quantity up to `App`.
3. `App` updates the shared `orders[]` state.
4. The sidebar reads `orders[]` to display the cart, totals, and controls.

---

## TODO Walkthrough

Complete these in order. Each one builds on the previous.

---

### File: `src/Components/Menu.tsx`

#### TODO 1 — Create quantity state

Create a `quantity` state variable initialized to `1`.

**What you need to know:**
- `useState` returns an array with two items: the current value, and a setter function.
- Syntax: `const [value, setValue] = useState(initialValue);`

#### TODO 2 — Implement `handleIncrement`

Increase the quantity by 1 when the `+` button is clicked.

**What you need to know:**
- Call your setter and pass the new value: `setQuantity(quantity + 1)`

#### TODO 3 — Implement `handleDecrement`

Decrease the quantity by 1, but never below 1.

**What you need to know:**
- Use an `if` statement to guard: only decrease if `quantity > 1`.

#### TODO 4 — Implement `handleAddClick`

Two things happen when "Add to Order" is clicked:
1. Call `props.onAddToOrder(quantity)` to send the quantity up to the parent.
2. Reset the local quantity back to `1`.

**What you need to know:**
- Props contain callback functions that let child components communicate with parents.
- This is React's standard pattern for child to parent communication.

#### TODO 5 — Display quantity in JSX

Replace the hardcoded `1` inside the `<span className="quantity-count">` with your state variable.

---

### File: `src/App.tsx`

#### TODO 6 — Create orders state

Create an `orders` state variable initialized to an empty array `[]`.

**What you need to know:**
- Use a TypeScript generic to tell React the type of the array:
  ```tsx
  const [orders, setOrders] = useState<OrderItem[]>([]);
  ```
- The `OrderItem` interface is already defined at the top of the file.

#### TODO 7 — Implement `handleAddToOrder` (the hardest one!)

This is the core logic. When a menu item is added:
1. Check if it already exists in `orders` (by `name`).
2. If it exists: update its quantity (add the new quantity to the old one).
3. If it does not exist: append a new `OrderItem`.

**What you need to know:**
- **Functional updates:** `setOrders(prevOrders => { ... return newOrders })` — this ensures you are working with the latest state.
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
- **Spread operator:** `{ ...item, quantity: newValue }` creates a copy of `item` with `quantity` overridden. This is how you do immutable updates in React.

#### TODO 8 — Implement `handleUpdateQuantity`

When `+` or `-` is clicked in the sidebar order list:
1. Update the matching item's quantity by `delta` (+1 or -1).
2. Remove items where quantity drops to 0.

**What you need to know:**
- Chain `.map()` (to update) then `.filter()` (to remove zeros):
  ```tsx
  prevOrders
    .map(item => item.name === name ? { ...item, quantity: item.quantity + delta } : item)
    .filter(item => item.quantity > 0)
  ```

#### TODO 9 — Implement `handleRemoveItem`

Remove an item from the orders array by name.

**What you need to know:**
- `.filter()` returns a new array with only the elements that pass the test:
  ```tsx
  prevOrders.filter(item => item.name !== name)
  ```

#### TODO 10 — Implement `handleClearOrder`

Reset the orders to an empty array.

**What you need to know:**
- Simply call `setOrders([])`.

#### TODO 11 — Calculate `totalItems` and `totalPrice`

These are **derived values** (computed from state, not stored in state).

**What you need to know:**
- `.reduce()` iterates over an array and accumulates a single result:
  ```tsx
  const totalItems = orders.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = orders.reduce((sum, item) => sum + item.quantity * item.price, 0);
  ```
- The `0` at the end is the initial value of `sum`.

#### TODO 12 — Conditional Rendering (already done!)

The ternary `orders.length === 0 ? <empty> : <list>` is already in the JSX. It will work automatically once you have your `orders` state from TODO 6. Just make sure your variable is named `orders`.

#### TODO 13 — Display item subtotal

Replace the hardcoded `{0}` with `{item.price * item.quantity}`.

---

## How to Test Your Progress

Test incrementally as you complete TODOs:

| After completing... | You should see... |
|---|---|
| TODOs 1-5 | Menu card quantity buttons work (incrementing/decrementing, resets after add) |
| TODO 6 | App compiles without errors (empty order state exists) |
| TODO 7 | Clicking "Add to Order" adds items to the sidebar |
| TODO 8 | Sidebar +/- buttons update quantities (and removes at 0) |
| TODO 9 | The X button removes items from sidebar |
| TODO 10 | "Clear All" empties the sidebar |
| TODO 11 | Header badge shows correct totals, summary section shows totals |
| TODO 13 | Each sidebar item shows the correct subtotal (price x quantity) |

---

## Key Principles to Remember

1. **Never mutate state directly.** Do not do `orders.push(...)`. Always create a new array/object.
2. **Use functional updates** when new state depends on old state: `setState(prev => ...)`
3. **The spread operator** `{ ...obj, key: newValue }` is your best friend for immutable updates.
4. **Derived values** (like totals) should be calculated on every render, not stored in state.
5. **Props are one-way** (parent to child). Use **callback props** for child to parent communication.

---

## When You Are Done

Switch back to the `main` branch to compare your solution with the complete code:

```bash
git checkout main
```

Or compare side-by-side:

```bash
git diff main -- src/App.tsx src/Components/Menu.tsx
```

Good luck!
