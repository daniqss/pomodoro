import { TimerState } from "./TimerState";

export type user = {
  id: string;
  name: string;
};

export type room = string;
export type createRoomMessage = {};
export type roomCreatedMessage = room;
export type joinRoomMessage = room;
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
