import { room } from "./messages.js";

export type todo = {
  owner: string;
  title: string;
  completed: boolean;
};

export enum todoMessageType {
  Create,
  Remove,
  Update,
}

export type todoMessage = {
  todo: todo;
  room: string;
  type: todoMessageType;
};

export type sendUpdatedTodosMessage = {
  newUserId: string;
  todos: todo[];
};
export type getTodosMessage = room;
