import Timer from "./components/Timer";
import Header from "./components/Header";
import ConnectionManager from "./components/ConnectionManager";

function App() {
  return (
    <>
      <main className="lg:mx-12">
        <Header />
        <Timer />
        <ConnectionManager />
      </main>
    </>
  );
}

export default App;
