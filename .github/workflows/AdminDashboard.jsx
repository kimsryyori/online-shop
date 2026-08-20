import { useEffect, useState } from "react";

import {
  collection,
  getDocs
} from "firebase/firestore";

import { db } from "../firebase/firebase";

import { Link } from "react-router-dom";


function AdminDashboard() {

  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [users, setUsers] = useState([]);

  const [loading, setLoading] = useState(true);


  // =========================
  // LOAD DASHBOARD DATA
  // =========================

  useEffect(() => {

    const loadDashboard = async () => {

      try {

        // Products
        const productSnapshot =
          await getDocs(
            collection(db, "products")
          );

        setProducts(
          productSnapshot.docs.map(
            (document) => ({
              id: document.id,
              ...document.data()
            })
          )
        );


        // Orders
        const orderSnapshot =
          await getDocs(
            collection(db, "orders")
          );

        setOrders(
          orderSnapshot.docs.map(
            (document) => ({
              id: document.id,
              ...document.data()
            })
          )
        );


        // Users
        const userSnapshot =
          await getDocs(
            collection(db, "users")
          );

        setUsers(
          userSnapshot.docs.map(
            (document) => ({
              id: document.id,
              ...document.data()
            })
          )
        );


      } catch (error) {

        console.error(
          "Error loading dashboard:",
          error
        );

      } finally {

        setLoading(false);

      }

    };


    loadDashboard();

  }, []);


  // =========================
  // CALCULATE TOTAL SALES
  // =========================

  const totalSales =
    orders.reduce(
      (total, order) =>
        total + Number(order.total || 0),
      0
    );


  // =========================
  // LOADING
  // =========================

  if (loading) {

    return (

      <div className="admin-page">

        <h2>
          Loading Admin Dashboard... ☕
        </h2>

      </div>

    );

  }


  return (

    <div className="admin-page">


      {/* =========================
          HEADER
      ========================= */}

      <div className="admin-page-header">

        <div>

          <h1>
            Admin Dashboard ⚙️
          </h1>

          <p>
            Manage your Cafe Shop system
          </p>

        </div>

      </div>


      {/* =========================
          STATISTICS
      ========================= */}

      <div className="admin-stats">


        {/* PRODUCTS */}

        <div className="admin-stat-card">

          <div className="stat-icon">
            ☕
          </div>

          <div>

            <h3>
              Products
            </h3>

            <strong>
              {products.length}
            </strong>

          </div>

        </div>


        {/* ORDERS */}

        <div className="admin-stat-card">

          <div className="stat-icon">
            🛍️
          </div>

          <div>

            <h3>
              Orders
            </h3>

            <strong>
              {orders.length}
            </strong>

          </div>

        </div>


        {/* USERS */}

        <div className="admin-stat-card">

          <div className="stat-icon">
            👥
          </div>

          <div>

            <h3>
              Users
            </h3>

            <strong>
              {users.length}
            </strong>

          </div>

        </div>


        {/* SALES */}

        <div className="admin-stat-card">

          <div className="stat-icon">
            💰
          </div>

          <div>

            <h3>
              Total Sales
            </h3>

            <strong>
              ${totalSales.toFixed(2)}
            </strong>

          </div>

        </div>

      </div>


      {/* =========================
          QUICK ACTIONS
      ========================= */}

      <div className="admin-section">

        <h2>
          Quick Actions
        </h2>


        <div className="admin-actions">


          <Link
            to="/admin/products"
            className="admin-action-card"
          >

            <span>
              ☕
            </span>

            <h3>
              Manage Products
            </h3>

            <p>
              Add, edit and delete products
            </p>

          </Link>


          <Link
            to="/admin/orders"
            className="admin-action-card"
          >

            <span>
              🛍️
            </span>

            <h3>
              Manage Orders
            </h3>

            <p>
              View and manage customer orders
            </p>

          </Link>


          <Link
            to="/admin/users"
            className="admin-action-card"
          >

            <span>
              👥
            </span>

            <h3>
              Manage Users
            </h3>

            <p>
              View registered customers
            </p>

          </Link>

        </div>

      </div>


      {/* =========================
          RECENT ORDERS
      ========================= */}

      <div className="admin-section">

        <div className="section-header">

          <h2>
            Recent Orders
          </h2>

          <Link to="/admin/orders">
            View All →
          </Link>

        </div>


        {orders.length === 0 ? (

          <div className="empty-admin">

            <h3>
              No orders yet
            </h3>

            <p>
              Customer orders will appear here.
            </p>

          </div>

        ) : (

          <div className="admin-order-list">

            {orders
              .slice(0, 5)
              .map((order) => (

                <div
                  className="admin-order-card"
                  key={order.id}
                >

                  <div>

                    <strong>
                      Order #{order.id.slice(0, 6)}
                    </strong>

                    <p>
                      {order.name || "Customer"}
                    </p>

                  </div>


                  <div>

                    <strong>
                      $
                      {Number(
                        order.total || 0
                      ).toFixed(2)}
                    </strong>

                  </div>

                </div>

              ))}

          </div>

        )}

      </div>

    </div>

  );

}


export default AdminDashboard;