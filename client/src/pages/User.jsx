// src/pages/User.jsx
import React, { useState, useEffect } from 'react';
import './User.css';
import Navbar from '../User/NavBar'; // Ensure the import path is correct

const User = ({ userName }) => {
    const [userData, setUserData] = useState({
        name: userName || ' ', // Default name if userName is not provided
        problemsSolved: 10,
        totalProblems: 50,
        userProblems: []
    });
    const [selectedSection, setSelectedSection] = useState("home");

    useEffect(() => {
        const fetchUserProblems = () => {
            setUserData((prevState) => ({
                ...prevState,
                userProblems: [
                    { title: 'Problem 1', accuracy: '80%', difficulty: 'Medium', status: 'Solved' },
                    { title: 'Problem 2', accuracy: '75%', difficulty: 'Easy', status: 'Pending' },
                ]
            }));
        };

        fetchUserProblems();
    }, []);

    useEffect(() => {
        setUserData((prevState) => ({ ...prevState, name: userName }));
    }, [userName]);

    return (
        <div className="container">
            <div className="sidebar">
                <ul>
                    <li>
                        <h2 className="label">Profile</h2>
                    </li>
                    <li>
                        <h2 className="label">Practice</h2>
                    </li>
                    <li>
                        <h2 className="label">Test</h2>
                    </li>
                    <li>
                        <h2 className="label">Leaderboard</h2>
                    </li>
                    <li>
                        <h2 className="label">Mode</h2>
                    </li>
                    <li>
                        <h2 className="label">Logout</h2>
                    </li>
                </ul>
            </div>
            <div className="content">
                <div className="header-left">
                    <h3>Welcome, {userData.name}</h3>
                    <p>Problems solved: {userData.problemsSolved} / {userData.totalProblems}</p>
                </div>
                {selectedSection === "home" ? (
                    <div>
                        <input type="search" placeholder="Search problems..." />
                        <table>
                            <thead>
                                <tr>
                                    <th>Title</th>
                                    <th>Accuracy</th>
                                    <th>Difficulty</th>
                                    <th>Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {userData.userProblems.map((problem, index) => (
                                    <tr key={index}>
                                        <td>{problem.title}</td>
                                        <td>{problem.accuracy}</td>
                                        <td>{problem.difficulty}</td>
                                        <td>{problem.status}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                ) : (
                    <div>
                        <h4>You selected: {selectedSection}</h4>
                    </div>
                )}
            </div>
        </div>
    );
};

export default User;
