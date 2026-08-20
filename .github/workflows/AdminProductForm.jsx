import { useEffect, useState } from "react";

import {
  collection,
  addDoc,
  updateDoc,
  doc,
  serverTimestamp
} from "firebase/firestore";

import { db } from "../firebase/firebase";

import productImages from "../data/productImages";


function AdminProductForm({
  productToEdit,
  onProductAdded,
  onProductUpdated,
  onCancel
}) {

  const [formData, setFormData] = useState({
    name: "",
    price: "",
    category: "Coffee",
    image: "",
    description: ""
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);


  // =========================
  // LOAD EDIT PRODUCT
  // =========================

  useEffect(() => {

    if (productToEdit) {

      setFormData({
        name: productToEdit.name || "",
        price: productToEdit.price || "",
        category: productToEdit.category || "Coffee",
        image: productToEdit.image || "",
        description: productToEdit.description || ""
      });

    } else {

      setFormData({
        name: "",
        price: "",
        category: "Coffee",
        image: "",
        description: ""
      });

    }

  }, [productToEdit]);


  // =========================
  // HANDLE INPUT
  // =========================

  const handleChange = (e) => {

    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value
    });

  };


  // =========================
  // SUBMIT
  // =========================

  const handleSubmit = async (e) => {

    e.preventDefault();

    setError("");
    setSuccess("");


    // Validation

    if (
      !formData.name ||
      !formData.price ||
      !formData.image ||
      !formData.description
    ) {

      setError(
        "Please fill in all fields."
      );

      return;
    }


    try {

      setLoading(true);


      const productData = {

        name: formData.name,

        price: Number(formData.price),

        category: formData.category,

        image: formData.image,

        description: formData.description

      };


      // =========================
      // EDIT PRODUCT
      // =========================

      if (productToEdit) {

        await updateDoc(
          doc(
            db,
            "products",
            productToEdit.id
          ),
          {
            ...productData,
            updatedAt: serverTimestamp()
          }
        );


        const updatedProduct = {

          id: productToEdit.id,

          ...productData

        };


        if (onProductUpdated) {

          onProductUpdated(
            updatedProduct
          );

        }


        setSuccess(
          "Product updated successfully! ✅"
        );

      }


      // =========================
      // ADD PRODUCT
      // =========================

      else {

        const docRef =
          await addDoc(
            collection(db, "products"),
            {
              ...productData,
              createdAt: serverTimestamp()
            }
          );


        const newProduct = {

          id: docRef.id,

          ...productData

        };


        if (onProductAdded) {

          onProductAdded(
            newProduct
          );

        }


        setFormData({
          name: "",
          price: "",
          category: "Coffee",
          image: "",
          description: ""
        });


        setSuccess(
          "Product added successfully! ☕"
        );

      }

    } catch (error) {

      console.error(
        "Error saving product:",
        error
      );

      setError(
        "Failed to save product."
      );

    } finally {

      setLoading(false);

    }

  };


  return (

    <div className="product-form">

      <h2>

        {productToEdit
          ? "Edit Product ✏️"
          : "Add New Product ☕"}

      </h2>


      {/* ERROR */}

      {error && (

        <div className="error-message">
          {error}
        </div>

      )}


      {/* SUCCESS */}

      {success && (

        <div className="success-message">
          {success}
        </div>

      )}


      <form onSubmit={handleSubmit}>


        {/* PRODUCT NAME */}

        <div className="form-group">

          <label>
            Product Name
          </label>

          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Example: Cappuccino"
          />

        </div>


        {/* PRICE */}

        <div className="form-group">

          <label>
            Price ($)
          </label>

          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            placeholder="3.00"
            min="0"
            step="0.01"
          />

        </div>


        {/* CATEGORY */}

        <div className="form-group">

          <label>
            Category
          </label>

          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
          >

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


        {/* IMAGE */}

        <div className="form-group">

          <label>
            Product Image
          </label>

          <select
            name="image"
            value={formData.image}
            onChange={handleChange}
          >

            <option value="">
              -- Select Image --
            </option>

            {productImages.map((item) => (

              <option
                key={item.name}
                value={item.image}
              >
                {item.name}
              </option>

            ))}

          </select>

        </div>


        {/* IMAGE PREVIEW */}

        {formData.image && (

          <div className="image-preview">

            <img
              src={formData.image}
              alt="Preview"
            />

          </div>

        )}


        {/* DESCRIPTION */}

        <div className="form-group">

          <label>
            Description
          </label>

          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Describe this product..."
            rows="4"
          />

        </div>


        {/* BUTTONS */}

        <div className="form-actions">

          <button
            type="submit"
            className="admin-add-btn"
            disabled={loading}
          >

            {loading

              ? "Saving..."

              : productToEdit

                ? "💾 Update Product"

                : "➕ Add Product"}

          </button>


          {productToEdit && (

            <button
              type="button"
              className="cancel-btn"
              onClick={onCancel}
            >
              Cancel
            </button>

          )}

        </div>


      </form>

    </div>

  );

}


export default AdminProductForm;