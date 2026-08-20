import { Link } from "react-router-dom";
import { useOrders } from "../context/OrderContext";

function Orders() {

  const { orders } = useOrders();

  return (
    <div className="orders-page">

      <h1>My Orders 📦</h1>

      {orders.length === 0 ? (

        <div className="empty-orders">

          <h2>No orders yet</h2>

          <p>
            You haven't placed any orders.
          </p>

          <Link
            to="/menu"
            className="btn"
          >
            Order Now ☕
          </Link>

        </div>

      ) : (

        <div className="orders-container">

          {orders
            .slice()
            .reverse()
            .map((order) => (

              <div
                className="order-card"
                key={order.id}
              >

                <div className="order-header">

                  <div>

                    <h3>
                      Order #{order.id}
                    </h3>

                    <p>
                      {order.date}
                    </p>

                  </div>

                  <span
                    className={`order-status ${order.status.toLowerCase()}`}
                  >
                    {order.status}
                  </span>

                </div>

                <hr />

                <div className="order-items">

                  {order.items.map((item) => (

                    <div
                      className="order-item"
                      key={item.id}
                    >

                      <img
                        src={item.image}
                        alt={item.name}
                      />

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

                </div>

                <div className="order-footer">

                  <strong>
                    Total: $
                    {order.total.toFixed(2)}
                  </strong>

                  <span>
                    Payment: {order.payment}
                  </span>

                </div>

              </div>

            ))}

        </div>

      )}

    </div>
  );
}

export default Orders;