import { useContext } from "react";
import { user } from "../../../types/messages";
import { WsContext, WsContextType } from "../contexts/ws";
import ProfileIcon from "./icons/profileIcon";

export default function UserList({ users }: { users: user[] }) {
  const { userName, socket } = useContext(WsContext) as WsContextType;

  return (
    <ul className="bg-zinc-700 rounded-md  space-y-2 pt-2 pb-1 flex flex-col">
      {users.map((user, index) => (
        <li key={index} className="py-2 px-3">
          {index === 0 ? (
            <UserElement user={{ id: socket.id, name: userName }} />
          ) : index === users.length - 1 ? (
            <UserElement user={user} />
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
    <article className="flex flex-row items-center space-x-2 overflow-hidden">
      <ProfileIcon className="w-6 h-6 text-gray-400 mr-1 mt-1" />
      <div className="flex flex-col sm:flex-row sm:items-center space-y-1 sm:space-y-0 sm:space-x-2 min-w-0 mt-1">
        {user.id === socket.id ? (
          <h4 className="text-sm font-semibold truncate sm:text-base md:text-lg">
            {user.name}
          </h4>
        ) : (
          <h4 className="text-sm truncate sm:text-base md:text-lg">
            {user.name}
          </h4>
        )}
        {user.id !== user.name && (
          <p className="text-xs text-gray-400 truncate sm:text-[8px] md:text-xs pt-1 hidden md:inline">
            {user.id}
          </p>
        )}
      </div>
    </article>
  );
}
