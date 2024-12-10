import ConnectionMenu from "./ConnectionMenu";
import ConnectionData from "./ConnectionData";
import { useContext, useEffect, useState } from "react";
import { WsContext, WsContextType } from "../contexts/ws";
import { user, userJoinedMessage } from "../../../shared/types/messages";
import MessageValidator from "../../../shared/schemas/messageValidation";

function ConnectionManager() {
  const { socket, userName } = useContext(WsContext) as WsContextType;
  const [isConnected, setIsConnected] = useState(false);
  const [users, setUsers] = useState<user[]>([]);

  useEffect(() => {
    const handleUserJoined = (userJoinedMessage: userJoinedMessage) => {
      const result = MessageValidator.validateUser(userJoinedMessage);
      if (!result.success) {
        console.error(result.error);
        return;
      }

      setUsers((prev) => {
        if (prev.length === 0) {
          return [{ id: socket.id, name: userName }, result.data];
        }
        return [...prev, result.data];
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
