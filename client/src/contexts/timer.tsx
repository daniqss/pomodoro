import { createContext, Dispatch, SetStateAction, useState, ReactNode } from "react";
import { TimerState } from "../types/TimerState";

type TimerContextType = {
  timerClasses: {
    focus: string;
    shortBreak: string;
    longBreak: string;
    icons: {
      focus: string;
      shortBreak: string;
      longBreak: string;
    };
  };
  isPaused: boolean;
  setIsPaused: Dispatch<SetStateAction<boolean>>;
  timerState: TimerState;
  setTimerState: Dispatch<SetStateAction<TimerState>>;
};

const TimerContext = createContext<TimerContextType | null>(null);

function TimerProvider({ children }: { children: ReactNode }) {
  const timerClasses = {
    focus: 'bg-red-300 text-gray-800 p-4 text-center rounded',
    shortBreak: 'bg-blue-300 text-gray-800 p-4 text-center rounded',
    longBreak: 'bg-green-300 text-gray-800 p-4 text-center rounded',
    icons: {
      focus: 'fill-red-400 w-6 h-6 mr-1',
      shortBreak: 'fill-blue-400 w-6 h-6 mr-1',
      longBreak: 'fill-green-400 w-6 h-6 mr-1',
    }
  };
  const [isPaused, setIsPaused] = useState(true);
  const [timerState, setTimerState] = useState<TimerState>('focus');

  return (
    <TimerContext.Provider
      value={{
        timerClasses,
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