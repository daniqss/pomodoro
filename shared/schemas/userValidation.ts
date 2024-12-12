import z from "zod";
import { user, todo } from "../types/user.js";

export const userSchema = z.object({
  id: z.string(),
  name: z.string(),
});

export const todoSchema = z.object({
  owner: z.string(),
  title: z.string(),
  completed: z.boolean(),
});

export default class UserValidator {
  static validateUser(user: user) {
    return userSchema.safeParse(user);
  }

  static validateTodo(todo: todo) {
    return todoSchema.safeParse(todo);
  }
}
