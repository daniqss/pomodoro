import z from "zod";
import {
  todo,
  todoMessage,
  todoMessageType,
  sendUpdatedTodosMessage,
} from "../types/todo.js";

export const todoSchema = z.object({
  owner: z.string(),
  title: z.string(),
  completed: z.boolean(),
});

export const todoMessageSchema = z.object({
  todo: todoSchema,
  type: z.nativeEnum(todoMessageType),
});

export const updatedTodosMessageSchema = z.object({
  newUserId: z.string(),
  todos: z.array(todoSchema),
});

export default class TodoValidator {
  static validateTodo(todo: todo) {
    return todoSchema.safeParse(todo);
  }

  static validateTodoMessage(todoMessage: todoMessage) {
    return todoMessageSchema.safeParse(todoMessage);
  }

  static validateUpdatedTodosMessage(message: sendUpdatedTodosMessage) {
    return updatedTodosMessageSchema.safeParse(message);
  }
}
