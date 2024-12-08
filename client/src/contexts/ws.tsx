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
  userName: string;
  setRoom: Dispatch<SetStateAction<string | null>>;
  setUserName: Dispatch<SetStateAction<string>>;
  socket: SocketIOClient.Socket;
};

const WsContext = createContext<WsContextType | null>(null);
const socket = io("/");

function WsProvider({ children }: { children: ReactNode }) {
  const [room, setRoom] = useState<string | null>(null);
  const [userName, setUserName] = useState<string>(
    sessionStorage.getItem("name") ?? "",
  );

  return (
    <WsContext.Provider
      value={{
        room,
        userName,
        setRoom,
        setUserName,
        socket,
      }}
    >
      {children}
    </WsContext.Provider>
  );
}

export { WsContext, WsProvider };
