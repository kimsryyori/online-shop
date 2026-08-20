import { useEffect, useState } from "react";

import AdminProductForm from "./AdminProductForm";

import {
  collection,
  getDocs,
  deleteDoc,
  doc
} from "firebase/firestore";

import { db } from "../firebase/firebase";


function AdminProducts() {

  const [products, setProducts] = useState([]);

  const [loading, setLoading] = useState(true);

  const [showForm, setShowForm] = useState(false);

  const [productToEdit, setProductToEdit] =
    useState(null);


  // Load products
  const loadProducts = async () => {

    try {

      const snapshot =
        await getDocs(
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

    } finally {

      setLoading(false);

    }

  };


  useEffect(() => {

    loadProducts();

  }, []);


  // =========================
  // EDIT PRODUCT
  // =========================

  const handleEdit = (product) => {

    setProductToEdit(product);

    setShowForm(true);

  };


  // =========================
  // DELETE PRODUCT
  // =========================

  const handleDelete = async (id) => {

    const confirmDelete =
      window.confirm(
        "Are you sure you want to delete this product?"
      );


    if (!confirmDelete) {
      return;
    }


    try {

      await deleteDoc(
        doc(db, "products", id)
      );


      setProducts(
        products.filter(
          (product) => product.id !== id
        )
      );

    } catch (error) {

      console.error(
        "Error deleting product:",
        error
      );

    }

  };


  // =========================
  // LOADING
  // =========================

  if (loading) {

    return (

      <div className="admin-page">

        <h2>
          Loading products...
        </h2>

      </div>

    );

  }


  return (

    <div className="admin-page">


      {/* HEADER */}

      <div className="admin-page-header">

        <div>

          <h1>
            Product Management ☕
          </h1>

          <p>
            Manage cafe products
          </p>

        </div>


        {/* ADD PRODUCT BUTTON */}

        <button
          className="admin-add-btn"
          onClick={() => {

            setProductToEdit(null);

            setShowForm(!showForm);

          }}
        >

          {showForm
            ? "✖ Close"
            : "➕ Add Product"}

        </button>

      </div>


      {/* PRODUCT FORM */}

      {showForm && (

        <AdminProductForm

          productToEdit={
            productToEdit
          }


          onProductAdded={(product) => {

            setProducts([
              product,
              ...products
            ]);

            setShowForm(false);

          }}


          onProductUpdated={(updatedProduct) => {

            setProducts(

              products.map((product) =>

                product.id ===
                updatedProduct.id

                  ? updatedProduct

                  : product

              )

            );

            setProductToEdit(null);

            setShowForm(false);

          }}


          onCancel={() => {

            setProductToEdit(null);

            setShowForm(false);

          }}

        />

      )}


      {/* PRODUCT LIST */}

      {products.length === 0 ? (

        <div className="empty-admin">

          <h2>
            No products found
          </h2>

          <p>
            Add your first cafe product.
          </p>

        </div>

      ) : (

        <div className="admin-product-list">

          {products.map((product) => (

            <div
              className="admin-product"
              key={product.id}
            >


              {/* IMAGE */}

              <img
                src={product.image}
                alt={product.name}
              />


              {/* INFORMATION */}

              <div className="admin-product-info">

                <h3>
                  {product.name}
                </h3>

                <p>
                  {product.category}
                </p>

                <strong>
                  $
                  {Number(product.price)
                    .toFixed(2)}
                </strong>

              </div>


              {/* ACTIONS */}

              <div className="admin-product-actions">


                {/* EDIT */}

                <button
                  onClick={() =>
                    handleEdit(product)
                  }
                >
                  ✏️ Edit
                </button>


                {/* DELETE */}

                <button
                  onClick={() =>
                    handleDelete(product.id)
                  }
                >
                  🗑️ Delete
                </button>


              </div>

            </div>

          ))}

        </div>

      )}

    </div>

  );

}


export default AdminProducts;