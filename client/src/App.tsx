import Timer from "./components/Timer";
import Header from "./components/Header";
import ConnectionManager from "./components/ConnectionManager";
import TodoList from "./components/TodoList";

function App() {
  return (
    <>
      <Header />
      <main className="mx-72 text-zinc-800">
        <Timer />
        <ConnectionManager />
        <TodoList />
      </main>
    </>
  );
}

export default App;
