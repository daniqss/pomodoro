import { createContext, Dispatch, SetStateAction, useState, ReactNode } from "react";
import { TimerState } from "../types/TimerState";

type timerClassesType = {
  focus: string;
  shortBreak: string;
  longBreak: string;
}

type TimerContextType = {
  timerClasses: {
    light: timerClassesType;
    dark: timerClassesType;
  };
  initialTimes: {
    focus: {minutes: number, seconds: number};
    shortBreak: {minutes: number, seconds: number};
    longBreak: {minutes: number, seconds: number};
  }
  isPaused: boolean;
  setIsPaused: Dispatch<SetStateAction<boolean>>;
  timerState: TimerState;
  setTimerState: Dispatch<SetStateAction<TimerState>>;
};

const TimerContext = createContext<TimerContextType | null>(null);

function TimerProvider({ children }: { children: ReactNode }) {
  const timerClasses = {
    light: {
      focus: '-red-300',
      shortBreak: '-blue-300',
      longBreak: '-green-300',
    },
    dark: {
      focus: '-red-400',
      shortBreak: '-blue-400',
      longBreak: '-green-400',
    }
  }
  const initialTimes = {
    focus: {minutes: 25, seconds: 0},
    shortBreak: {minutes: 5, seconds: 0},
    longBreak: {minutes: 15, seconds: 0}
  };
  const [isPaused, setIsPaused] = useState(true);
  const [timerState, setTimerState] = useState<TimerState>('focus');

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