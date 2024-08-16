import { createContext, Dispatch, ReactNode, SetStateAction, useState  } from "react";
import io from 'socket.io-client';

export type WsContextType = {
    room: string | null;
    setRoom: Dispatch<SetStateAction<string | null>>;
    socket: SocketIOClient.Socket;
}

const WsContext = createContext<WsContextType | null>(null);
const socket = io('/');

function WsProvider({ children }: { children: ReactNode }) {
    const [room, setRoom] = useState<string | null>(null);

    return (
        <WsContext.Provider value={{
            room, setRoom,
            socket
        }}>
            {children}
        </WsContext.Provider>
    );
}

export { WsContext, WsProvider };