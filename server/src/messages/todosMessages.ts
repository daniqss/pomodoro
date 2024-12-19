import { Socket } from "socket.io";
import debug from "../utils/debug.js";
import TodoValidator from "../../../shared/schemas/todoValidator.js";
import {
  getTodosMessage,
  sendUpdatedTodosMessage,
} from "../../../shared/types/todo.js";

class TodosServerMessages {
  static sendUpdatedTodos(
    socket: Socket,
    updatedTodos: sendUpdatedTodosMessage,
  ) {
    debug(updatedTodos);
    const result = TodoValidator.validateUpdatedTodosMessage(updatedTodos);
    if (!result.success) {
      debug(result.error);
      return;
    }

    socket.to(updatedTodos.newUserId).emit("send-updated-todos", updatedTodos);
  }

  static getTodos(socket: Socket, room: getTodosMessage) {
    socket.to(room).emit("get-todos", socket.id);
  }
}

export default TodosServerMessages;
