import { io } from "socket.io-client"
import Timer from "./components/Timer"
import Header from "./components/Header"

const socket = io('/');
socket.on('connect', () => {
  console.log('Connected to server');
})

function App() {


  return (
    <>
      <main className="mx-12">
        <Header/>
        <Timer/>
      </main>
    </>
  )
}

export default App
