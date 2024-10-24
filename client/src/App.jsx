import React, { useState } from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from './pages/Login';
import Register from './pages/Register';
import Admin from './pages/Admin';
import User from './pages/User'; 
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
          {/* User Layout */}
          <Route path='/user' element={<UserL />}>
            <Route index element={<User userName={userName} />} /> {/* Pass username to User */}
          </Route>

          {/* Admin Layout */}
          <Route path='/admin' element={<AdminL />}>
            <Route index element={<Admin />} />
          </Route>

          {/* Login and Register Pages */}
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register onRegister={handleRegistration} />} /> {/* Pass registration handler */}

          {/* Default Route */}
          <Route path='/' element={<Login />} /> {/* By default, show the login page */}
        </Routes>
      </Router>
    </>
  );
}
