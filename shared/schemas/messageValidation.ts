import z from "zod";
import {
  joinRoomMessage,
  joinSuccefullyMessage,
  roomJoinedMessage,
  updatedTimerMessage,
  user,
} from "../types/messages.js";

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

export default class MessageValidator {
  static validateUser(user: user) {
    return userSchema.safeParse(user);
  }

  static validateRoomCreatedMessage(room: string) {
    return z.string().safeParse(room);
  }

  static validateJoinRoomMessage(message: joinRoomMessage) {
    return joinRoomMessage.safeParse(message);
  }

  static validateJoinSuccefullyMessage(message: joinSuccefullyMessage) {
    return joinSuccefullyMessageSchema.safeParse(message);
  }

  static validateRoomJoinedMessageSchema(message: roomJoinedMessage) {
    return roomJoinedMessageSchema.safeParse(message);
  }

  static validateUpdatedTimerMessage(message: updatedTimerMessage) {
    return updatedTimerMessageSchema.safeParse(message);
  }
}
