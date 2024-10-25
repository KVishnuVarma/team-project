import React, { useEffect, useState } from "react";
import { get, post } from "../services/Api";
import '../User/Practice.css'
const Practice = () => {
  const [remainingQuestions, setRemainingQuestions] = useState([]);

  // Fetch remaining questions on component mount
  useEffect(() => {
    const fetchRemainingQuestions = async () => {
      try {
        const response = await get("/api/questions"); // Fetch all questions
        const allQuestions = response.data;

        // Filter the questions to get only the unsubmitted ones
        const remaining = allQuestions.filter((q) => q.submitted === false);
        setRemainingQuestions(remaining);
      } catch (error) {
        console.log("Error fetching remaining questions", error);
      }
    };

    fetchRemainingQuestions();
  }, []);

  const handleSubmit = async (questionId) => {
    try {
      await post(`/api/questions/${questionId}/submit`);
      // After submission, update the remaining questions
      setRemainingQuestions((prev) =>
        prev.filter((question) => question.id !== questionId)
      );
    } catch (error) {
      console.log("Error submitting question", error);
    }
  };

  return (
    <>
      <div className="practice-container">
        {remainingQuestions.length > 0 ? (
          <ul>
            {remainingQuestions.map((question) => (
              <li key={question.id}>
                {question.text}
                <button onClick={() => handleSubmit(question.id)}>
                  Submit
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <p>Till Now No Questions Have Been Uploaded</p>
        )}
      </div>

      <div class="dropdown">
        <button class="dropbtn">Dropdown</button>
        <div class="dropdown-content">
          <a href="#">Link 1</a>
          <a href="#">Link 2</a>
          <a href="#">Link 3</a>
        </div>
      </div>
    </>
  );
};

export default Practice;
