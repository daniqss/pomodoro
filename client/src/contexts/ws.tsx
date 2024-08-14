import { createContext, Dispatch, ReactNode, SetStateAction, useState  } from "react";
import io from 'socket.io-client';

export type WsContextType = {
    isConnected: boolean;
    setIsConnected: Dispatch<SetStateAction<boolean>>;
    socket: SocketIOClient.Socket;
}

const WsContext = createContext<WsContextType | null>(null);

function WsProvider({ children }: { children: ReactNode }) {
    const [isConnected, setIsConnected] = useState(false);
    const socket = io('/');

    return (
        <WsContext.Provider value={{ isConnected, setIsConnected, socket }}>
            {children}
        </WsContext.Provider>
    );
}

export { WsContext, WsProvider };