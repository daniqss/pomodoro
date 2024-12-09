import { useContext, useState, useEffect } from "react";
import { WsContext, WsContextType } from "../contexts/ws";
import {
  roomCreatedMessage,
  roomJoinedMessage,
  user,
} from "../../../types/messages";
import { TimerContext, TimerContextType } from "../contexts/timer";

type ConnectionMenuProps = {
  setUsers: React.Dispatch<React.SetStateAction<user[]>>;
  setIsConnected: React.Dispatch<React.SetStateAction<boolean>>;
};

function ConnectionMenu({ setIsConnected, setUsers }: ConnectionMenuProps) {
  const { isPaused, setIsPaused } = useContext(
    TimerContext,
  ) as TimerContextType;
  const { socket, setRoom, userName, setUserName } = useContext(
    WsContext,
  ) as WsContextType;
  const [joinValue, setJoinValue] = useState("");

  useEffect(() => {
    socket.on("room-joined", (roomData: roomJoinedMessage) => {
      if (typeof roomData === "string") {
        console.error(`Error joining room: ${roomData}`);
        return;
      }

      setRoom(roomData.room);
      setUsers((prev) => {
        if (prev[0] === undefined) {
          return [
            { id: socket.id, name: socket.id },
            ...roomData.users.filter((user) => user.id !== socket.id),
          ];
        }
        return roomData.users;
      });

      setIsPaused(true);
      socket.emit("timer-state-update", { isPaused: true });

      setIsConnected(true);
    });

    socket.on("room-created", (room: roomCreatedMessage) => {
      setRoom(room);
      setIsConnected(true);
    });

    // clean listeners on unmount
    return () => {
      socket.off("room-joined");
      socket.off("room-created");
    };
  }, [socket, setRoom, setUsers, setIsConnected, isPaused, setIsPaused]);

  const handleJoinRoom = (e: React.FormEvent) => {
    e.preventDefault();
    if (userName !== "") sessionStorage.setItem("name", userName);
    if (!joinValue.trim()) return;

    // clean whatever the state was
    setIsPaused(true);
    socket.emit("join-room", {
      room: joinValue,
      user: { id: socket.id, name: userName === "" ? socket.id : userName },
    });
  };

  const handleCreateRoom = () => {
    if (userName !== "") sessionStorage.setItem("name", userName);
    if (userName === "") setUserName(socket.id);
    setUsers([{ id: socket.id, name: userName }]);
    socket.emit("create-room", {
      id: socket.id,
      name: userName === "" ? socket.id : userName,
    });
  };

  return (
    <section className="bg-zinc-800 shadow-lg rounded-lg overflow-hidden">
      <div className="px-6 py-8">
        <h2 className="text-2xl font-bold text-center text-white mb-2">
          Join or Create a Room
        </h2>
        <p className="text-center text-gray-400 mb-6">
          Connect with your friends
        </p>

        <input
          type="text"
          id="userName"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
          placeholder={userName !== "" ? userName : "Enter your username"}
          className="w-full px-4 py-2 bg-zinc-700 text-white border border-zinc-600 rounded-md focus:outline-none focus:ring-2 focus:ring-white focus:border-transparent transition duration-150 ease-in-out placeholder-gray-400"
        />

        <button
          className="w-full my-4 mt-8 bg-zinc-700 text-white py-2 px-4 rounded-md hover:bg-zinc-600 focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50 transition duration-150 ease-in-out"
          onClick={handleCreateRoom}
        >
          Create New Room
        </button>

        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-zinc-600"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-zinc-800 text-gray-400">Or</span>
          </div>
        </div>

        <form onSubmit={handleJoinRoom} className="mt-4">
          <input
            type="text"
            id="roomName"
            value={joinValue}
            onChange={(e) => setJoinValue(e.target.value)}
            placeholder="Enter room code"
            className="w-full px-4 py-2 bg-zinc-700 text-white border border-zinc-600 rounded-md focus:outline-none focus:ring-2 focus:ring-white focus:border-transparent transition duration-150 ease-in-out placeholder-gray-400"
          />
          <button
            type="submit"
            className="w-full mt-4 bg-zinc-600 text-white py-2 px-4 rounded-md hover:bg-zinc-500 focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50 transition duration-150 ease-in-out"
          >
            Join Room
          </button>
        </form>
      </div>
    </section>
  );
}

export default ConnectionMenu;
