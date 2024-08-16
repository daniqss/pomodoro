import Timer from "./components/Timer"
import Header from "./components/Header"
import ConnectionMenu from "./components/ConnectionMenu"
import { useState } from "react";

function App() {
  const [isConnected, setIsConnected] = useState(false);

  return (
    <>
      <main className="mx-12">
        <Header/>
        <Timer/>
        {
          !isConnected ? (
            <ConnectionMenu setIsConnected={setIsConnected}/>
          ) : (
            <p>Connected</p>
          )
        }
      </main>
    </>
  )
}

export default App
