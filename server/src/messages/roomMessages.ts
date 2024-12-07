import { v4 as uuid } from "uuid";
import { Socket } from "socket.io";
import debug from "../utils/debug.js";
import {
  room,
  user,
  roomCreatedMessage,
  roomJoinedMessage,
} from "../../../types/messages.js";
import TimerServerMessages from "./timerMessages.js";

export default class RoomServerMessages {
  // Server creates the room, join the rooms owner and sends a message to him
  static createRoom(socket: Socket): string {
    const roomId: roomCreatedMessage = uuid();
    socket.join(roomId);
    socket.emit("room-created", roomId);
    return roomId;
  }

  // Server joins the room and sends a message to
  // - the new user, with the rest of the current users of the room
  // - the rest of the users in the room, with the new user
  static joinRoom(socket: Socket, room: room, currentUsers: Set<string>) {
    if (!currentUsers) {
      debug(`Room ${room} does not exist`);
      socket.emit("room-joined", "Room does not exist");
      return;
    }
    socket.join(room);

    const roomMessage: roomJoinedMessage = {
      room: room,
      users: Array.from(currentUsers).map((id): user => ({ id: id, name: id })),
    };
    debug(roomMessage);

    TimerServerMessages.getTimer(socket, room);

    socket.emit("room-joined", roomMessage);
    socket.to(room).emit("user-joined", { id: socket.id, name: socket.id });
  }

  // desconnect a user from a room and notify the rest of the users in the room
  static userDisconnect(
    socket: Socket,
    room: string,
    users: Set<string>,
  ): boolean {
    debug(`User ${socket.id} from room ${room} disconnected`);

    if (users) {
      users.delete(socket.id);
      socket.to(room).emit("user-disconnected", socket.id);
    }

    return !users || users.size === 0;
  }
}
