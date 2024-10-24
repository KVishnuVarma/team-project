import React, { useState } from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from './pages/Login';
import Register from './pages/Register';
import Admin from './pages/Admin';
import User from './pages/User';
import Profile from './User/Profile'; // Import Profile
import Test from './User/Test'; // Import Test
import Practice from './User/Practice'; // Import Practice
import Leader from './User/Leader'; // Import Leader
import { Toaster } from 'react-hot-toast';
import AdminL from './Layouts/AdminL';
import UserL from './Layouts/UserL';

export default function App() {
  const [userName, setUserName] = useState('');  // State to hold the username

  const handleRegistration = (username) => {
    setUserName(username);  // Update the username state upon registration
  };

  return (
    <>
      <Router>
        <Toaster />
        <Routes>
          {/* User Layout with nested routes */}
          <Route path='/user' element={<UserL />}>
            <Route index element={<User userName={userName} />} />
            <Route path="profile" element={<Profile />} /> {/* Nested Profile route */}
            <Route path="test" element={<Test />} /> {/* Nested Test route */}
            <Route path="practice" element={<Practice />} /> {/* Nested Practice route */}
            <Route path="leaderboard" element={<Leader />} /> {/* Nested Leaderboard route */}
          </Route>

          {/* Admin Layout */}
          <Route path='/admin' element={<AdminL />}>
            <Route index element={<Admin />} />
          </Route>

          {/* Login and Register Pages */}
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register onRegister={handleRegistration} />} />

          {/* Default Route */}
          <Route path='/' element={<Login />} /> {/* Default to login */}
        </Routes>
      </Router>
    </>
  );
}
