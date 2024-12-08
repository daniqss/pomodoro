import ConnectionMenu from "./ConnectionMenu";
import ConnectionData from "./ConnectionData";
import { useContext, useEffect, useState } from "react";
import { WsContext, WsContextType } from "../contexts/ws";
import { user, userJoinedMessage } from "../../../types/messages";

function ConnectionManager() {
  const { socket, userName } = useContext(WsContext) as WsContextType;
  const [isConnected, setIsConnected] = useState(false);
  const [users, setUsers] = useState<user[]>([]);

  useEffect(() => {
    const handleUserJoined = (userJoinedMessage: userJoinedMessage) => {
      setUsers((prev) => {
        if (prev.length === 0) {
          return [{ id: socket.id, name: userName }, userJoinedMessage];
        }
        return [...prev, userJoinedMessage];
      });
    };

    socket.on("user-joined", handleUserJoined);

    return () => {
      socket.off("user-joined", handleUserJoined);
    };
  }, [socket, userName]);

  useEffect(() => {
    socket.on("user-disconnected", (userId: string) => {
      setUsers((prev) => prev.filter((user) => user.id !== userId));
    });
  });

  return (
    <section className="mt-4 lg:mt-12">
      {!isConnected ? (
        <ConnectionMenu setIsConnected={setIsConnected} setUsers={setUsers} />
      ) : (
        <ConnectionData users={users} />
      )}
    </section>
  );
}

export default ConnectionManager;
