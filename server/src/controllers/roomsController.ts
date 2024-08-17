import { v4 as uuid } from "uuid";
import { Socket } from "socket.io";
import { Response } from "express";
import debug from "../utils/debug.js";
import {
  createRoomMessage,
  joinRoomMessage,
  roomCreatedMessage,
  roomJoinedMessage,
} from "../../../types/messages.js";
type Room = string;

export default class RoomsController {
  rooms: Record<Room, string[]>;

  constructor() {
    this.rooms = {};
  }

  getRooms(res: Response<any, Record<string, any>>) {
    debug(`GET /rooms\n${JSON.stringify(this.rooms)}`);
    res.json(this.rooms);
  }

  createRoom(socket: Socket) {
    const roomId = uuid();
    debug(`socket ${socket.id} created room ${roomId}`);
    socket.join(roomId);
    socket.emit("room-created", roomId);
    this.addRoom(roomId, socket.id);
  }

  joinRoom(socket: Socket, room: joinRoomMessage) {
    debug(`socket ${socket.id} joined room ${room}`);
    if (!room) {
      debug("room is undefined");
      socket.emit("room-joined", "Error: room is undefined");
      return;
    }

    const currentRoom = this.rooms[room];
    socket.join(room);

    if (currentRoom) {
      currentRoom.push(socket.id);
      socket.to(room).emit("room-joined", currentRoom);
      socket.emit("room-joined", currentRoom);
    }
  }

  disconnectUser(socket: Socket) {
    debug(`socket ${socket.id} disconnected`);

    for (const room in this.rooms) {
      const currentRoom = this.rooms[room];
      const index = currentRoom.findIndex((id) => id === socket.id);
      if (index !== -1) {
        currentRoom.splice(index, 1);
        if (currentRoom.length === 0) {
          this.removeRoom(room);
        }
      }
    }
  }

  addRoom(roomId: string, ownerId: string) {
    this.rooms[roomId] = [];
    this.rooms[roomId].push(ownerId);
  }

  removeRoom(roomId: string) {
    debug(`room ${roomId} removed`);
    delete this.rooms[roomId];
  }
}
