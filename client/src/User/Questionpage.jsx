import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom"; // Extract contestId from the URL

const QuestionsPage = () => {
  const { contestId } = useParams(); // Get the contestId from the route
  const [questions, setQuestions] = useState([]); // Initialize as empty array
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true); // Track loading state

  useEffect(() => {
    async function fetchQuestions() {
      try {
        const response = await fetch(`http://localhost:5000/api/contests/${contestId}/questions`);
        if (!response.ok) {
          throw new Error("Failed to fetch questions");
        }
        const data = await response.json();

        console.log("API Response:", data);  // Log the response to check its structure

        // Ensure that the data contains a 'questions' array
        if (data && Array.isArray(data.questions)) {
          setQuestions(data.questions);
        } else {
          setQuestions([]);
          setError("Questions data is not in the expected format.");
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchQuestions();
  }, [contestId]);

  if (loading) {
    return <div className="loading-message">Loading questions...</div>; // Loading indicator
  }

  if (error) {
    return <div className="error-message">Error: {error}</div>; // Error message if fetch fails
  }

  return (
    <div className="questions-page">
      <h1>Questions for Contest</h1>
      {questions.length === 0 ? (
        <p>No questions available for this contest.</p> // Display message if no questions
      ) : (
        <ul className="questions-list">
          {questions.map((question) => (
            <li key={question._id} className="question-item">
              <h2>{question.title}</h2>
              <p>{question.description}</p>
              <ul className="options-list">
                {question.options.map((option, index) => (
                  <li key={index} className="option-item">
                    {index + 1}. {option}
                  </li>
                ))}
              </ul>
              <p><strong>Correct Option:</strong> {question.correctOption + 1}</p> {/* Display the correct option index */}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default QuestionsPage;
