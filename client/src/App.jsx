import React from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";

// Pages
import Login from "./pages/Login";
import Register from "./pages/Register";
import Admin from "./pages/Admin";

// User Pages
import Profile from "./User/Profile";
import Test from "./User/Test";
import Practice from "./User/Practice";
import Leader from "./User/Leader";
import Dashboard from "./User/Dashboard";
import ProfileUpdate from "./User/ProfileEdit";
import EditorComponent from "./User/Compiler";
import ContestList from "./User/ContestList";
import TestDetail from "./Test/TestDetail";
import CompetitionQuestions from "./Test/CompetitionQuestions";
import QuestionsPage from "./User/Questionpage"; // Correct import path
import ProfileStats from "./User/ProfileStats";

// Layouts
import AdminL from "./Layouts/AdminL";
import UserL from "./Layouts/UserL";

export default function App() {
  return (
    <Router>
      <Toaster /> {/* Notification toaster for toast messages */}
      <Routes>
        {/* User Routes */}
        <Route path="/user" element={<UserL />}>
          <Route index element={<Dashboard />} />
          <Route path="profile" element={<Profile />} />
          <Route path="profile/edit/:id" element={<ProfileUpdate />} />
          <Route path="test" element={<Test />} />
          <Route path="practice" element={<Practice />} />
          <Route path="practice/editor/:id" element={<EditorComponent />} />
          <Route path="leaderboard" element={<Leader />} />
          <Route path="tests/:id" element={<TestDetail />} />
          <Route path="profileStats/:id" element={<ProfileStats />} />
          
          {/* Contest-related routes */}
          <Route path="contests" element={<ContestList />} />
          <Route path="contests/:contestId/questions" element={<QuestionsPage />} />
          
          {/* Optional: If you're using competition-specific questions */}
          <Route path="competition/:contestId/questions" element={<CompetitionQuestions />} />
        </Route>

        {/* Admin Routes */}
        <Route path="/admin" element={<AdminL />}>
          <Route index element={<Admin />} />
        </Route>

        {/* Authentication Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Default and Fallback Routes */}
        <Route path="/" element={<Navigate to="/login" />} /> {/* Redirect to login by default */}
        <Route path="*" element={<h2 style={{ textAlign: "center" }}>404 - Page Not Found</h2>} />
      </Routes>
    </Router>
  );
}
