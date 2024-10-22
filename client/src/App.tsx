import Timer from "./components/Timer";
import Header from "./components/Header";
import ConnectionManager from "./components/ConnectionManager";
import TodoList from "./components/TodoList";

function App() {
  return (
    <>
      <Header>Pomodoro!</Header>
      <main className="mx-6 sm:mx-40 md:mx-60 lg:mx-72 relative">
        <Timer />
        <ConnectionManager />
        <TodoList />
      </main>
    </>
  );
}

export default App;
