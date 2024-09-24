import { Socket } from "socket.io";
import {
  getTimerMessage,
  receiveTimerMessage,
  updatedTimerMessage,
} from "../../../types/messages.js";
import { debug } from "console";

class TimerServerMessages {
  static timerUpdated(socket: Socket, updatedTimer: updatedTimerMessage) {
    debug(updatedTimer);
    socket.to(updatedTimer.room).emit("timer-updated", updatedTimer);
  }

  static getTimer(socket: Socket, room: getTimerMessage) {
    const selfSocketId: getTimerMessage = socket.id;
    socket.to(room).emit("get-timer", selfSocketId);
  }
}

export default TimerServerMessages;
