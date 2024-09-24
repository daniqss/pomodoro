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
      const currentTimerState = timerState;

      setFocusStrikes((prev) => {
        // Update timer according to the focus strikes
        const nextTimerState =
          currentTimerState === "focus"
            ? prev % strikesAfterLongBreak === 1
              ? "longBreak"
              : "shortBreak"
            : "focus";

        setTimerState(nextTimerState);

        // Update times according to the next timer state
        const nextTime = initialTimes[nextTimerState];
        setSeconds(nextTime.seconds);
        setMinutes(nextTime.minutes);
        setIsPaused(true);

        // Update focus strikes if the timerState is focus
        return nextTimerState === "focus" ? prev : prev + 1;
      });
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
