import { useState } from "react";
import QUESTIONS from "../questions";
import quizCompletedImage from "../assets/quiz-complete.png";

export default function Quiz() {
  const [userAnswers, setUserAnswers] = useState([]);

  const activeQuestionIndex = userAnswers.length;

  // If sort() takes a negative value, the first element should come before the second element. Positive value - the second element should come before the first. It returns 0, the order remains unchanged.
  // Math.random() takes a number between 0 and 1. If we subtract 0.5, we get a number between -0.5 and 0.5.
  // This chance of getting a negative value is 50%. So, we have a 50% chance of getting a negative value and 50% chance of getting a positive value.
  // Effectively, we are randomizing the order of the answers.

  const quizCompleted = userAnswers.length === QUESTIONS.length;

  function handleSelectAnswer(selectedAnswer) {
    setUserAnswers((prev) => [...prev, selectedAnswer]);
  }

  if (quizCompleted) {
    return (
      <div id="summary">
        <img src={quizCompletedImage} alt="" />
        <h2>Quiz Completed</h2>
      </div>
    );
  }

  const shuffledAnswers = [...QUESTIONS[activeQuestionIndex].answers];
  shuffledAnswers.sort(() => Math.random() - 0.5);

  return (
    <div id="quiz">
      <div id="question">
        <h2>{QUESTIONS[activeQuestionIndex].text}</h2>
        <ul id="answers">
          {shuffledAnswers.map((answer) => (
            <li key={answer} className="answer">
              <button onClick={() => handleSelectAnswer(answer)}>
                {answer}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
