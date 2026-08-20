import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { useCart } from "../context/CartContext";
import { useOrders } from "../context/OrderContext";
import { useAuth } from "../context/AuthContext";


function Checkout() {

  const {
    cart,
    clearCart
  } = useCart();

  const {
    addOrder
  } = useOrders();

  const {
    user
  } = useAuth();

  const navigate = useNavigate();


  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    address: "",
    payment: "Cash on Delivery"
  });


  const [error, setError] = useState("");


  // Calculate total price
  const totalPrice = cart.reduce(
    (total, item) =>
      total + item.price * item.quantity,
    0
  );


  // Handle input changes
  const handleChange = (e) => {

    const {
      name,
      value
    } = e.target;

    setFormData({
      ...formData,
      [name]: value
    });

  };


  // Place order
  const handleSubmit = async (e) => {

    e.preventDefault();

    setError("");


    // Validate form
    if (
      !formData.name ||
      !formData.phone ||
      !formData.address
    ) {

      setError(
        "Please fill in all required fields."
      );

      return;
    }


    // Check login
    if (!user) {

      setError(
        "Please login before placing an order."
      );

      return;
    }


    // Create order
    const order = {

      customer: {

        name: formData.name,

        phone: formData.phone,

        address: formData.address

      },

      payment: formData.payment,

      items: cart,

      total: totalPrice

    };


    try {

      // Save order to Firestore
      await addOrder(order);


      // Clear cart
      clearCart();


      // Go to success page
      navigate("/order-success");


    } catch (error) {

      console.error(
        "Error placing order:",
        error
      );

      setError(
        "Failed to place order. Please try again."
      );

    }

  };


  // Cart is empty
  if (cart.length === 0) {

    return (

      <div className="empty-cart">

        <h1>
          Your cart is empty 🛒
        </h1>

        <p>
          Please add products before checkout.
        </p>

        <Link
          to="/menu"
          className="btn"
        >
          Go to Menu
        </Link>

      </div>

    );

  }


  // User is not logged in
  if (!user) {

    return (

      <div className="empty-cart">

        <h1>
          Please Login First 🔐
        </h1>

        <p>
          You need to login before checkout.
        </p>

        <Link
          to="/login"
          className="btn"
        >
          Login
        </Link>

      </div>

    );

  }


  return (

    <div className="checkout-page">

      <h1>
        Checkout 💳
      </h1>


      <div className="checkout-container">


        {/* =========================
            CUSTOMER INFORMATION
        ========================== */}

        <div className="checkout-form">

          <h2>
            Customer Information
          </h2>


          {error && (

            <p className="error-message">
              {error}
            </p>

          )}


          <form onSubmit={handleSubmit}>


            {/* Name */}

            <div className="form-group">

              <label>
                Full Name *
              </label>

              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter your name"
              />

            </div>


            {/* Phone */}

            <div className="form-group">

              <label>
                Phone Number *
              </label>

              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Enter phone number"
              />

            </div>


            {/* Address */}

            <div className="form-group">

              <label>
                Address *
              </label>

              <textarea
                name="address"
                value={formData.address}
                onChange={handleChange}
                placeholder="Enter delivery address"
                rows="4"
              />

            </div>


            {/* Payment */}

            <div className="form-group">

              <label>
                Payment Method
              </label>

              <select
                name="payment"
                value={formData.payment}
                onChange={handleChange}
              >

                <option value="Cash on Delivery">
                  Cash on Delivery
                </option>

                <option value="Credit Card">
                  Credit Card
                </option>

                <option value="ABA Pay">
                  ABA Pay
                </option>

              </select>

            </div>


            {/* Place Order */}

            <button
              type="submit"
              className="place-order-btn"
            >
              Place Order 🛍️
            </button>


          </form>

        </div>


        {/* =========================
            ORDER SUMMARY
        ========================== */}

        <div className="order-summary">

          <h2>
            Order Summary
          </h2>


          {cart.map((item) => (

            <div
              className="summary-item"
              key={item.id}
            >

              <div>

                <h4>
                  {item.name}
                </h4>

                <p>
                  {item.quantity} × $
                  {item.price.toFixed(2)}
                </p>

              </div>


              <strong>

                $
                {(
                  item.price *
                  item.quantity
                ).toFixed(2)}

              </strong>

            </div>

          ))}


          <hr />


          <div className="summary-total">

            <span>
              Total
            </span>

            <strong>
              ${totalPrice.toFixed(2)}
            </strong>

          </div>


        </div>


      </div>

    </div>

  );

}


export default Checkout;