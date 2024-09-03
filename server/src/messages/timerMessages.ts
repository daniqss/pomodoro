import { Socket } from "socket.io";
import { updatedTimerMessage } from "../../../types/messages.js";

class TimerServerMessages {
  static timerUpdated(socket: Socket, updatedTimer: updatedTimerMessage) {
    socket.to(updatedTimer.room).emit("timer-updated", updatedTimer);
  }
}

export default TimerServerMessages;
