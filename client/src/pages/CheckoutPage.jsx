import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import api from "../services/api";

const CheckoutPage = () => {
  const navigate = useNavigate();
  const { items, clearCart, total } = useCart();
  const [processing, setProcessing] = useState(false);

  const checkout = async () => {
    setProcessing(true);
    try {
      await api.post("/orders/checkout", {
        items: items.map((item) => ({ productId: item.id, quantity: item.quantity })),
      });
      clearCart();
      navigate("/orders");
    } finally {
      setProcessing(false);
    }
  };

  return (
    <main className="container">
      <h2>Checkout Summary</h2>
      {items.map((item) => (
        <p key={item.id}>{item.title} x {item.quantity}</p>
      ))}
      <h3>Subtotal: ${total.toFixed(2)}</h3>
      <button disabled={!items.length || processing} onClick={checkout}>
        {processing ? "Processing..." : "Place Order"}
      </button>
      <p className="note">Stripe/Razorpay can be plugged in here before order confirmation.</p>
    </main>
  );
};

export default CheckoutPage;
