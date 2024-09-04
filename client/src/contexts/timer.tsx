import {
  createContext,
  Dispatch,
  SetStateAction,
  useState,
  ReactNode,
} from "react";
import { TimerState } from "../../../types/TimerState";
import { IS_DEV } from "../utils/config";

type minutesSecondsType = { minutes: number; seconds: number };

type timerClassesType = {
  focus: string;
  shortBreak: string;
  longBreak: string;
};

export type TimerContextType = {
  timerClasses: {
    lightBg: timerClassesType;
    darkBg: timerClassesType;
    lightFill: timerClassesType;
    darkFill: timerClassesType;
  };
  initialTimes: {
    focus: minutesSecondsType;
    shortBreak: minutesSecondsType;
    longBreak: minutesSecondsType;
  };
  minutes: number;
  setMinutes: Dispatch<SetStateAction<number>>;
  seconds: number;
  setSeconds: Dispatch<SetStateAction<number>>;
  isPaused: boolean;
  setIsPaused: Dispatch<SetStateAction<boolean>>;
  timerState: TimerState;
  setTimerState: Dispatch<SetStateAction<TimerState>>;
};

const TimerContext = createContext<TimerContextType | null>(null);

function TimerProvider({ children }: { children: ReactNode }) {
  const timerClasses = {
    lightBg: {
      focus: "bg-red-300",
      shortBreak: "bg-blue-300",
      longBreak: "bg-green-300",
    },
    darkBg: {
      focus: "bg-red-400",
      shortBreak: "bg-blue-400",
      longBreak: "bg-green-400",
    },
    lightFill: {
      focus: "fill-red-300",
      shortBreak: "fill-blue-300",
      longBreak: "fill-green-300",
    },
    darkFill: {
      focus: "fill-red-400",
      shortBreak: "fill-blue-400",
      longBreak: "fill-green-400",
    },
  };
  const initialTimes = {
    focus: IS_DEV ? { minutes: 0, seconds: 25 } : { minutes: 25, seconds: 0 },
    shortBreak: IS_DEV
      ? { minutes: 0, seconds: 5 }
      : { minutes: 5, seconds: 0 },
    longBreak: IS_DEV
      ? { minutes: 0, seconds: 15 }
      : { minutes: 15, seconds: 0 },
  };
  const [minutes, setMinutes] = useState(
    IS_DEV ? initialTimes.focus.minutes : initialTimes.focus.minutes,
  );
  const [seconds, setSeconds] = useState(
    IS_DEV ? initialTimes.focus.seconds : initialTimes.focus.seconds,
  );
  const [isPaused, setIsPaused] = useState(true);
  const [timerState, setTimerState] = useState<TimerState>("focus");

  return (
    <TimerContext.Provider
      value={{
        minutes,
        setMinutes,
        seconds,
        setSeconds,
        timerClasses,
        initialTimes,
        isPaused,
        setIsPaused,
        timerState,
        setTimerState,
      }}
    >
      {children}
    </TimerContext.Provider>
  );
}

export { TimerProvider, TimerContext };
