import { useContext, useState } from "react";
import { WsContext, WsContextType } from "../contexts/ws";
import { roomCreatedMessage, roomJoinedMessage } from "../../../types/messages";

type ConnectionMenuProps = {
  setUsers: React.Dispatch<React.SetStateAction<string[]>>;
  setIsConnected: React.Dispatch<React.SetStateAction<boolean>>;
};

function ConnectionMenu({ setIsConnected, setUsers }: ConnectionMenuProps) {
  const { socket, setRoom } = useContext(WsContext) as WsContextType;
  const [joinValue, setJoinValue] = useState("");

  return (
    <section className="flex flex-col justify-between items-center mx-60 mt-12 text-gray-800 text-center rounded">
      <h3 className="text-white text-lg">Join your friends' room</h3>
      <form className="rounded flex flex-row">
        <button
          className="bg-white rounded-lg text-zinc-950 p-2 shadow-lg min-h-4 m-auto mt-5"
          onClick={(e) => {
            e.preventDefault();
            socket.emit("join-room", joinValue);
            socket.on("room-joined", (roomData: roomJoinedMessage) => {
              if (typeof roomData === "string") {
                console.error(`Error joining room: ${roomData}`);
                return;
              }

              setRoom(roomData.room);
              console.log(`Room joined:`, roomData.users);
              setUsers((prev) => {
                if (prev[0] === undefined) {
                  return [
                    socket.id,
                    ...roomData.users.filter((user) => user !== socket.id),
                  ];
                }
                return roomData.users;
              });
              setIsConnected(true);
            });
          }}
        >
          Join Room
        </button>
        <input
          type="text"
          name="roomName"
          id="roomName"
          onChange={(e) => {
            e.preventDefault();
            setJoinValue(e.target.value);
          }}
          placeholder="Room's code"
          className="p-2 shadow-lg bg-white rounded-lg min-h-4 md:m-5 m-2"
        />
      </form>
      <h3 className="text-white text-lg">Or</h3>
      <button
        className="bg-white rounded-lg text-zinc-950 p-2 shadow-lg min-h-4 m-auto mt-5"
        onClick={() => {
          console.log("Creating room");
          socket.emit("create-room");
          socket.on("room-created", (room: roomCreatedMessage) => {
            console.log(`Room created: ${room}`);
            setRoom(room);
          });
          setIsConnected(true);
        }}
      >
        Create Room
      </button>
    </section>
  );
}

export default ConnectionMenu;
