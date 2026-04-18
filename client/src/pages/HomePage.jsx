import { useEffect, useState } from "react";
import api from "../services/api";
import ProductCard from "../components/ProductCard";

const HomePage = () => {
  const [products, setProducts] = useState([]);
  const [allProducts, setAllProducts] = useState([]);
  const [filters, setFilters] = useState({ search: "", category: "" });
  const [sortBy, setSortBy] = useState("newest");

  useEffect(() => {
    api.get("/products", { params: filters }).then((res) => {
      const nextProducts = res.data.products || [];
      setAllProducts(nextProducts);
      setProducts(nextProducts);
    });
  }, [filters]);

  useEffect(() => {
    const sorted = [...allProducts];
    if (sortBy === "priceLow") sorted.sort((a, b) => a.price - b.price);
    if (sortBy === "priceHigh") sorted.sort((a, b) => b.price - a.price);
    if (sortBy === "name") sorted.sort((a, b) => a.title.localeCompare(b.title));
    setProducts(sorted);
  }, [sortBy, allProducts]);

  const categories = [...new Set(allProducts.map((item) => item.category))];

  return (
    <main className="container">
      <section className="hero">
        <h1>Discover great products</h1>
        <h3 className="shopping-statement">Shop smart, save every day.</h3>
        <p>Interactive shopping with fast filtering and smooth cart flow.</p>
        <p className="hero-meta">{products.length} products available right now</p>
      </section>
      <section className="filters">
        <input
          placeholder="Search products..."
          value={filters.search}
          onChange={(e) => setFilters((s) => ({ ...s, search: e.target.value }))}
        />
        <input
          placeholder="Category..."
          value={filters.category}
          onChange={(e) => setFilters((s) => ({ ...s, category: e.target.value }))}
        />
        <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
          <option value="newest">Sort: Newest</option>
          <option value="priceLow">Price: Low to High</option>
          <option value="priceHigh">Price: High to Low</option>
          <option value="name">Name: A-Z</option>
        </select>
      </section>
      <section className="category-chips">
        <button
          className={filters.category === "" ? "chip active" : "chip"}
          onClick={() => setFilters((s) => ({ ...s, category: "" }))}
        >
          All
        </button>
        {categories.map((category) => (
          <button
            key={category}
            className={filters.category === category ? "chip active" : "chip"}
            onClick={() => setFilters((s) => ({ ...s, category }))}
          >
            {category}
          </button>
        ))}
      </section>
      <section className="grid">
        {products.map((product) => <ProductCard key={product.id} product={product} />)}
      </section>
    </main>
  );
};

export default HomePage;
