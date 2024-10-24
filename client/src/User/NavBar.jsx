import React from "react";
import { Link } from "react-router-dom"; // Ensure this import is present
import { IoHomeOutline } from "react-icons/io5"; // Example icon import
import { PiStudent } from "react-icons/pi";
import { IoIosLogOut } from "react-icons/io";

const Navbar = () => {
  return (
    <nav className="user-navbar">
      <ul>
        <li>
          <Link to="/user/profile">
            <div className="nav-item">
              <IoHomeOutline className="nav-icon" />
              <span className="nav-text">Profile</span>
            </div>
          </Link>
        </li>
        <li>
          <Link to="/user/practice">
            <div className="nav-item">
              <PiStudent className="nav-icon" />
              <span className="nav-text">Practice</span>
            </div>
          </Link>
        </li>
        <li>
          <Link to="/user/test">
            <div className="nav-item">
              <span className="nav-text">Test</span>
            </div>
          </Link>
        </li>
        <li>
          <Link to="/user/leaderboard">
            <div className="nav-item">
              <span className="nav-text">Leaderboard</span>
            </div>
          </Link>
        </li>
        <li>
          <Link to="/user/mode">
            <div className="nav-item">
              <span className="nav-text">Mode</span>
            </div>
          </Link>
        </li>
        <li>
          <Link to="/logout">
            <div className="nav-item">
              <IoIosLogOut className="nav-icon" />
              <span className="nav-text">Logout</span>
            </div>
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
