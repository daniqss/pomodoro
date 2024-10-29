import express from "express";
import { Server } from "socket.io";
import { createServer } from "node:http";
import debug from "./utils/debug.js";
import { joinRoomMessage, updatedTimerMessage } from "../../types/messages.js";
import RoomServerMessages from "./messages/roomMessages.js";
import TimerServerMessages from "./messages/timerMessages.js";
const PORT = process.env.PORT ?? 3000;
const HOST_ADDRESS = process.env.HOST_ADDRESS ?? "localhost";
import cors from "cors";

// create the server
const app = express();
app.use(cors({ origin: "*" }));
const server = createServer(app);
const io = new Server(server, {
  cors: { origin: "*" },
  transports: ["websocket"],
});

// save the rooms in memory
let rooms: Set<string> = new Set();

// debug endpoint
app.get("/rooms", (req, res) => {
  // if (process.env.NODE_ENV !== "development") {
  //   res.status(404).send("Not found");
  //   return;
  // }

  const roomsUsers = [];
  for (const room of rooms) {
    const users = Array.from(io.sockets.adapter.rooms.get(room));
    roomsUsers.push({ room, users });
  }
  debug(roomsUsers);
  res.json(roomsUsers);
});

// socket.io connection
io.on("connection", async (socket) => {
  debug(`socket ${socket.id} connected`);

  // room messages
  socket.on("create-room", async () => {
    const newRoom = RoomServerMessages.createRoom(socket);
    rooms.add(newRoom);
  });

  socket.on("join-room", async (room: joinRoomMessage) =>
    RoomServerMessages.joinRoom(
      socket,
      room,
      io.sockets.adapter.rooms.get(room),
    ),
  );

  // timer messages
  socket.on("timer-updated", async (updatedTimer: updatedTimerMessage) =>
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
