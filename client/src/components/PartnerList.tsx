import { useContext, useEffect, useState } from "react";
import { WsContext, WsContextType } from "../contexts/ws";
import { roomJoinedMessage } from "../../../types/messages.ts";

function PartnerList() {
  const { socket } = useContext(WsContext) as WsContextType;
  const [partners, setPartners] = useState<string[]>([]);

  useEffect(() => {
    socket.on("room-joined", (newPartners: roomJoinedMessage) => {
      setPartners(newPartners.currentUsers);
    });

    return () => {
      socket.off("room-joined", (newPartners: roomJoinedMessage) => {
        setPartners(newPartners.currentUsers);
      });
    };
  }, []);

  return (
    <ol>
      {partners.map((partner, index) => (
        <li key={index}>{partner}</li>
      ))}
    </ol>
  );
}

export default PartnerList;
