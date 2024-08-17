import { useContext } from "react";
import { WsContext, WsContextType } from "../contexts/ws";

function ConnectionData() {
  const { room } = useContext(WsContext) as WsContextType;

  return (
    <section className="flex flex-col justify-between items-center mx-60 mt-12 text-gray-800 text-center rounded">
      <h3 className="text-white text-xl text-bold">
        Connected successfully to room <b>{room}</b>
      </h3>
    </section>
  );
}

export default ConnectionData;
