import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Menu from "./pages/Menu";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import ProductDetails from "./pages/ProductDetails";
import OrderSuccess from "./pages/OrderSuccess";
import { OrderProvider } from "./context/OrderContext";
import Orders from "./pages/Orders";
import { AuthProvider } from "./context/AuthContext";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { auth, db } from "./firebase/firebase";

import AdminDashboard from "./admin/AdminDashboard";
import AdminProducts from "./admin/AdminProducts";
import AdminOrders from "./admin/AdminOrders";
import AdminUsers from "./admin/AdminUsers";

import AdminRoute  from "./components/AdminRoute";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import { CartProvider } from "./context/CartContext";

function App() {

  return (
    <AuthProvider>
      <OrderProvider>

        <CartProvider>

          <BrowserRouter>

            <Navbar />

            <Routes>

              <Route
                path="/"
                element={<Home />}
              />

              <Route
                path="/menu"
                element={<Menu />}
              />

              <Route
                path="/product/:id"
                element={<ProductDetails />}
              />

              <Route
                path="/cart"
                element={<Cart />}
              />

              <Route
                path="/checkout"
                element={<Checkout />}
              />

              <Route
                path="/order-success"
                element={<OrderSuccess />}
              />

              <Route
                path="/orders"
                element={<Orders />}
              />

              <Route
                path="/login"
                element={<Login />}
              />

              <Route
                path="/register"
                element={<Register />}
              />

              <Route
                path="/admin"
                element={<AdminDashboard />}
              />

              <Route
                path="/admin/products"
                element={<AdminProducts />}
              />

              <Route
                path="/admin/orders"
                element={<AdminOrders />}
              />

              <Route
                path="/admin/users"
                element={<AdminUsers />}
              />

              <Route
                path="/admin"
                element={
                  <AdminRoute>
                    <AdminDashboard />
                  </AdminRoute>
                }
              />

              <Route
                path="/admin/products"
                element={
                  <AdminRoute>
                    <AdminProducts />
                  </AdminRoute>
                }
              />

              <Route
                path="/admin/orders"
                element={
                  <AdminRoute>
                    <AdminOrders />
                  </AdminRoute>
                }
              />

              <Route
                path="/admin/users"
                element={
                  <AdminRoute>
                    <AdminUsers />
                  </AdminRoute>
                }
              />

            </Routes>

            <Footer />

          </BrowserRouter>

        </CartProvider>
      </OrderProvider>
    </AuthProvider>

  );
}

export default App;