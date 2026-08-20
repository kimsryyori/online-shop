import { useEffect, useState } from "react";

import {
  collection,
  getDocs,
  updateDoc,
  doc
} from "firebase/firestore";

import { db } from "../firebase/firebase";


function AdminOrders() {

  const [orders, setOrders] = useState([]);

  const [loading, setLoading] = useState(true);


  // Load orders
  const loadOrders = async () => {

    try {

      const snapshot =
        await getDocs(
          collection(db, "orders")
        );


      const orderList =
        snapshot.docs.map((document) => ({

          id: document.id,

          ...document.data()

        }));


      setOrders(orderList);

    } catch (error) {

      console.error(
        "Error loading orders:",
        error
      );

    } finally {

      setLoading(false);

    }

  };


  useEffect(() => {

    loadOrders();

  }, []);


  // Change order status
  const changeStatus = async (
    orderId,
    newStatus
  ) => {

    try {

      await updateDoc(
        doc(db, "orders", orderId),
        {
          status: newStatus
        }
      );


      setOrders(
        orders.map((order) =>
          order.id === orderId
            ? {
                ...order,
                status: newStatus
              }
            : order
        )
      );

    } catch (error) {

      console.error(
        "Error updating order:",
        error
      );

    }

  };


  if (loading) {

    return (
      <div className="admin-page">

        <h2>
          Loading orders...
        </h2>

      </div>
    );

  }


  return (

    <div className="admin-page">

      <h1>
        Order Management 📦
      </h1>

      <p>
        Manage customer orders
      </p>


      {orders.length === 0 ? (

        <div className="empty-admin">

          <h2>
            No orders found
          </h2>

        </div>

      ) : (

        <div className="admin-orders">

          {orders.map((order) => (

            <div
              className="admin-order"
              key={order.id}
            >

              <div>

                <h3>
                  Order #{order.id}
                </h3>

                <p>
                  Customer:{" "}
                  {order.customer?.name}
                </p>

                <p>
                  Phone:{" "}
                  {order.customer?.phone}
                </p>

                <p>
                  Address:{" "}
                  {order.customer?.address}
                </p>

              </div>


              <div>

                <h3>
                  ${Number(order.total).toFixed(2)}
                </h3>

                <p>
                  Payment: {order.payment}
                </p>

              </div>


              <div className="order-status">

                <label>
                  Status
                </label>

                <select
                  value={
                    order.status || "Pending"
                  }
                  onChange={(e) =>
                    changeStatus(
                      order.id,
                      e.target.value
                    )
                  }
                >

                  <option value="Pending">
                    Pending
                  </option>

                  <option value="Preparing">
                    Preparing
                  </option>

                  <option value="Ready">
                    Ready
                  </option>

                  <option value="Completed">
                    Completed
                  </option>

                  <option value="Cancelled">
                    Cancelled
                  </option>

                </select>

              </div>

            </div>

          ))}

        </div>

      )}

    </div>

  );

}

export default AdminOrders;