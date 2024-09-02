import ConnectionMenu from "./ConnectionMenu";
import ConnectionData from "./ConnectionData";
import { useContext, useEffect, useState } from "react";
import { WsContext, WsContextType } from "../contexts/ws";
import { userJoinedMessage } from "../../../types/messages";

function ConnectionManager() {
  const { socket } = useContext(WsContext) as WsContextType;
  const [isConnected, setIsConnected] = useState(false);
  const userId = socket.id;
  const [users, setUsers] = useState<string[]>([userId]);

  // Add the user to the list of users
  // if it's add when we initialize the state
  // the socket may not be connected yet
  useEffect(() => {
    if (socket.id) {
      setUsers([socket.id]);
    }
  }, [socket.id]);

  useEffect(() => {
    const handleUserJoined = (userJoinedMessage: userJoinedMessage) => {
      setUsers((prev) => [...prev, userJoinedMessage]);
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
