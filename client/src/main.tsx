import { TimerProvider } from "./contexts/timer.tsx";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { WsProvider } from "./contexts/ws.tsx";
import React from "react";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <WsProvider>
      <TimerProvider>
        <App />
      </TimerProvider>
    </WsProvider>
  </React.StrictMode>,
);
