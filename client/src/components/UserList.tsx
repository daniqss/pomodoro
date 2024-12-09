import { useContext } from "react";
import { user } from "../../../types/messages";
import { WsContext, WsContextType } from "../contexts/ws";
import ProfileIcon from "./icons/profileIcon";

export default function UserList({ users }: { users: user[] }) {
  const { userName, socket } = useContext(WsContext) as WsContextType;

  return (
    <ul className="bg-zinc-700 rounded-md  space-y-2 pt-2 pb-1">
      {users.map((user, index) => (
        <li key={index} className="py-2 px-3">
          {index === 0 ? (
            <UserElement user={{ id: socket.id, name: userName }} />
          ) : (
            <UserElement user={user} />
          )}
        </li>
      ))}
    </ul>
  );
}

function UserElement({ user }: { user: user }) {
  const { socket } = useContext(WsContext) as WsContextType;
  return (
    <article className="flex flex-row content-center space-x-2">
      <ProfileIcon className="w-6 h-6 text-gray-400 mr-1 mt-1" />
      {user.id === socket.id ? (
        <h4 className="text-xl font-semibold">{user.name}</h4>
      ) : (
        <h4 className="text-xl">{user.name}</h4>
      )}
      <p className="text-xs text-gray-400 pt-3">{user.id}</p>
    </article>
  );
}
