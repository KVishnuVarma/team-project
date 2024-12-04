import React, { useEffect, useState } from "react";
import "./ProfileStats.css";

const ProfileStats = () => {
  const [stats, setStats] = useState({
    rank: "",
    solvedQuestions: 0,
    recentActivity: [],
    streak: 0,
    recentContests: [],
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/stats/profileStats", {
          method: "GET",
          credentials: "include", // Ensures cookies are sent with the request
        });

        if (!response.ok) {
          throw new Error(`Error: ${response.status}`);
        }

        const data = await response.json();
        setStats(data);
      } catch (err) {
        console.error("Error fetching stats:", err);
      }
    };

    fetchStats();
  }, []);

  return (
    <div className="profile-stats">
      <h2>Profile Overview</h2>
      <div className="stats-section">
        <div className="stat-item">
          <h3>Rank</h3>
          <p>{stats.rank}</p>
        </div>
        <div className="stat-item">
          <h3>Questions Solved</h3>
          <p>{stats.solvedQuestions}</p>
        </div>
        <div className="stat-item">
          <h3>Streak</h3>
          <p>{stats.streak} days</p>
        </div>
        <div className="stat-item">
          <h3>Recent Activity</h3>
          <ul>
            {stats.recentActivity.map((activity, index) => (
              <li key={index}>{activity}</li>
            ))}
          </ul>
        </div>
        <div className="stat-item">
          <h3>Recent Contests</h3>
          <ul>
            {stats.recentContests.map((contest, index) => (
              <li key={index}>{contest}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ProfileStats;
