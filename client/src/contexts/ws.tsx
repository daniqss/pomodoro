import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useState,
} from "react";
import io from "socket.io-client";

export type WsContextType = {
  room: string | null;
  setRoom: Dispatch<SetStateAction<string | null>>;
  socket: SocketIOClient.Socket;
};

// ns q esta pasando
fetch("http://localhost:3000/rooms")
  .then((res) => res.json())
  .then(console.log);

const WsContext = createContext<WsContextType | null>(null);
const socket = io("/", {
  autoConnect: false,
  transports: ["websocket"],
});
socket.connect();

function WsProvider({ children }: { children: ReactNode }) {
  const [room, setRoom] = useState<string | null>(null);

  // useEffect(() => {
  //   socket.connect();

  //   return () => {
  //     if (socket.connected) socket.disconnect();
  //     else socket.connect();
  //   };
  // }, [socket]);

  return (
    <WsContext.Provider
      value={{
        room,
        setRoom,
        socket,
      }}
    >
      {children}
    </WsContext.Provider>
  );
}

export { WsContext, WsProvider };
