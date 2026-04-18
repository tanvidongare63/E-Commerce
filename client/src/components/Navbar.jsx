import { Link, NavLink } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";

const Navbar = () => {
  const { user, logout } = useAuth();
  const { items } = useCart();

  return (
    <header className="navbar">
      <Link to={user ? "/shop" : "/welcome"} className="brand">ShopX</Link>
      <nav>
        {user && <NavLink to="/shop">Home</NavLink>}
        {user && <NavLink to="/cart">Cart ({items.length})</NavLink>}
        {user && <NavLink to="/orders">Orders</NavLink>}
        {user?.role === "ADMIN" && <NavLink to="/admin">Admin</NavLink>}
      </nav>
      <div className="auth-actions">
        {user ? (
          <>
            <span>Hello, {user.name}</span>
            <button onClick={logout}>Logout</button>
          </>
        ) : (
          <>
            <NavLink to="/login">Login</NavLink>
            <NavLink to="/register">Register</NavLink>
          </>
        )}
      </div>
    </header>
  );
};

export default Navbar;
