import React from 'react';
import './thirdYear.css'; 
import { IoMdContact } from "react-icons/io";

const ThirdYears = () => {
  const data = [
    { name: "Unknown", points: 800 },
    { name: "Unknown", points: 770 },
    { name: "Unknown", points: 750 },
    { name: "Unknown", points: 740 },
    { name: "Unknown", points: 735 },
    { name: "Unknown", points: 700 },
  ];

  return (
    <div className="third-years-container">
      <h3>Third Year Students</h3>
      <ul>
        {data.map((student, index) => (
          <li key={index}>
            <span className="student-profile">
              <IoMdContact className='contacticon' />
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

export default ThirdYears;
