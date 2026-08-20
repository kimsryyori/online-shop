import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";

function ProductCard({ product }) {

  const { addToCart } = useCart();

  return (
    <div className="product-card">

      <Link
        to={`/product/${product.id}`}
        className="product-image-link"
      >

        <img
          src={product.image}
          alt={product.name}
        />

      </Link>

      <div className="product-info">

        <h3>{product.name}</h3>

        <p className="category">
          {product.category}
        </p>

        <p>
          {product.description}
        </p>

        <h4>
          ${product.price.toFixed(2)}
        </h4>

        <div className="product-actions">

          <Link
            to={`/product/${product.id}`}
            className="view-btn"
          >
            View Details
          </Link>

          <button
            onClick={() => addToCart(product)}
          >
            Add to Cart 🛒
          </button>

        </div>

      </div>

    </div>
  );
}

export default ProductCard;