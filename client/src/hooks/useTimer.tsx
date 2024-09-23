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
    focusStrikes,
    setFocusStrikes,
    strikesAfterLongBreak,
  } = useContext(TimerContext) as TimerContextType;

  useEffect(() => {
    function setNextTimerState() {
      if (timerState === "focus") {
        // Increment focusStrikes and check if it's time for a long break
        setFocusStrikes((prev) => {
          const updatedFocusStrikes = prev + 1;

          // Check if it's time for a long break
          if (updatedFocusStrikes % strikesAfterLongBreak === 0) {
            setTimerState("longBreak");
          } else {
            // Otherwise, it's time for a short break
            setTimerState("shortBreak");
          }

          return updatedFocusStrikes;
        });
      } else {
        // If the timer state is a break, go back to focus
        setTimerState("focus");
      }

      // TODO: Doesn't work correctly xd
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
    focusStrikes,
    setFocusStrikes,
    strikesAfterLongBreak,
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
