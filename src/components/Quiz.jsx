import { useCallback, useState } from "react";
import QUESTIONS from "../questions";
import Question from "./Question";
import Summary from "./Summary";

export default function Quiz() {
  const [userAnswers, setUserAnswers] = useState([]);

  const activeQuestionIndex = userAnswers.length;
  // We do -1 because of the handleSelectAnswer function. It will add the answer to the userAnswers array, so to prevent going to the next question we subtract 1.

  // If sort() takes a negative value, the first element should come before the second element. Positive value - the second element should come before the first. It returns 0, the order remains unchanged.
  // Math.random() takes a number between 0 and 1. If we subtract 0.5, we get a number between -0.5 and 0.5.
  // This chance of getting a negative value is 50%. So, we have a 50% chance of getting a negative value and 50% chance of getting a positive value.
  // Effectively, we are randomizing the order of the answers.

  const quizCompleted = userAnswers.length === QUESTIONS.length;

  const handleSelectAnswer = useCallback(function handleSelectAnswer(
    selectedAnswer
  ) {
    setUserAnswers((prev) => [...prev, selectedAnswer]);
  },
  []);
  // We also useCallback here because this is a dependency of handleSkipAnswer. Dependencies must be stable as well.
  // here we are not using any state or props or any values that can change.

  const handleSkipAnswer = useCallback(() => {
    handleSelectAnswer(null);
  }, [handleSelectAnswer]);
  // We useCallback here, because everytime we call handleSkipAnswer, it will create a new function. This will cause the component to rerender. We want to avoid that.

  if (quizCompleted) {
    return <Summary userAnswers={userAnswers} />;
  }

  return (
    <div id="quiz">
      <Question
        onSelectAnswer={handleSelectAnswer}
        handleSkipAnswer={handleSkipAnswer}
        key={activeQuestionIndex} // Used to force a rerender and reset the question
        questionIndex={activeQuestionIndex} // Pass the current question index to the Question component
      />
    </div>
  );
}
