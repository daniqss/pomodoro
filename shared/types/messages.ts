import { updatedTimerMessage } from "./timer.js";
import { user } from "./user.js";

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
