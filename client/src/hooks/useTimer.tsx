import { useEffect, useContext } from "react";
import { TimerContext, TimerContextType } from "../contexts/timer";

function useTimer() {
  const {
    minutes,
    setMinutes,
    seconds,
    setSeconds,
    initialTimes,
    isPaused,
    setIsPaused,
    timerState,
    setTimerState,
  } = useContext(TimerContext) as TimerContextType;

  useEffect(() => {
    function setNextTimerState() {
      if (timerState === "focus") {
        setTimerState("shortBreak");
      } else if (timerState === "shortBreak") {
        setTimerState("longBreak");
      } else {
        setTimerState("focus");
      }

      setSeconds(initialTimes[timerState].seconds);
      setMinutes(initialTimes[timerState].minutes);
      setIsPaused(true);
    }

    if (isPaused) {
      return;
    }

    const interval = setInterval(() => {
      if (seconds > 0) {
        setSeconds(seconds - 1);
      }
      if (seconds === 0) {
        if (minutes === 0) {
          setNextTimerState();
          clearInterval(interval);
        } else {
          setMinutes(minutes - 1);
          setSeconds(59);
        }
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [
    minutes,
    seconds,
    isPaused,
    setSeconds,
    setTimerState,
    setMinutes,
    timerState,
    initialTimes,
    setIsPaused,
  ]);

  return {
    minutes,
    seconds,
    setMinutes,
    setSeconds,
    timerState,
    setTimerState,
  };
}

export default useTimer;
