export type timerState = "focus" | "shortBreak" | "longBreak";

export type updatedTimerMessage = {
  room: string;
  isPaused: boolean;
  newMinutes: number;
  newSeconds: number;
  timerState: timerState;
};
