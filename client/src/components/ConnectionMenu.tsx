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
    <section className="flex flex-col text-gray-800 text-center whitespace-nowrap rounded">
      <h3 className="text-white text-lg">Join your friends' room</h3>
      <form className="rounded flex flex-row justify-between min-h-4 m-auto max-w-2xl my-2">
        <button
          className="bg-white rounded-lg text-zinc-950 shadow-lg m-auto p-2 lg:m-2"
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
          className="shadow-lg bg-white rounded-lg min-h-4 m-auto p-2 flex-grow mx-2"
        />
      </form>
      <h3 className="text-white text-lg">Or</h3>
      <button
        className="bg-white rounded-lg text-zinc-950 p-2 shadow-lg min-h-4 m-auto my-2"
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
