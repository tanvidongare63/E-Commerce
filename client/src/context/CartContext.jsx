import { createContext, useContext, useMemo, useState } from "react";

const CartContext = createContext(null);

export const CartProvider = ({ children }) => {
  const [items, setItems] = useState(() => JSON.parse(localStorage.getItem("cart") || "[]"));

  const updateStorage = (next) => {
    setItems(next);
    localStorage.setItem("cart", JSON.stringify(next));
  };

  const addToCart = (product) => {
    const existing = items.find((item) => item.id === product.id);
    if (existing) {
      updateStorage(items.map((item) => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item));
    } else {
      updateStorage([...items, { ...product, quantity: 1 }]);
    }
  };

  const updateQuantity = (id, quantity) => {
    if (quantity <= 0) {
      removeItem(id);
      return;
    }
    updateStorage(items.map((item) => item.id === id ? { ...item, quantity } : item));
  };

  const removeItem = (id) => updateStorage(items.filter((item) => item.id !== id));
  const clearCart = () => updateStorage([]);

  const total = useMemo(
    () => items.reduce((sum, item) => sum + item.price * item.quantity, 0),
    [items],
  );

  return (
    <CartContext.Provider value={{ items, addToCart, updateQuantity, removeItem, clearCart, total }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
