import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom"; 
import { post } from "../services/Api";
import { toast } from "react-hot-toast";
import { useDispatch } from "react-redux";
import { SetUser } from "../redux/AuthSlice";

export default function Login() {
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const navigate = useNavigate();
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {  
    e.preventDefault();
    console.log(email, password);
    try {
      const request = await post('/api/auth/login', { email, password });  // Now you can await
      const response = request.data;

      if (request.status === 200) {
        // Check for user roles and redirect accordingly
        if (response.user.role === 'admin') {
          navigate('/admin');  // Redirect to admin page
        } else if (response.user.role === 'user') {
          navigate('/user');  // Redirect to user page
        }
        toast.success(response.message);  // Display success message
        dispatch(SetUser(response.user));  // Store user data in Redux state
      }
      console.log(response);
    } catch (error) {
      console.log(error);
      toast.error("Login failed. Please check your credentials.");
    }
  };

  return (
    <>
      <div className="login-container">
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label htmlFor="Email">Email</label>
            <input 
              type="email" 
              id="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="input-group">
            <label htmlFor="password">Password</label>
            <input 
              type="password" 
              id="password"
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              required
            />
          </div>
          <button type="submit">Login</button>
          <p className="register-link">
            Not registered? <Link to="/register">Register here</Link>
          </p>
        </form>
      </div>
    </>
  );
}
