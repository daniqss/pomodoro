import { useContext, useState } from "react";
import { WsContext, WsContextType } from "../contexts/ws";
import ClipboardIcon from "./icons/clipboardIcon";
import { user } from "../../../types/messages";
import UserList from "./UserList";

function ConnectionData({ users }: { users: user[] }) {
  const { room } = useContext(WsContext) as WsContextType & {
    room: string;
  };
  const [copied, setCopied] = useState(false);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(room);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section className="bg-zinc-800 shadow-lg rounded-lg overflow-hidden p-6 text-center">
      <div className="flex flex-row items-center justify-between pb-2 space-x-2">
        <p className="text-gray-400 text-sm sm:text-sm md:text-base text-start">
          Share this room name with your partners to start working!
        </p>
        {copied && (
          <p className="text-green-400 text-xs sm:text-sm shrink-0">
            Copied to clipboard!
          </p>
        )}
      </div>
      <article className="flex items-stretch bg-zinc-600 rounded-md max-w-full overflow-hidden">
        <p className="px-3 py-2 text-white text-xs sm:text-sm md:text-md lg:text-lg truncate flex-grow min-w-0">
          {room}
        </p>
        <button
          className="px-3 py-2 bg-zinc-600 hover:bg-zinc-500 transition duration-150 ease-in-out focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50 flex items-center justify-center"
          onClick={copyToClipboard}
          aria-label="Copy room name to clipboard"
        >
          <ClipboardIcon className="w-5 h-5 text-white" />
        </button>
      </article>

      <section>
        <h3 className="text-white text-xl text-start font-semibold mt-3 mb-2">
          Connected partners:
        </h3>
        <UserList users={users} />
      </section>
    </section>
  );
}
export default ConnectionData;
