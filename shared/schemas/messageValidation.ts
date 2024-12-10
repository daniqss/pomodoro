import z from "zod";
import {
  joinRoomMessage,
  joinSuccefullyMessage,
  roomJoinedMessage,
  updatedTimerMessage,
  user,
} from "../types/messages";

const userSchema = z.object({
  id: z.string(),
  name: z.string(),
});

const joinRoomMessage = z.object({
  room: z.string(),
  user: userSchema,
});

const joinSuccefullyMessageSchema = z.object({
  room: z.string(),
  users: z.array(userSchema),
});

const roomJoinedMessageSchema = z.union([
  joinSuccefullyMessageSchema,
  z.string(),
]);

const updatedTimerMessageSchema = z.object({
  room: z.string(),
  isPaused: z.boolean(),
  newMinutes: z.number().int(),
  newSeconds: z.number().int(),
  timerState: z.enum(["focus", "shortBreak", "longBreak"]),
});

export function validateUser(user: user) {
  return userSchema.safeParse(user);
}

export function validateJoinRoomMessage(message: joinRoomMessage) {
  return joinRoomMessage.safeParse(message);
}

export function validateJoinSuccefullyMessage(message: joinSuccefullyMessage) {
  return joinSuccefullyMessageSchema.safeParse(message);
}

export function validateRoomJoinedMessageSchema(message: roomJoinedMessage) {
  return roomJoinedMessageSchema.safeParse(message);
}

export function validateUpdatedTimerMessage(message: updatedTimerMessage) {
  return updatedTimerMessageSchema.safeParse(message);
}
