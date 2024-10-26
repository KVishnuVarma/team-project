import React, { useEffect, useState } from "react";
import './Practice.css';

const Practice = () => {
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("http://localhost:5000/api/questions/api/questions")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch questions");
        }
        return response.json();
      })
      .then((data) => {
        setQuestions(data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error.message);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading questions...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h1>Practice Questions</h1>
      <ul>
        {questions.length > 0 ? (
          questions.map((question) => (
            <div key={question._id}>
              <h3>{question.title}</h3>
              <p>{question.description}</p>
              <p>Created At: {new Date(question.createdAt).toLocaleDateString()}</p>
              <div>
                <h4>Test Cases:</h4>
                <ul>
                  {question.testCases.map((testCase, index) => (
                    <li key={index}>{testCase}</li>
                  ))}
                </ul>
              </div>
            </div>
          ))
        ) : (
          <p>No questions available</p>
        )}
      </ul>
    </div>
  );
};

export default Practice;
