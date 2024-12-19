import express from "express";
import { Server } from "socket.io";
import { createServer } from "node:http";
import debug from "./utils/debug.js";
import {
  createRoomMessage,
  joinRoomMessage,
} from "../../shared/types/messages.js";
import { updatedTimerMessage } from "../../shared/types/timer.js";
import MessageValidator from "../../shared/schemas/messageValidation.js";
import RoomServerMessages from "./messages/roomMessages.js";
import TimerServerMessages from "./messages/timerMessages.js";
const PORT = process.env.PORT ?? 3000;
const HOST_ADDRESS = process.env.HOST_ADDRESS ?? "localhost";
import cors from "cors";
import UserValidator from "../../shared/schemas/userValidation.js";

// create the server
const app = express();
app.use(cors({ origin: "*" }));
const server = createServer(app);
const io = new Server(server, { cors: { origin: "*" } });

// save in server memory a set of rooms
const rooms = new Set<string>();

// save in server memory a hashmap of key: client id and value: their name
// users will provide their name on room creation or joining a room
const usersNames = new Map<string, string>();

// debug endpoint
app.get("/rooms", (_req, res) => {
  const roomsUsers = [];
  for (const room of rooms) {
    const users = Array.from(io.sockets.adapter.rooms.get(room));
    roomsUsers.push({ room, users });
  }
  debug(roomsUsers);
  res.json(roomsUsers);
});

app.get("/users", (_req, res) => {
  debug(usersNames);
  res.json(usersNames);
});

// socket.io connection
io.on("connection", async (socket) => {
  debug(`socket ${socket.id} connected`);

  // room messages
  socket.on("create-room", async (message: createRoomMessage) => {
    const result = UserValidator.validateUser(message);
    if (!result.success) {
      debug(result.error);
      return;
    }
    const newRoom = RoomServerMessages.createRoom(socket);
    usersNames.set(result.data.id, result.data.name);
    rooms.add(newRoom);
  });

  socket.on("join-room", async (message: joinRoomMessage) => {
    const result = MessageValidator.validateJoinRoomMessage(message);
    if (!result.success) {
      debug(result.error);
      return;
    }

    usersNames.set(result.data.user.id, result.data.user.name);
    RoomServerMessages.joinRoom(
      socket,
      result.data as joinRoomMessage,
      usersNames,
      io.sockets.adapter.rooms.get(message.room),
    );
  });

  // timer messages
  socket.on("timer-updated", async (updatedTimer: updatedTimerMessage) => {
    const result = MessageValidator.validateUpdatedTimerMessage(updatedTimer);
    if (!result.success) {
      debug(result.error);
      return;
    }

    TimerServerMessages.timerUpdated(
      socket,
      result.data as updatedTimerMessage,
    );
  });

  // todo messages
  socket.on("emit-todo", async (message) => {
    const result = UserValidator.validateTodoMessage(message);
    if (!result.success) {
      debug(result.error);
      return;
    }

    socket.to(message.room).emit("receive-todo", message);
  });

  socket.on("disconnecting", async () => {
    // we must use async here because the socket.rooms will be empty
    // if we don't wait enough, so async + copy the socket rooms
    // to be able to communicate with the rest of the users of the room
    const userRooms = new Set(socket.rooms);
    for (const room of userRooms) {
      if (room === socket.id) continue;
      const emptyRoom = RoomServerMessages.userDisconnect(
        socket,
        room,
        io.sockets.adapter.rooms.get(room),
      );

      if (emptyRoom) rooms.delete(room);
    }
  });
});

// server listening in PORT or 3000
server.listen(PORT, () => {
  console.log(`Server running on http://${HOST_ADDRESS}:${PORT}`);
});
