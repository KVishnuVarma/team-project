import React from 'react';
import './Leader.css'; 

const Leader = () => {
  return (
    <div className="leaderboard">
      <h1>Leaderboard</h1>
      <table className="leaderboard-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Points</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Unknown</td>
            <td>800 Points</td>
            <td><button className="explore-btn">Explore</button></td>
          </tr>
          <tr>
            <td>Unknown</td>
            <td>750 Points</td>
            <td><button className="explore-btn">Explore</button></td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default Leader;