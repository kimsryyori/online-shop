import { useParams, Link } from "react-router-dom";
import { useState } from "react";

import products from "../data/products";
import { useCart } from "../context/CartContext";

function ProductDetails() {

  const { id } = useParams();

  const { addToCart } = useCart();

  const [quantity, setQuantity] = useState(1);

  const product = products.find(
    (item) => item.id === Number(id)
  );

  if (!product) {
    return (
      <div className="not-found">

        <h1>Product Not Found 😢</h1>

        <Link to="/menu" className="btn">
          Back to Menu
        </Link>

      </div>
    );
  }

  const handleAddToCart = () => {

    for (let i = 0; i < quantity; i++) {
      addToCart(product);
    }

  };

  return (
    <div className="product-details">

      <div className="product-details-image">

        <img
          src={product.image}
          alt={product.name}
        />

      </div>

      <div className="product-details-info">

        <p className="product-category">
          {product.category}
        </p>

        <h1>{product.name}</h1>

        <h2>
          ${product.price.toFixed(2)}
        </h2>

        <p className="product-description">
          {product.description}
        </p>

        <div className="quantity">

          <button
            onClick={() =>
              setQuantity(
                quantity > 1
                  ? quantity - 1
                  : 1
              )
            }
          >
            -
          </button>

          <span>{quantity}</span>

          <button
            onClick={() =>
              setQuantity(quantity + 1)
            }
          >
            +
          </button>

        </div>

        <button
          className="add-cart-btn"
          onClick={handleAddToCart}
        >
          Add to Cart 🛒
        </button>

      </div>

    </div>
  );
}

export default ProductDetails;