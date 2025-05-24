import { useEffect, useState } from "react";

export default function QuestionTimer({ timeout, onTimeout }) {
  const [timeRemaining, setTimeRemaining] = useState(timeout);

  useEffect(() => {
    console.log("Timer started");
    const timer = setTimeout(onTimeout, timeout);

    return () => {
      clearTimeout(timer);
    };
  }, [timeout, onTimeout]);

  useEffect(() => {
    console.log("interval started");
    const interval = setInterval(() => {
      setTimeRemaining((prev) => prev - 1000);
    }, 1000);

    return () => {
      setTimeRemaining(timeout);
      clearInterval(interval);
    };
  }, []);

  return <progress max={timeout} value={timeRemaining} />;
}
