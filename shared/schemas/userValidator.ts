import z from "zod";
import { user } from "../types/user.js";
import { todo, todoMessage, todoMessageType } from "../types/todo.js";

export const userSchema = z.object({
  id: z.string(),
  name: z.string(),
});

export const todoSchema = z.object({
  owner: z.string(),
  title: z.string(),
  completed: z.boolean(),
});

export const todoMessageSchema = z.object({
  todo: todoSchema,
  type: z.nativeEnum(todoMessageType),
});

export default class UserValidator {
  static validateUser(user: user) {
    return userSchema.safeParse(user);
  }

  static validateTodo(todo: todo) {
    return todoSchema.safeParse(todo);
  }

  static validateTodoMessage(todoMessage: todoMessage) {
    return todoMessageSchema.safeParse(todoMessage);
  }
}
