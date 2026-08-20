import { Link } from "react-router-dom";

function OrderSuccess() {

  return (
    <div className="order-success">

      <div className="success-card">

        <div className="success-icon">
          ✅
        </div>

        <h1>
          Order Successful!
        </h1>

        <p>
          Thank you for ordering from our cafe.
        </p>

        <p>
          Your order has been received successfully.
        </p>

        <div className="success-buttons">

          <Link
            to="/menu"
            className="btn"
          >
            Continue Shopping ☕
          </Link>

          <Link
            to="/"
            className="btn secondary"
          >
            Back to Home 🏠
          </Link>

        </div>

      </div>

    </div>
  );
}

export default OrderSuccess;