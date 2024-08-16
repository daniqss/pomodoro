import { createContext, Dispatch, ReactNode, SetStateAction, useState  } from "react";
import io from 'socket.io-client';

export type WsContextType = {
    isConnected: boolean;
    setIsConnected: Dispatch<SetStateAction<boolean>>;
    room: string | null;
    setRoom: Dispatch<SetStateAction<string | null>>;
    socket: SocketIOClient.Socket;
}

const WsContext = createContext<WsContextType | null>(null);

function WsProvider({ children }: { children: ReactNode }) {
    const [isConnected, setIsConnected] = useState(false);
    const [room, setRoom] = useState<string | null>(null);
    const socket = io('/');

    return (
        <WsContext.Provider value={{
            isConnected, setIsConnected,
            room, setRoom,
            socket
        }}>
            {children}
        </WsContext.Provider>
    );
}

export { WsContext, WsProvider };