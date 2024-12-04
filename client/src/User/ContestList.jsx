import React, { useEffect, useState } from 'react';
import './ContestList.css'; // Import the CSS file for styling
import { useNavigate } from 'react-router-dom'; // Assuming you're using React Router for navigation

const ContestList = () => {
    const [contests, setContests] = useState([]);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        async function fetchContests() {
            try {
                const response = await fetch('http://localhost:5000/api/contests');
                if (!response.ok) {
                    throw new Error('Failed to fetch contests');
                }
                const data = await response.json();
                setContests(data);
            } catch (err) {
                setError(err.message);
            }
        }

        fetchContests();
    }, []);

    if (error) {
        return <div className="error-message">Error: {error}</div>;
    }

    const handleCardClick = (contestId) => {
        navigate(`/contests/${contestId}`); // Navigate to the contest's detail page
    };

    // Group contests by category
    const biweeklyContests = contests.filter(contest => contest.category === 'Biweekly');
    const monthlyContests = contests.filter(contest => contest.category === 'Monthly');
    const dailyContests = contests.filter(contest => contest.category === 'Daily');

    return (
        <div>
            {/* Biweekly Battles Section */}
            {biweeklyContests.length > 0 && (
                <div className="contest-category-section">
                    <h2>Biweekly Battles</h2>
                    <div className="contest-card-container">
                        {biweeklyContests.map((contest) => (
                            <div
                                key={contest._id}
                                className="contest-card"
                                onClick={() => handleCardClick(contest._id)}
                            >
                                <div className="card-content">
                                    <h2 className="contest-title">{contest.title}</h2>
                                    <p className="contest-description">{contest.description}</p>
                                    <p className="contest-timing">
                                        Starts at: {new Date(contest.startTime).toLocaleString()}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Monthly Masters Section */}
            {monthlyContests.length > 0 && (
                <div className="contest-category-section">
                    <h2>Monthly Masters</h2>
                    <div className="contest-card-container">
                        {monthlyContests.map((contest) => (
                            <div
                                key={contest._id}
                                className="contest-card"
                                onClick={() => handleCardClick(contest._id)}
                            >
                                <div className="card-content">
                                    <h2 className="contest-title">{contest.title}</h2>
                                    <p className="contest-description">{contest.description}</p>
                                    <p className="contest-timing">
                                        Starts at: {new Date(contest.startTime).toLocaleString()}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Daily Contests Section */}
            {dailyContests.length > 0 && (
                <div className="contest-category-section">
                    <h2>Daily Contests</h2>
                    <div className="contest-card-container">
                        {dailyContests.map((contest) => (
                            <div
                                key={contest._id}
                                className="contest-card"
                                onClick={() => handleCardClick(contest._id)}
                            >
                                <div className="card-content">
                                    <h2 className="contest-title">{contest.title}</h2>
                                    <p className="contest-description">{contest.description}</p>
                                    <p className="contest-timing">
                                        Starts at: {new Date(contest.startTime).toLocaleString()}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Message when no contests */}
            {biweeklyContests.length === 0 && monthlyContests.length === 0 && dailyContests.length === 0 && (
                <p className="no-contests">No active contests at the moment.</p>
            )}
        </div>
    );
};

export default ContestList;
