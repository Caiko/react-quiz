import { useEffect, useState } from "react";

export default function QuestionTimer({ timeout, onTimeout }) {
  const [timeRemaining, setTimeRemaining] = useState(timeout);

  useEffect(() => {
    const timer = setTimeout(onTimeout, timeout);

    return () => {
      clearTimeout(timer);
    };
  }, [timeout, onTimeout]);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeRemaining((prev) => prev - 50);
    }, 50);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return <progress max={timeout} value={timeRemaining} />;
}
