import { v4 as uuid } from "uuid";
import { Socket } from "socket.io";
import debug from "../utils/debug.js";
import {
  roomCreatedMessage,
  roomJoinedMessage,
  joinRoomMessage,
} from "../../../shared/types/messages.js";
import { user } from "../../../shared/types/user.js";
import TimerServerMessages from "./timerMessages.js";
import TodosServerMessages from "./todosMessages.js";

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
  static joinRoom(
    socket: Socket,
    message: joinRoomMessage,
    usersNames: Map<string, string>,
    currentUsers: Set<string>,
  ) {
    if (!currentUsers) {
      debug(`Room ${message.room} does not exist`);
      socket.emit("room-joined", "Room does not exist");
      return;
    }
    socket.join(message.room);

    const roomMessage: roomJoinedMessage = {
      room: message.room,
      users: Array.from(currentUsers).map(
        (id): user =>
          id === socket.id
            ? message.user
            : { id: id, name: usersNames.get(id) },
      ),
    };
    debug(roomMessage);

    TimerServerMessages.getTimer(socket, message.room);
    TodosServerMessages.getTodos(socket, message.room);

    socket.emit("room-joined", roomMessage);
    debug(
      `User ${message.user.id} ${message.user.name} joined room ${message.room}`,
    );
    socket
      .to(message.room)
      .emit("user-joined", { id: socket.id, name: message.user.name });
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
