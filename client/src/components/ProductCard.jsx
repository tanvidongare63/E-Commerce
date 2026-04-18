import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();

  return (
    <motion.article whileHover={{ y: -6, scale: 1.01 }} className="product-card">
      <img src={product.imageUrl || "https://via.placeholder.com/350x220?text=Product"} alt={product.title} />
      <span className="stock-pill">{product.stock > 0 ? `${product.stock} left` : "Out of stock"}</span>
      <h3>{product.title}</h3>
      <p>{product.category}</p>
      <strong>${product.price.toFixed(2)}</strong>
      <div className="row">
        <Link to={`/products/${product.id}`}>View</Link>
        <motion.button whileTap={{ scale: 0.94 }} onClick={() => addToCart(product)} disabled={product.stock <= 0}>
          Add to Cart
        </motion.button>
      </div>
    </motion.article>
  );
};

export default ProductCard;
