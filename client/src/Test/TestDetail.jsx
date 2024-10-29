import React from "react";
import { useParams } from "react-router-dom";
import "./TestDetail.css";

const testList = [
  {
    id: 0,
    title: "Cognizant Test Practice",
    description: "Aptitude, Logical Reasoning",
    longDescription:
      "Prepare for Cognizant's aptitude and logical reasoning tests with this practice set.",
    questionTypes: ["MCQ Questions", "Programming Question"],
    questionCount: [20, 2],
    level: ["Medium", "Medium"],
    rating: 4.0,
    problemCount: 20,
    learnerCount: 1000,
  },
  {
    id: 1,
    title: "Zoho Test Practice",
    description: "Logical Reasoning, Basic Programming",
    longDescription:
      "Practice logical reasoning and basic programming skills with Zoho's test prep set.",
    questionTypes: ["MCQ Questions", "Coding Question"],
    questionCount: [15, 3],
    level: ["Easy", "Medium"],
    rating: 4.2,
    problemCount: 18,
    learnerCount: 850,
  },
  // Add more tests as needed
];

const TestDetail = () => {
  const { id } = useParams();
  const testId = parseInt(id); // Convert id from string to integer
  const test = testList.find((item) => item.id === testId);

  // Handle case if test not found
  if (!test) {
    return <div className="test-details-container">Test not found.</div>;
  }

  return (
    <div className="test-details-container">
      <h1 className="test-title">{test.title}</h1>
      <p className="test-category">{test.description}</p>

      <div className="test-info">
        <div className="test-info-section">
          <h4>Questions Type</h4>
          {test.questionTypes.map((type, index) => (
            <p key={index}>{type}</p>
          ))}
        </div>
        <div className="test-info-section">
          <h4>No Of Questions</h4>
          {test.questionCount.map((count, index) => (
            <p key={index}>{count} Questions</p>
          ))}
        </div>
        <div className="test-info-section">
          <h4>Level</h4>
          {test.level.map((level, index) => (
            <p key={index}>{level}</p>
          ))}
        </div>
      </div>

      <button className="start-test-button">Start Test</button>

      <div className="test-description-box">
        <p>{test.longDescription}</p>
      </div>

      <div className="test-summary">
        <span>{test.rating} ★</span>
        <span>{test.problemCount}+ Problems</span>
        <span>{test.learnerCount}+ Learners</span>
      </div>
    </div>
  );
};

export default TestDetail;
