import Timer from "./components/Timer";
import Header from "./components/Header";
import ConnectionManager from "./components/ConnectionManager";

function App() {
  return (
    <>
      <Header>Pomodoro!</Header>
      <main className="lg:mx-60 mx-2 relative">
        <Timer />
        <ConnectionManager />
      </main>
    </>
  );
}

export default App;
