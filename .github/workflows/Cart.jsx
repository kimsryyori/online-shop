import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";

function Cart() {

  const {
    cart,
    increaseQuantity,
    decreaseQuantity,
    removeFromCart
  } = useCart();

  // Calculate total price
  const totalPrice = cart.reduce(
    (total, item) =>
      total + item.price * item.quantity,
    0
  );

  return (
    <div className="cart-page">

      <h1>Shopping Cart 🛒</h1>

      {cart.length === 0 ? (

        // Empty Cart
        <div className="empty-cart">

          <h2>Your cart is empty</h2>

          <p>
            Add some delicious products!
          </p>

          <Link to="/menu" className="btn">
            Go to Menu
          </Link>

        </div>

      ) : (

        // Cart has products
        <div className="cart-container">

          {cart.map((item) => (

            <div
              className="cart-item"
              key={item.id}
            >

              <img
                src={item.image}
                alt={item.name}
              />

              <div className="cart-item-info">

                <h3>{item.name}</h3>

                <p>
                  Price: ${item.price.toFixed(2)}
                </p>

                {/* Quantity Controls */}
                <div className="quantity">

                  <button
                    onClick={() =>
                      decreaseQuantity(item.id)
                    }
                  >
                    -
                  </button>

                  <span>
                    {item.quantity}
                  </span>

                  <button
                    onClick={() =>
                      increaseQuantity(item.id)
                    }
                  >
                    +
                  </button>

                </div>

                {/* Remove Button */}
                <button
                  onClick={() =>
                    removeFromCart(item.id)
                  }
                >
                  Remove 🗑️
                </button>

              </div>

            </div>

          ))}

          {/* Cart Total */}
          <div className="cart-total">

            <h2>
              Total: ${totalPrice.toFixed(2)}
            </h2>

            <Link
              to="/checkout"
              className="btn"
            >
              Checkout 💳
            </Link>

          </div>

        </div>

      )}

    </div>
  );
}

export default Cart;