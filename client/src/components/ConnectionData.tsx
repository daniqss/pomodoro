import { useContext } from "react";
import { WsContext, WsContextType } from "../contexts/ws";
import ClipboardIcon from "./icons/clipboardIcon";

function ConnectionData({ users }: { users: string[] }) {
  const { room } = useContext(WsContext) as WsContextType & { room: string };

  return (
    <section className="mx-60 mt-12 text-gray-800 text-center rounded">
      <h3 className="text-white text-3xl">Connected successfully!</h3>
      <p className="text-white text-lg">
        Share this room name with your partners to start working!
      </p>

      <article className="inline-flex items-center justify-center w-auto bg-white rounded-lg text-zinc-950 p-2 shadow-lg min-h-4 m-auto mt-5">
        <h4 className="text-xl mr-4">Room name:</h4>
        <div className="text-white rounded-md flex flex-row bg-zinc-800">
          <p className="px-2 py-1">{room}</p>
          <button
            className="px-3 py-1 hover:bg-zinc-600 rounded"
            onClick={() => navigator.clipboard.writeText(room)}
          >
            <ClipboardIcon />
          </button>
        </div>
      </article>

      {users.length > 1 ? (
        <div className="mt-5">
          <h3 className="text-white text-2xl">Connected partners:</h3>
          <ul className="text-white text-lg">
            {users.map((user, index) =>
              index === 0 ? (
                <li key={index}>
                  <b>you</b>: {user}
                </li>
              ) : (
                <li key={index}>{user}</li>
              ),
            )}
          </ul>
        </div>
      ) : (
        <h3 className="text-white text-2xl">Waiting for partners to join...</h3>
      )}
    </section>
  );
}
export default ConnectionData;
