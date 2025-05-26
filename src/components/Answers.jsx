import { useEffect, useRef } from "react";

export default function Answers({
  answers,
  selectedAnswer,
  answeredState,
  onSelect,
}) {
  const shuffledAnswers = useRef();
  if (!shuffledAnswers.current) {
    // If shuffledAnswers.current is not set, we need to shuffle the answers for the current question.
    // If shuffledAnswers.current is set, we don't need to shuffle the answers again.
    // This says: "Only shuffle the answers if they are not already shuffled."
    shuffledAnswers.current = [...answers];
    shuffledAnswers.current.sort(() => Math.random() - 0.5);
  }
  var foo = 1;
  return (
    <ul id="answers">
      {shuffledAnswers.current.map((answer) => {
        const isSelected = selectedAnswer === answer;
        let cssClass = "";

        if (answeredState === selectedAnswer && isSelected) {
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
            <button onClick={() => onSelect(answer)} className={cssClass}>
              {answer}
            </button>
          </li>
        );
      })}
    </ul>
  );
}
