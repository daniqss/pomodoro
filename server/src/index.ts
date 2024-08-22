import express from "express";
import { Server } from "socket.io";
import { createServer } from "node:http";
import RoomsController from "./messages/roomMessages.js";
import debug from "./utils/debug.js";
import { joinRoomMessage } from "../../types/messages.js";
import RoomServerMessages from "./messages/roomMessages.js";
const port = process.env.PORT ?? 3000;

const app = express();
const server = createServer(app);
const io = new Server(server);

app.get("/rooms/", (req, res) => {
  res.send("xd");
});

io.on("connection", (socket) => {
  debug(`socket ${socket.id} connected`);
  socket.on("create-room", () => RoomServerMessages.createRoom(socket));
  socket.on("join-room", (room: joinRoomMessage) =>
    RoomServerMessages.joinRoom(
      socket,
      room,
      io.sockets.adapter.rooms.get(room),
    ),
  );

  socket.on("disconnect", () => RoomServerMessages.userDisconnect(socket));
});

server.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
