import express from "express";
import { Server } from "socket.io";
import { createServer } from "node:http";
import RoomsController from "./controllers/roomsController.js";
import debug from "./utils/debug.js";
import { joinRoomMessage } from "../../types/messages.js";
const port = process.env.PORT ?? 3000;

const app = express();
const server = createServer(app);
const io = new Server(server);

const roomController = new RoomsController();

app.get("/rooms/", (req, res) => roomController.getRooms(res));

io.on("connection", (socket) => {
  debug(`socket ${socket.id} connected`);
  socket.on("create-room", () => roomController.createRoom(socket));
  socket.on("join-room", (room: joinRoomMessage) =>
    roomController.joinRoom(socket, room),
  );

  socket.on("disconnect", () => roomController.disconnectUser(socket));
});

server.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
