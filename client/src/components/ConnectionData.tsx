import { useContext, useState } from "react";
import { WsContext, WsContextType } from "../contexts/ws";
import ClipboardIcon from "./icons/clipboardIcon";
import { user } from "../../../types/messages";

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
      <h3 className="text-white text-2xl font-bold mb-2">
        Connected successfully!
      </h3>
      <p className="text-gray-400 mb-6">
        Share this room name with your partners to start working!
      </p>

      <div className="bg-zinc-700 rounded-lg p-4 mb-6">
        <h4 className="text-white text-lg mb-2">Room name:</h4>
        <div className="flex items-center justify-center bg-zinc-600 rounded-md">
          <p className="px-3 py-2 text-white">{room}</p>
          <button
            className="px-3 py-2 hover:bg-zinc-500 rounded-r-md transition duration-150 ease-in-out focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50"
            onClick={copyToClipboard}
          >
            <ClipboardIcon className="w-5 h-5 text-white" />
          </button>
        </div>
        {copied && (
          <p className="text-green-400 mt-2 text-sm">Copied to clipboard!</p>
        )}
      </div>

      {users.length > 1 ? (
        <div>
          <h3 className="text-white text-xl font-semibold mb-3">
            Connected partners:
          </h3>
          <ul className="text-gray-300 space-y-1">
            {users.map((user, index) => (
              <li key={index} className="bg-zinc-700 rounded-md py-2 px-3">
                {index === 0 ? (
                  <span>
                    <p className="font-semibold">You:</p> {user.id} {user.name}
                  </span>
                ) : (
                  <span>
                    {user.id} {user.name}
                  </span>
                )}
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <h3 className="text-white text-xl font-semibold">
          Waiting for partners to join...
        </h3>
      )}
    </section>
  );
}
export default ConnectionData;
