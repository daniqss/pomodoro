import {
  createContext,
  Dispatch,
  SetStateAction,
  useState,
  ReactNode,
} from "react";
import { TimerState } from "../../../types/TimerState";

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
    focus: { minutes: number; seconds: number };
    shortBreak: { minutes: number; seconds: number };
    longBreak: { minutes: number; seconds: number };
  };
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
    focus: { minutes: 25, seconds: 0 },
    shortBreak: { minutes: 5, seconds: 0 },
    longBreak: { minutes: 15, seconds: 0 },
  };
  const [isPaused, setIsPaused] = useState(true);
  const [timerState, setTimerState] = useState<TimerState>("focus");

  return (
    <TimerContext.Provider
      value={{
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
