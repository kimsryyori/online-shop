import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Login() {

  const { login } = useAuth();

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {

    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value
    });

  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    setError("");

    if (
      !formData.email ||
      !formData.password
    ) {

      setError(
        "Please enter email and password."
      );

      return;
    }

    const result = await login(
        formData.email,
        formData.password
    );

    if (!result.success) {

      setError(result.message);

      return;
    }

    navigate("/");

  };

  return (
    <div className="auth-page">

      <div className="auth-card">

        <h1>
          Welcome Back ☕
        </h1>

        <p>
          Login to your cafe account.
        </p>

        {error && (
          <div className="error-message">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>

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

          <div className="form-group">

            <label>
              Password
            </label>

            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your password"
            />

          </div>

          <button
            type="submit"
            className="auth-btn"
          >
            Login
          </button>

        </form>

        <p className="auth-link">

          Don't have an account?

          <Link to="/register">
            Register
          </Link>

        </p>

      </div>

    </div>
  );
}

export default Login;