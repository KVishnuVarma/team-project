import React from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Admin from "./pages/Admin";
import Profile from "./User/Profile";
import Test from "./User/Test";
import Practice from "./User/Practice";
import Leader from "./User/Leader";
import Dashboard from "./User/Dashboard"; // Import Dashboard component
import { Toaster } from "react-hot-toast";
import AdminL from "./Layouts/AdminL";
import UserL from "./Layouts/UserL"; // Import UserL layout

export default function App() {
  return (
    <Router>
      <Toaster />
      <Routes>
        {/* User Layout with nested routes */}
        <Route path="/user" element={<UserL />}>
          {" "}
          {/* User layout */}
          <Route index element={<Dashboard />} />{" "}
          {/* Default route is Dashboard */}
          <Route path="profile" element={<Profile />} />
          <Route path="test" element={<Test />} />
          <Route path="practice" element={<Practice />} />
          <Route path="leaderboard" element={<Leader />} />
        </Route>

        {/* Admin Layout */}
        <Route path="/admin" element={<AdminL />}>
          {" "}
          {/* Admin layout */}
          <Route index element={<Admin />} /> {/* Default admin route */}
        </Route>

        {/* Login and Register Pages */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Default Route */}
        <Route path="/" element={<Login />} />
      </Routes>
    </Router>
  );
}
