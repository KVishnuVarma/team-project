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
import Dashboard from "./User/Dashboard"; 
import { Toaster } from "react-hot-toast";
import AdminL from "./Layouts/AdminL";
import UserL from "./Layouts/UserL";
import ProfileUpdate from "./User/profileEdit";

export default function App() {
  return (
    <Router>
      <Toaster />
      <Routes>
        <Route path="/user" element={<UserL />}>
          <Route index element={<Dashboard />} />
          <Route path="profile" element={<Profile />} />
          <Route path="profile/edit/:id" element={<ProfileUpdate />} />
          <Route path="test" element={<Test />} />
          <Route path="practice" element={<Practice />} />
          <Route path="leaderboard" element={<Leader />} />
        </Route>

        <Route path="/admin" element={<AdminL />}>
          <Route index element={<Admin />} />
        </Route>

        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/" element={<Login />} />
      </Routes>
    </Router>
  );
}
