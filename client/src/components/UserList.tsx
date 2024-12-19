import { useContext, useEffect, useState } from "react";
import { user } from "../../../shared/types/user";
import { todo, todoMessage, todoMessageType } from "../../../shared/types/todo";
import { WsContext, WsContextType } from "../contexts/ws";
import UserElement from "./UserElement";
import UserValidator from "../../../shared/schemas/userValidation";

export default function UserList({ users }: { users: user[] }) {
  const { userName, socket } = useContext(WsContext) as WsContextType;
  const [todos, setTodos] = useState<todo[]>([]);

  // receive new todos
  useEffect(() => {
    socket.on("receive-todo", (message: todoMessage) => {
      const result = UserValidator.validateTodoMessage(message);
      if (!result.success) {
        console.error(result.error);
        return;
      }

      const validatedMessage = result.data;
      switch (validatedMessage.type) {
        case todoMessageType.Create:
          setTodos((prev) => [...prev, validatedMessage.todo]);
          break;
        case todoMessageType.Remove:
          setTodos((prev) =>
            prev.filter((t) => t.title !== validatedMessage.todo.title),
          );
          break;
        case todoMessageType.Update:
          setTodos((prev) =>
            prev.map((t) =>
              t.title === validatedMessage.todo.title
                ? validatedMessage.todo
                : t,
            ),
          );
          break;
        default:
          console.error("Invalid todo message type");
      }
    });

    return () => {
      socket.off("receive-todo");
    };
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
