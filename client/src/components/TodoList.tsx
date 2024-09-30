import { useContext, useEffect, useState } from "react";
import { WsContext, WsContextType } from "../contexts/ws";

type TodoType = {
  id: number;
  addedBy: string;
  title: string;
  completed: boolean;
};

type TodoElementProps = {
  todo: TodoType;
  handleCheck: (todo: TodoType) => void;
  handleEdit: (todo: TodoType) => void;
  handleRemove: () => void;
};

function TodoElement({
  todo,
  handleCheck,
  handleEdit,
  handleRemove,
}: TodoElementProps) {
  return (
    <article className="flex flex-row justify-between items-center bg-zinc-600 px-6 rounded-lg shadow-lg my-2">
      <div className="flex flex-col">
        <span
          className={`text-lg mt-1 ${todo.completed ? "line-through text-muted-foreground" : ""}`}
        >
          {todo.title}
        </span>
        <span className="text-gray-400 text-xs pl-2 pb-2">{todo.addedBy}</span>
      </div>
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={() => handleCheck({ ...todo, completed: !todo.completed })}
        className="rounded-lg"
      />
      <button
        onClick={() =>
          handleEdit({
            ...todo,
            title: prompt("Edit todo", todo.title) || todo.title,
          })
        }
        className="bg-zinc-700 text-white p-2 rounded-lg"
      >
        Edit
      </button>
      <button
        onClick={handleRemove}
        className="bg-zinc-700 text-white p-2 rounded-lg"
      >
        Remove
      </button>
    </article>
  );
}

function TodoList() {
  const { socket } = useContext(WsContext) as WsContextType;
  const [todos, setTodos] = useState<TodoType[]>([]);

  // mock data
  useEffect(() => {
    setTodos([
      {
        id: 1,
        addedBy: "John Doe",
        title: "Buy milk",
        completed: false,
      },
      {
        id: 2,
        addedBy: "Jane Doe",
        title: "Buy eggs",
        completed: false,
      },
      {
        id: 3,
        addedBy: "John Doe",
        title: "Buy bread",
        completed: false,
      },
    ]);
  }, []);

  // const addTodo = (todo: TodoType) => {
  //   setTodos([...todos, todo]);
  //   socket.emit("add-todo", todo);
  // };

  const updateTodo = (id: number, updatedTodo: TodoType) => {
    const updatedTodos = todos.map((todo) => {
      if (todo.id === id) {
        return updatedTodo;
      }
      return todo;
    });
    setTodos(updatedTodos);
    socket.emit("update-todo", updatedTodo);
  };

  const removeTodo = (id: number) => {
    setTodos(todos.filter((todo) => todo.id !== id));
    socket.emit("remove-todo", id);
  };

  useEffect(() => {
    socket.on("add-todo", (todo: TodoType) => setTodos([...todos, todo]));

    return () => {
      socket.off("add-todo");
    };
  }, [socket, todos, setTodos]);

  // useEffect(() => {}, []);

  return (
    <section className="my-3 text-white ">
      {todos.map((todo) => {
        return (
          <div key={todo.id} className="todo">
            <TodoElement
              key={todo.id}
              todo={todo}
              handleCheck={(updatedTodo) => updateTodo(todo.id, updatedTodo)}
              handleEdit={(updatedTodo) => updateTodo(todo.id, updatedTodo)}
              handleRemove={() => removeTodo(todo.id)}
            />
          </div>
        );
      })}
    </section>
  );
}

export default TodoList;
