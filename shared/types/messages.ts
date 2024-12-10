import { TimerState } from "./timerState.js";

export type user = {
  id: string;
  name: string;
};

export type room = string;
export type createRoomMessage = user;
export type roomCreatedMessage = room;
export type joinRoomMessage = { room: room; user: user };
export type joinSuccefullyMessage = {
  room: string;
  users: user[];
};
export type roomJoinedMessage = joinSuccefullyMessage | string;
export type userJoinedMessage = user;

export type getTimerMessage = string;
export type receiveTimerMessage = updatedTimerMessage;

export type updatedTimerMessage = {
  room: string;
  isPaused: boolean;
  newMinutes: number;
  newSeconds: number;
  timerState: TimerState;
};
