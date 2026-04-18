import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";

const CartPage = () => {
  const { items, total, updateQuantity, removeItem } = useCart();

  return (
    <main className="container">
      <h2>Your Cart</h2>
      {items.length === 0 && <p>Cart is empty.</p>}
      {items.map((item) => (
        <article key={item.id} className="cart-item">
          <div>
            <h4>{item.title}</h4>
            <p>${item.price.toFixed(2)}</p>
          </div>
          <input
            type="number"
            min="1"
            value={item.quantity}
            onChange={(e) => updateQuantity(item.id, Number(e.target.value))}
          />
          <button onClick={() => removeItem(item.id)}>Remove</button>
        </article>
      ))}
      <h3>Total: ${total.toFixed(2)}</h3>
      <Link to="/checkout" className="btn">Proceed to Checkout</Link>
    </main>
  );
};

export default CartPage;
