import QuestionTimer from "./QuestionTimer";
import Answers from "./Answers";
import { useState } from "react";
import QUESTIONS from "../questions";

export default function Question({
  questionIndex,
  handleSkipAnswer,
  onSelectAnswer,
}) {
  const [answerUser, setAnswerUser] = useState({
    selectedAnswer: "",
    isCorrect: null,
  });

  let timer = 10000; // 10 seconds in milliseconds

  if (answerUser.selectedAnswer) {
    timer = 1000;
  }

  if (answerUser.isCorrect !== null) {
    timer = 2000; // 2 seconds in milliseconds
  }

  function handleSelectAnswer(answerText) {
    setAnswerUser({
      selectedAnswer: answerText,
      isCorrect: null,
    });

    setTimeout(() => {
      setAnswerUser({
        selectedAnswer: answerText,
        isCorrect: answerText === QUESTIONS[questionIndex].answers[0],
      });

      setTimeout(() => {
        onSelectAnswer(answerText);
      }, 2000);
    }, 1000);
  }

  let answeredState = "";
  if (answerUser.selectedAnswer && answerUser.isCorrect !== null) {
    answeredState = answerUser.isCorrect ? "correct" : "wrong";
  } else if (answerUser.selectedAnswer) {
    answeredState = "answered";
  }

  return (
    <div id="question">
      <QuestionTimer
        key={timer}
        // key={activeQuestionIndex} // Used to force a rerender and reset the timer
        // we can't use two of the same keys as it will cause a warning in the console. So we are making a new question component that will be used in the Quiz component.
        timeout={timer}
        // We are passing the timer as a prop to the QuestionTimer component so that it can reset the timer when the question changes or when the user selects an answer.
        onTimeout={answerUser.selectedAnswer === "" ? handleSkipAnswer : null} // causes a rerender in useEffect
        mode={answeredState}
      />
      <h2>{QUESTIONS[questionIndex].text}</h2>
      <Answers
        // key={activeQuestionIndex} // Used to force a rerender and reset the answers
        // There is no need to catch the prop in Answers.jsx, because we are not using it in the component.
        // We are just using it here to force a rerender and reset the answers.
        answers={QUESTIONS[questionIndex].answers}
        selectedAnswer={answerUser.selectedAnswer}
        answeredState={answeredState}
        onSelect={handleSelectAnswer}
      />
    </div>
  );
}
