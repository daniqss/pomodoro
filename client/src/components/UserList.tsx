import { useContext, useEffect, useState } from "react";
import { user } from "../../../shared/types/user";
import { todo } from "../../../shared/types/todo";
import { WsContext, WsContextType } from "../contexts/ws";
import UserElement from "./UserElement";
import UserValidator from "../../../shared/schemas/userValidation";

export default function UserList({ users }: { users: user[] }) {
  const { userName, socket } = useContext(WsContext) as WsContextType;
  const [todos, setTodos] = useState<todo[]>([]);

  // receive new todos
  useEffect(() => {
    socket.on("todos-updated", (newTodo: todo) => {
      const result = UserValidator.validateTodo(newTodo);
      if (!result.success) {
        console.error(result.error);
        return;
      }
      setTodos((prev) => [...prev, newTodo]);
    });
  }, [socket]);

  return (
    <ul className="bg-zinc-700 rounded-md  space-y-2 py-1 flex flex-col">
      {users.map((user, index) => (
        <li key={index} className="py-2 px-3">
          {index === 0 ? (
            <UserElement
              user={{ id: socket.id, name: userName }}
              userTodos={todos.filter((todo) => todo.owner === user.id)}
              setTodos={setTodos}
            />
          ) : index === users.length - 1 ? (
            <UserElement
              user={user}
              userTodos={todos.filter((todo) => todo.owner === user.id)}
              setTodos={setTodos}
            />
          ) : (
            <UserElement
              user={user}
              userTodos={todos.filter((todo) => todo.owner === user.id)}
              setTodos={setTodos}
            />
          )}
        </li>
      ))}
    </ul>
  );
}
