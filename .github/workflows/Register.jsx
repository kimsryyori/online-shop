import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Register() {

  const { register } = useAuth();

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: ""
  });

  const [error, setError] = useState("");


  // Handle input changes
  const handleChange = (e) => {

    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value
    });

  };


  // Handle Register
  const handleSubmit = async (e) => {

    e.preventDefault();

    setError("");


    // 1. Check empty fields
    if (
      !formData.name ||
      !formData.email ||
      !formData.password ||
      !formData.confirmPassword
    ) {

      setError(
        "Please fill in all fields."
      );

      return;
    }


    // 2. Check password
    if (
      formData.password !==
      formData.confirmPassword
    ) {

      setError(
        "Passwords do not match."
      );

      return;
    }


    // 3. Check password length
    if (formData.password.length < 6) {

      setError(
        "Password must be at least 6 characters."
      );

      return;
    }


    // 4. Register with Firebase
    try {

      const result = await register(
        formData.name,
        formData.email,
        formData.password
      );


      // 5. Check result
      if (!result.success) {

        setError(result.message);

        return;
      }


      // 6. Register success
      navigate("/");


    } catch (error) {

      console.error(
        "Registration error:",
        error
      );

      setError(
        "Something went wrong. Please try again."
      );

    }

  };


  return (

    <div className="auth-page">

      <div className="auth-card">

        <h1>
          Create Account ☕
        </h1>

        <p>
          Join our cafe today!
        </p>


        {/* Error Message */}

        {error && (

          <div className="error-message">
            {error}
          </div>

        )}


        <form onSubmit={handleSubmit}>


          {/* Full Name */}

          <div className="form-group">

            <label>
              Full Name
            </label>

            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter your name"
            />

          </div>


          {/* Email */}

          <div className="form-group">

            <label>
              Email
            </label>

            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
            />

          </div>


          {/* Password */}

          <div className="form-group">

            <label>
              Password
            </label>

            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter password"
            />

          </div>


          {/* Confirm Password */}

          <div className="form-group">

            <label>
              Confirm Password
            </label>

            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="Confirm password"
            />

          </div>


          {/* Register Button */}

          <button
            type="submit"
            className="auth-btn"
          >
            Register
          </button>


        </form>


        {/* Login Link */}

        <p className="auth-link">

          Already have an account?

          <Link to="/login">
            Login
          </Link>

        </p>


      </div>

    </div>

  );
}

export default Register;