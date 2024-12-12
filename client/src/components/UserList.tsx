import { useContext, useState } from "react";
import { todo, user } from "../../../shared/types/user";
import { WsContext, WsContextType } from "../contexts/ws";
import UserElement from "./UserElement";

export default function UserList({ users }: { users: user[] }) {
  const { userName, socket } = useContext(WsContext) as WsContextType;
  const [todos, setTodos] = useState<todo[]>([]);

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
