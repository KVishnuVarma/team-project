import React, { useState, useEffect } from 'react';
import { get } from '../services/Api'; // Assuming you have a GET helper function
import './contestList.css';

const ContestList = () => {
  const [questions, setQuestions] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await get('/api/questions');
        setQuestions(response.data);
      } catch (error) {
        console.error("Error fetching questions:", error);
        setError("Failed to fetch questions.");
      }
    };
    fetchQuestions();
  }, []);

  return (
    <div className="user-container">
      <h3>Available Contests/Questions</h3>
      {error && <p className="error-message">{error}</p>}
      {questions.length === 0 ? (
        <p>No contests or questions available at the moment.</p>
      ) : (
        <div className="questions-list">
          {questions.map((question) => (
            <div key={question._id} className="question-card">
              <h4>{question.title}</h4>
              <p>{question.description}</p>
              <h5>Test Cases:</h5>
              <ul>
                {question.testCases.map((testCase, index) => (
                  <li key={index}>
                    <strong>Input:</strong> {testCase.input}, <strong>Expected Output:</strong> {testCase.expectedOutput}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ContestList;
