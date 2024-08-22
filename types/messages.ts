import { TimerState } from "./TimerState";

export type createRoomMessage = {};
export type roomCreatedMessage = string;
export type joinRoomMessage = string;
export type joinSuccefullyMessage = {
  room: string;
  users: string[];
};
export type roomJoinedMessage = joinSuccefullyMessage | string;
export type userJoinedMessage = string;

export type playStopTimerMessage = {
  isPaused: boolean;
  newMinutes: number;
  newSeconds: number;
  timerState: TimerState;
};
