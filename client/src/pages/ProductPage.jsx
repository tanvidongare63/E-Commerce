import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../services/api";
import { useCart } from "../context/CartContext";

const ProductPage = () => {
  const { id } = useParams();
  const { addToCart } = useCart();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    api.get(`/products/${id}`).then((res) => setProduct(res.data.product));
  }, [id]);

  if (!product) return <p className="container">Loading product...</p>;

  return (
    <main className="container detail">
      <img src={product.imageUrl || "https://via.placeholder.com/500x350?text=Product"} alt={product.title} />
      <div>
        <h2>{product.title}</h2>
        <p>{product.description}</p>
        <p>Category: {product.category}</p>
        <p>Stock: {product.stock}</p>
        <h3>${product.price.toFixed(2)}</h3>
        <button onClick={() => addToCart(product)} disabled={product.stock === 0}>Add to Cart</button>
      </div>
    </main>
  );
};

export default ProductPage;
