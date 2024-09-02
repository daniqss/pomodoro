class TimerServerMessages {
  static timerUpdated(socket, updatedTimer) {
    socket.broadcast.emit("timer-updated", updatedTimer);
  }
}

export default TimerServerMessages;
