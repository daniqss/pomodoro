import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import { Server } from "socket.io";
import { createServer } from "node:http";
import debug from "./utils/debug.js";
import {
  joinRoomMessage,
  receiveTimerMessage,
  updatedTimerMessage,
} from "../../types/messages.js";
import RoomServerMessages from "./messages/roomMessages.js";
import TimerServerMessages from "./messages/timerMessages.js";
const PORT = process.env.PORT ?? 3000;
const HOST_ADDRESS = process.env.HOST_ADDRESS ?? "localhost";

// create the server
const app = express();
const server = createServer(app);
const io = new Server(server);

// middleware to serve the static files
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootPath = path.resolve(__dirname, "dist/../../../");
app.use(express.static(path.join(rootPath, "client/")));

// save the rooms in memory
let rooms: Set<string> = new Set();

// serve the client build
app.get("/", (req, res) => {
  res.sendFile(path.join(rootPath, "client/index.html"));
});

// debug endpoint
app.get("/rooms", (req, res) => {
  const roomsUsers = [];
  for (const room of rooms) {
    const users = Array.from(io.sockets.adapter.rooms.get(room));
    roomsUsers.push({ room, users });
  }
  debug(roomsUsers);
  res.json(roomsUsers);
});

// socket.io connection
io.on("connection", (socket) => {
  debug(`socket ${socket.id} connected`);

  // room messages
  socket.on("create-room", () => {
    const newRoom = RoomServerMessages.createRoom(socket);
    rooms.add(newRoom);
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
