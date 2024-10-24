import React, { useState } from "react";
import { Link } from "react-router-dom";
import { post } from "../services/Api";
import { toast } from "react-hot-toast";

export default function Register({ onRegister }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false); // Loading state

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic validation
    if (!name || !email || !password) {
      toast.error("All fields are required!");
      return;
    }

    // Email format validation (basic)
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast.error("Please enter a valid email address!");
      return;
    }

    setLoading(true); // Set loading to true

    try {
      const request = await post('/api/auth/register', { name, email, password });
      const response = request.data;

      if (request.status === 200) {
        toast.success(response.message);
        onRegister(name); // Call onRegister to update the username
      }
      console.log(response);
    } catch (error) {
      console.log(error);
      const errorMessage = error.response?.data?.message || "Registration failed!"; // Get specific error message from response
      toast.error(errorMessage); // Show error message on failure
    } finally {
      setLoading(false); // Reset loading state
    }
  };

  return (
    <div className="register-container">
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <div className="input-group">
          <label htmlFor="username">UserName</label>
          <input
            type="text"
            onChange={(e) => setName(e.target.value)}
            id="username"
            required // Ensure username is required
          />
        </div>
        <div>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            onChange={(e) => setEmail(e.target.value)}
            id="email"
            required // Ensure email is required
          />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            id="password"
            required // Ensure password is required
          />
        </div>
        <button type="submit" disabled={loading}> {/* Disable button if loading */}
          {loading ? "Registering..." : "Register"}
        </button>
        <p className="register-link">
          Already have an Account? <Link to={"/login"}>Login here</Link>
        </p>
      </form>
    </div>
  );
}
