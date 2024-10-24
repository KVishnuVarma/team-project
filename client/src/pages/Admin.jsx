import React, { useState, useEffect } from 'react';
import { FaFileUpload } from "react-icons/fa";
import { PiStudent } from "react-icons/pi";
import { IoHomeOutline } from "react-icons/io5";
import { IoIosLogOut } from "react-icons/io";
import { get } from '../services/Api'; 
import './Admin.css';
import ThirdYears from '../Admin/ThirdYear';
import FourthYears from '../Admin/FourthYears'; // Corrected import

const Admin = () => {
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [currentDate, setCurrentDate] = useState("");
  const [selectedSection, setSelectedSection] = useState("upload"); // State to track the selected section
  const [users, setUsers] = useState([]); // State to hold fetched users

  useEffect(() => {
    // Fetch the current date
    const today = new Date();
    const formattedDate = `${today.getDate()}-${today.getMonth() + 1}-${today.getFullYear()}`;
    setCurrentDate(formattedDate);

    // Fetch users from the API
    const GetUsers = async () => {
      try {
        const request = await get('/api/admin/getuser');
        const response = request.data;
        console.log(response);
        setUsers(response); // Store fetched users in state
      } catch (error) {
        console.log(error);
      }
    };
    GetUsers();
  }, []);

  const handleFolderSelect = (event) => {
    const files = event.target.files;
    setSelectedFiles(files);
  };

  const handleUpload = () => {
    if (selectedFiles.length === 0) {
      alert('Please choose files first.');
      return;
    }

    const formData = new FormData();
    for (let i = 0; i < selectedFiles.length; i++) {
      formData.append('files', selectedFiles[i]);
    }

    fetch('http://localhost:3000/upload', {
      method: 'POST',
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        alert('Files uploaded successfully!');
      })
      .catch((error) => {
        alert(`Error uploading files: ${error.message}`);
      });
  };

  // Function to handle logout logic
  const handleLogout = () => {
    setSelectedSection("logout");
    // You can add more logic here, such as clearing session or redirecting the user
  };

  return (
    <div className="container">
      <div className="sidebar">
        <ul>
          <li>
            <img src="/logo.png" className="icon" alt="Free Code Logo" />
            <h2 className="label">Free Code</h2>
          </li>
          <li onClick={() => setSelectedSection("home")}>
            <IoHomeOutline className='icon' />
            <div className="label">Home Page</div>
          </li>
          <li onClick={() => setSelectedSection("thirdYears")}>
            <PiStudent className='icon' />
            <div className="label">3rd Years</div>
          </li>
          <li onClick={() => setSelectedSection("fourthYears")}>
            <PiStudent className='icon' />
            <div className="label">4th Years</div>
          </li>
          <li onClick={handleLogout}> {/* Added onClick to handle logout */}
            <IoIosLogOut className='icon' />
            <div className="label">Logout</div>
          </li>
        </ul>
      </div>
      <div className="content">
        <div className="header-left">
          <h3 className='admin'>Welcome Admin</h3>
          <p>{currentDate}</p>
          <div className="profile-pic"></div>
        </div>

        {selectedSection === "thirdYears" ? (
          <ThirdYears />
        ) : selectedSection === "fourthYears" ? (
          <FourthYears />
        ) : selectedSection === "logout" ? (
          <Logout /> 
        ) : (
          <div className="upload-container">
            <div className="upload-box">
              <FaFileUpload className="upload-icon" />
              <p>Choose Files</p>
              <input
                type="file"
                multiple
                onChange={handleFolderSelect}
              />
              <button onClick={handleUpload}>Upload</button>
            </div>
          </div>
        )}

        {/* Display fetched users */}
        <div className="user-list">
          <h3>Fetched Users:</h3>
          <ul>
            {users.length > 0 ? (
              users.map((user, index) => (
                <li key={index}>{user.name}</li> // Assuming each user has a 'name' field
              ))
            ) : (
              <p>No users found.</p>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Admin;
