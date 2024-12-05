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

  const [error, setError] = useState(null); // Add error state for better debugging

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/stats/profileStats", {
          method: "GET",
          credentials: "include", // Ensures cookies are sent with the request
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        console.log(data); // Ensure the data structure matches the expected format
        setStats(data); // Update state with the fetched data
      } catch (err) {
        console.error("Error fetching stats:", err);
        setError(err.message); // Update error state
      }
    };

    fetchStats();
  }, []);

  return (
    <div className="profile-stats">
      <h2>Profile Overview</h2>
      {error ? (
        <p style={{ color: "red" }}>Error: {error}</p> // Display error message
      ) : (
        <div className="stats-section">
          <div className="stat-item">
            <h3>Rank</h3>
            <p>{stats.rank || "N/A"}</p>
          </div>
          <div className="stat-item">
            <h3>Questions Solved</h3>
            <p>{stats.solvedQuestions || 0}</p>
          </div>
          <div className="stat-item">
            <h3>Streak</h3>
            <p>{stats.streak || 0} days</p>
          </div>
          <div className="stat-item">
            <h3>Recent Activity</h3>
            <ul>
              {stats.recentActivity.length > 0 ? (
                stats.recentActivity.map((activity, index) => (
                  <li key={index}>{activity}</li>
                ))
              ) : (
                <li>No recent activity</li>
              )}
            </ul>
          </div>
          <div className="stat-item">
            <h3>Recent Contests</h3>
            <ul>
              {stats.recentContests.length > 0 ? (
                stats.recentContests.map((contest, index) => (
                  <li key={index}>{contest}</li>
                ))
              ) : (
                <li>No recent contests</li>
              )}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfileStats;
