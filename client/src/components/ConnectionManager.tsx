import ConnectionMenu from "./ConnectionMenu";
import ConnectionData from "./ConnectionData";
import { useContext, useEffect, useState } from "react";
import { WsContext, WsContextType } from "../contexts/ws";
import { userJoinedMessage } from "../../../types/messages";

function ConnectionManager() {
  const { socket } = useContext(WsContext) as WsContextType;
  const [isConnected, setIsConnected] = useState(false);
  const [users, setUsers] = useState<string[]>([]);

  useEffect(() => {
    const handleUserJoined = (userJoinedMessage: userJoinedMessage) => {
      setUsers((prev) => {
        if (prev[0] === undefined) {
          return [socket.id, userJoinedMessage];
        }
        return [...prev, userJoinedMessage];
      });
    };

    socket.on("user-joined", handleUserJoined);

    return () => {
      socket.off("user-joined", handleUserJoined);
    };
  }, [socket]);

  useEffect(() => {
    console.log("users updated", users); // Esto reflejará el estado actualizado
  }, [users]); // Este useEffect se ejecuta cuando `users` cambia

  return (
    <section>
      {!isConnected ? (
        <ConnectionMenu setIsConnected={setIsConnected} setUsers={setUsers} />
      ) : (
        <ConnectionData users={users} />
      )}
    </section>
  );
}

export default ConnectionManager;