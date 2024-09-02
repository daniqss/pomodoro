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

app.get("/rooms/", (req, res) => {
  res.send("xd");
});

io.on("connection", (socket) => {
  debug(`socket ${socket.id} connected`);

  // room messages
  socket.on("create-room", () => RoomServerMessages.createRoom(socket));
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

  socket.on("disconnect", () => RoomServerMessages.userDisconnect(socket));
});

server.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
