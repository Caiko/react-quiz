import { useCallback, useRef, useState } from "react";
import QUESTIONS from "../questions";
import quizCompletedImage from "../assets/quiz-complete.png";
import QuestionTimer from "./QuestionTimer";

const TIMEOUT = 10000; // 10 seconds

export default function Quiz() {
  const shuffledAnswers = useRef();
  const [answeredState, setAnsweredState] = useState("");
  const [userAnswers, setUserAnswers] = useState([]);

  const activeQuestionIndex =
    answeredState === "" ? userAnswers.length : userAnswers.length - 1;
  // We do -1 because of the handleSelectAnswer function. It will add the answer to the userAnswers array, so to prevent going to the next question we subtract 1.

  // If sort() takes a negative value, the first element should come before the second element. Positive value - the second element should come before the first. It returns 0, the order remains unchanged.
  // Math.random() takes a number between 0 and 1. If we subtract 0.5, we get a number between -0.5 and 0.5.
  // This chance of getting a negative value is 50%. So, we have a 50% chance of getting a negative value and 50% chance of getting a positive value.
  // Effectively, we are randomizing the order of the answers.

  const quizCompleted = userAnswers.length === QUESTIONS.length;

  const handleSelectAnswer = useCallback(function handleSelectAnswer(
    selectedAnswer
  ) {
    setAnsweredState("answered");

    setUserAnswers((prev) => [...prev, selectedAnswer]);

    setTimeout(() => {
      if (selectedAnswer === QUESTIONS[activeQuestionIndex].answers[0]) {
        setAnsweredState("correct");
      } else {
        setAnsweredState("wrong");
      }

      setTimeout(() => {
        setAnsweredState("");
      }, 2000);
      // The nested timer will start after the first timer ends. This is to show the user the answer they selected and if it was correct or wrong.
    }, 1000);
  },
  []);
  // We also useCallback here because this is a dependency of handleSkipAnswer. Dependencies must be stable as well.
  // here we are not using any state or props or any values that can change.

  const handleSkipAnswer = useCallback(() => {
    () => handleSelectAnswer(null);
  }, [handleSelectAnswer]);
  // We useCallback here, because everytime we call handleSkipAnswer, it will create a new function. This will cause the component to rerender. We want to avoid that.

  if (quizCompleted) {
    return (
      <div id="summary">
        <img src={quizCompletedImage} alt="" />
        <h2>Quiz Completed</h2>
      </div>
    );
  }

  if (!shuffledAnswers.current) {
    // If shuffledAnswers.current is not set, we need to shuffle the answers for the current question.
    // If shuffledAnswers.current is set, we don't need to shuffle the answers again.
    // This says: "Only shuffle the answers if they are not already shuffled."
    shuffledAnswers.current = [...QUESTIONS[activeQuestionIndex].answers];
    shuffledAnswers.current.sort(() => Math.random() - 0.5);
  }
  return (
    <div id="quiz">
      <div id="question">
        <QuestionTimer
          key={activeQuestionIndex} // Used to force a rerender and reset the timer
          timeout={TIMEOUT}
          onTimeout={() => handleSelectAnswer(null)} // causes a rerender in useEffect
        />
        <h2>{QUESTIONS[activeQuestionIndex].text}</h2>
        <ul id="answers">
          {shuffledAnswers.current.map((answer) => {
            const isSelected = userAnswers[userAnswers.length - 1] === answer;
            let cssClass = "";

            if (answeredState === "answered" && isSelected) {
              cssClass = "selected";
            }

            if (
              (answeredState === "correct" || answeredState === "wrong") &&
              isSelected
            ) {
              cssClass = answeredState;
            }

            return (
              <li key={answer} className="answer">
                <button
                  onClick={() => handleSelectAnswer(answer)}
                  className={cssClass}
                >
                  {answer}
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
