import { useEffect, useState } from "react";
import api from "../services/api";

const emptyForm = { title: "", description: "", imageUrl: "", category: "", price: 0, stock: 0 };

const AdminPage = () => {
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [form, setForm] = useState(emptyForm);

  const load = async () => {
    const [productRes, orderRes] = await Promise.all([
      api.get("/products"),
      api.get("/orders"),
    ]);
    setProducts(productRes.data.products);
    setOrders(orderRes.data.orders);
  };

  useEffect(() => {
    load();
  }, []);

  const addProduct = async (e) => {
    e.preventDefault();
    await api.post("/products", { ...form, price: Number(form.price), stock: Number(form.stock) });
    setForm(emptyForm);
    load();
  };

  const deleteProduct = async (id) => {
    await api.delete(`/products/${id}`);
    load();
  };

  return (
    <main className="container admin">
      <h2>Admin Dashboard</h2>
      <form onSubmit={addProduct} className="form">
        <input placeholder="Title" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} />
        <input placeholder="Category" value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} />
        <input placeholder="Image URL" value={form.imageUrl} onChange={(e) => setForm({ ...form, imageUrl: e.target.value })} />
        <textarea placeholder="Description" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />
        <input type="number" placeholder="Price" value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })} />
        <input type="number" placeholder="Stock" value={form.stock} onChange={(e) => setForm({ ...form, stock: e.target.value })} />
        <button type="submit">Add Product</button>
      </form>

      <h3>Manage Inventory</h3>
      {products.map((product) => (
        <article key={product.id} className="cart-item">
          <p>{product.title} ({product.stock} in stock)</p>
          <button onClick={() => deleteProduct(product.id)}>Delete</button>
        </article>
      ))}

      <h3>All Orders</h3>
      {orders.map((order) => (
        <article key={order.id} className="order">
          <p>#{order.id} - {order.user.name} - ${order.total.toFixed(2)}</p>
        </article>
      ))}
    </main>
  );
};

export default AdminPage;
