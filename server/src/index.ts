import express from "express";
import { Server } from "socket.io";
import { createServer } from "node:http";
import RoomsController from "./messages/roomMessages.js";
import debug from "./utils/debug.js";
import { joinRoomMessage, updatedTimerMessage } from "../../types/messages.js";
import RoomServerMessages from "./messages/roomMessages.js";
import TimerServerMessages from "./messages/timerMessages.js";
const port = process.env.PORT ?? 3000;

const app = express();
const server = createServer(app);
const io = new Server(server);

const rooms: string[] = [];

app.get("/rooms", (req, res) => {
  const roomsUsers = rooms.map((room) => {
    const users = Array.from(io.sockets.adapter.rooms.get(room));
    return { room, users };
  });
  console.log(roomsUsers);
  res.json(roomsUsers);
});

io.on("connection", (socket) => {
  debug(`socket ${socket.id} connected`);

  // room messages
  socket.on("create-room", () => {
    const newRoom = RoomServerMessages.createRoom(socket);
    rooms.push(newRoom);
  });

  socket.on("join-room", (room: joinRoomMessage) =>
    RoomServerMessages.joinRoom(
      socket,
      room,
      io.sockets.adapter.rooms.get(room),
    ),
  );

  // timer messages
  socket.on("timer-updated", (updatedTimer: updatedTimerMessage) =>
    TimerServerMessages.timerUpdated(socket, updatedTimer),
  );

  socket.on("disconnecting", async () => {
    // we must use async here because the socket.rooms will be empty
    // if we don't wait enough, so async + copy the socket rooms
    // to be able to communicate with the rest of the users of the room
    const rooms = new Set(socket.rooms);

    for (const room of rooms) {
      if (room === socket.id) continue;
      RoomServerMessages.userDisconnect(
        socket,
        room,
        io.sockets.adapter.rooms.get(room),
      );
    }
  });
});

server.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
