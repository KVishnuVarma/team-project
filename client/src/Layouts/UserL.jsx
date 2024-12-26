import React from 'react';
import { FaFileUpload } from "react-icons/fa";
import { PiStudent } from "react-icons/pi";
import { IoIosLogOut } from "react-icons/io";
import { MdLeaderboard } from "react-icons/md";
import { Link, Outlet, useNavigate } from 'react-router-dom';
import '../pages/User.css';

const UserL = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("userToken");
    sessionStorage.clear();
    navigate('/');
  };

  return (
    <div className="container light-mode">
      <div className="sidebar">
        <ul>
          <li className="sidebar-item">
            <div className='label-l'>
              <img src="/logo.png" className="icon-i" alt="Free Code Logo" />
              <div className="label">Free Code</div>
            </div>
          </li>

          <li className="sidebar-item">
            <Link to="/user/profile">
              <div className='label-l'>
                <PiStudent className='icon-l' />
                <div className="label">Profile</div>
              </div>
            </Link>
          </li>
          <li className="sidebar-item">
            <Link to="/user/practice">
              <div className='label-l'>
                <PiStudent className='icon-l' />
                <div className="label">Practice</div>
              </div>
            </Link>
          </li>

          <li className="sidebar-item">
            <Link to="/user/contests">
              <div className='label-l'>
                <FaFileUpload className='icon-l' />
                <div className='label'>Contest</div>
              </div>
            </Link>
          </li>

          <li className="sidebar-item">
            <Link to="/user/leaderboard">
              <div className='label-l'>
                <MdLeaderboard className='icon-l' />
                <div className="label">Leaderboard</div>
              </div>
            </Link>
          </li>

          <li className="sidebar-item" onClick={handleLogout}>
            <IoIosLogOut className='icon-l' />
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