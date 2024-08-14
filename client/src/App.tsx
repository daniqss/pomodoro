import Timer from "./components/Timer"
import Header from "./components/Header"
import ConnectionMenu from "./components/ConnectioMenu"

function App() {
  return (
    <>
      <main className="mx-12">
        <Header/>
        <Timer/>
        <ConnectionMenu/>
      </main>
    </>
  )
}

export default App
