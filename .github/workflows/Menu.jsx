import { useEffect, useState } from "react";

import {
  collection,
  getDocs
} from "firebase/firestore";

import { db } from "../firebase/firebase";

import { useCart } from "../context/CartContext";

import productImages from "../data/productImages";


function Menu() {

  // =========================
  // CART
  // =========================

  const { addToCart } = useCart();


  // =========================
  // STATES
  // =========================

  const [products, setProducts] = useState([]);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");

  const [searchTerm, setSearchTerm] = useState("");

  const [selectedCategory, setSelectedCategory] =
    useState("All");


  // =========================
  // LOAD PRODUCTS
  // =========================

  useEffect(() => {

    const loadProducts = async () => {

      try {

        setLoading(true);

        setError("");


        const snapshot = await getDocs(
          collection(db, "products")
        );


        const productList =
          snapshot.docs.map((document) => ({

            id: document.id,

            ...document.data()

          }));


        setProducts(productList);


      } catch (error) {

        console.error(
          "Error loading products:",
          error
        );

        setError(
          "Failed to load products. Please try again."
        );


      } finally {

        setLoading(false);

      }

    };


    loadProducts();

  }, []);


  // =========================
  // SEARCH + CATEGORY FILTER
  // =========================

  const filteredProducts =
    products.filter((product) => {

      // Product name
      const productName =
        product.name || "";


      // Search
      const matchesSearch =
        productName
          .toLowerCase()
          .includes(
            searchTerm.toLowerCase()
          );


      // Category
      const matchesCategory =
        selectedCategory === "All" ||
        product.category === selectedCategory;


      return (
        matchesSearch &&
        matchesCategory
      );

    });


  // =========================
  // ADD TO CART
  // =========================

  const handleAddToCart = (product) => {

    addToCart(product);

  };


  // =========================
  // LOADING
  // =========================

  if (loading) {

    return (

      <div className="menu-page">

        <div className="loading">

          <h2>
            Loading menu... ☕
          </h2>

          <p>
            Please wait...
          </p>

        </div>

      </div>

    );

  }


  // =========================
  // ERROR
  // =========================

  if (error) {

    return (

      <div className="menu-page">

        <div className="error-message">

          <h2>
            Something went wrong 😢
          </h2>

          <p>
            {error}
          </p>

        </div>

      </div>

    );

  }


  // =========================
  // RETURN
  // =========================

  return (

    <div className="menu-page">


      {/* =========================
          HEADER
      ========================= */}

      <div className="menu-header">

        <h1>
          Our Menu ☕
        </h1>

        <p>
          Choose your favorite drinks and food.
        </p>

      </div>


      {/* =========================
          SEARCH + FILTER
      ========================= */}

      <div className="menu-filters">


        {/* SEARCH */}

        <div className="search-box">

          <input
            type="text"
            placeholder="🔍 Search products..."
            value={searchTerm}
            onChange={(e) =>
              setSearchTerm(e.target.value)
            }
          />

        </div>


        {/* CATEGORY */}

        <div className="category-box">

          <select
            value={selectedCategory}
            onChange={(e) =>
              setSelectedCategory(
                e.target.value
              )
            }
          >

            <option value="All">
              All Categories
            </option>

            <option value="Coffee">
              ☕ Coffee
            </option>

            <option value="Tea">
              🍵 Tea
            </option>

            <option value="Cake">
              🍰 Cake
            </option>

            <option value="Dessert">
              🧁 Dessert
            </option>

            <option value="Juice">
              🧃 Juice
            </option>

          </select>

        </div>

      </div>


      {/* =========================
          RESULT COUNT
      ========================= */}

      <div className="product-count">

        <p>

          Showing{" "}

          <strong>
            {filteredProducts.length}
          </strong>

          {" "}products

        </p>

      </div>


      {/* =========================
          NO PRODUCTS
      ========================= */}

      {filteredProducts.length === 0 ? (

        <div className="empty-products">

          <h2>
            No products found 😢
          </h2>

          <p>
            Try another search or category.
          </p>


          <button
            onClick={() => {

              setSearchTerm("");

              setSelectedCategory("All");

            }}
          >
            🔄 Reset Filter
          </button>

        </div>

      ) : (


        /* =========================
           PRODUCT GRID
        ========================= */

        <div className="product-grid">


          {filteredProducts.map((product) => {


            // =========================
            // PRODUCT IMAGE
            // =========================

            const image =
              productImages[product.name];


            return (

              <div
                className="product-card"
                key={product.id}
              >


                {/* IMAGE */}

                <div className="product-image">

                  {image ? (

                    <img
                      src={image}
                      alt={product.name}
                    />

                  ) : (

                    <div className="no-image">

                      ☕

                      <p>
                        No Image
                      </p>

                    </div>

                  )}

                </div>


                {/* PRODUCT INFO */}

                <div className="product-info">


                  {/* CATEGORY */}

                  <span className="product-category">

                    {product.category}

                  </span>


                  {/* NAME */}

                  <h3>
                    {product.name}
                  </h3>


                  {/* DESCRIPTION */}

                  <p className="product-description">

                    {product.description}

                  </p>


                  {/* BOTTOM */}

                  <div className="product-bottom">


                    {/* PRICE */}

                    <strong className="product-price">

                      $

                      {Number(
                        product.price || 0
                      ).toFixed(2)}

                    </strong>


                    {/* ADD TO CART */}

                    <button
                      className="add-to-cart-btn"
                      onClick={() =>
                        handleAddToCart(
                          product
                        )
                      }
                    >

                      🛒 Add to Cart

                    </button>


                  </div>

                </div>

              </div>

            );

          })}

        </div>

      )}

    </div>

  );

}


export default Menu;