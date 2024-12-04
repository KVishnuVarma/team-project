import React from 'react';
import { FaFileUpload } from "react-icons/fa";
import { PiStudent } from "react-icons/pi";
import { IoIosLogOut } from "react-icons/io";
import { MdLeaderboard } from "react-icons/md";
import { Link, Outlet, useNavigate } from 'react-router-dom';
import '../pages/User.css';

const UserL = () => {
  const navigate = useNavigate();

  // Handle Logout
  const handleLogout = () => {
    // Clear user session (e.g., localStorage, sessionStorage, or cookies)
    localStorage.removeItem("userToken"); // Adjust the key based on your app's logic
    sessionStorage.clear();
    navigate('/'); // Redirect to the login or home page
  };

  return (
    <div className="container light-mode">
      <div className="sidebar">
        <ul>
          <li className="sidebar-item">
            <Link to="/user/profile">
              <img src="/logo.jpeg" className="icon" alt="Free Code Logo" />
              <div className="label">Free Code</div>
            </Link>
          </li>

          <li className="sidebar-item">
            <Link to="/user/profile">
              <PiStudent className='icon' />
              <div className="label">Profile</div>
            </Link>
          </li>

          <li className="sidebar-item">
            <Link to="/user/test">
              <FaFileUpload className='icon' />
              <div className="label">Test</div>
            </Link>
          </li>

          <li className="sidebar-item">
            <Link to="/user/practice">
              <PiStudent className='icon' />
              <div className="label">Practice</div>
            </Link>
          </li>

          <li className="sidebar-item">
            <Link to="/user/leaderboard">
              <MdLeaderboard className='icon' />
              <div className="label">Leaderboard</div>
            </Link>
          </li>

          <li className="sidebar-item" onClick={handleLogout}>
            <IoIosLogOut className='icon' />
            <div className="label">Logout</div>
          </li>
        </ul>
      </div>

      <div className="content">
        <Outlet />
      </div>
    </div>
  );
};

export default UserL;
