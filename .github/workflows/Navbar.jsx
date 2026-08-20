import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Navbar() {

  const { user } = useAuth();

  return (
    <nav className="navbar">

      <Link to="/" className="logo">
        ☕ Cafe Shop
      </Link>

      <div className="nav-links">

        <Link to="/">
          Home
        </Link>

        <Link to="/menu">
          Menu
        </Link>

        <Link to="/cart">
          🛒 Cart
        </Link>

        {user && (
          <Link to="/orders">
            📦 My Orders
          </Link>
        )}

        {/* Admin Link */}
        {user?.role === "admin" && (

          <Link to="/admin">
            ⚙️ Admin
          </Link>

        )}

      </div>

    </nav>
  );
}

export default Navbar;