import { useEffect, useState } from "react";
import api from "../services/api";

const OrdersPage = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    api.get("/orders/my").then((res) => setOrders(res.data.orders));
  }, []);

  return (
    <main className="container">
      <h2>Order History</h2>
      {orders.map((order) => (
        <article key={order.id} className="order">
          <h4>Order #{order.id} - ${order.total.toFixed(2)}</h4>
          <p>Status: {order.status}</p>
          {order.orderItems.map((item) => (
            <p key={item.id}>{item.title} x {item.quantity}</p>
          ))}
        </article>
      ))}
    </main>
  );
};

export default OrdersPage;
