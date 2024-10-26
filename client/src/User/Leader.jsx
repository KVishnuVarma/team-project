import React, { useState, useEffect } from 'react';
import { IoMdContact } from 'react-icons/io';
import './Leader.css';

const Leader = () => {
  const [data, setData] = useState([]);

  const getUser = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/admin/getuser");
      const data = await response.json();
      console.log(data);
      setData(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  return (
    <div className="third-years-container">
      <h3>Leader Board</h3>
      <ul>
        {data.map((student, index) => (
          <li key={index}>
            <span className="student-profile">
              <IoMdContact className="contacticon" />
              <span className="student-name">{student.name}</span>
            </span>
            <span className="student-points">{student.points} Points</span>
            <button className="explore-btn">Explored</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Leader;
