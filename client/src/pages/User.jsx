import React, { useState } from 'react';
import { FaFileUpload } from "react-icons/fa";
import { PiStudent } from "react-icons/pi";
import { IoIosLogOut } from "react-icons/io";
import { MdLeaderboard, MdOutlineDarkMode, MdOutlineLightMode } from "react-icons/md";
import { Link, Outlet } from 'react-router-dom'; // Use Link for navigation and Outlet for nested routes
import './User.css';

const User = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleMode = () => {
    setIsDarkMode((prevMode) => !prevMode);
  };

  return (
    <div className={`container ${isDarkMode ? "dark-mode" : "light-mode"}`}>
      <div className="sidebar">
        <ul>
          <li className="sidebar-item">
            <img src="/logo.png" className="icon" alt="Free Code Logo" />
            <h2 className="label">Free Code</h2>
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
          <li className="sidebar-item" onClick={toggleMode}>
            {isDarkMode ? <MdOutlineLightMode className='icon' /> : <MdOutlineDarkMode className='icon' />}
            <div className="label">{isDarkMode ? "Light Mode" : "Dark Mode"}</div>
          </li>
          <li className="sidebar-item">
            <IoIosLogOut className='icon' />
            <div className="label">Logout</div>
          </li>
        </ul>
      </div>

      <div className="content">
        {/* This Outlet will display the nested routes */}
        <Outlet />
      </div>
    </div>
  );
};

export default User;
