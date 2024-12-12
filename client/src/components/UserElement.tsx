import { useContext, useState } from "react";
import { WsContext, WsContextType } from "../contexts/ws";
import { user, todo } from "../../../shared/types/user";
import PlusIcon from "./icons/plusIcon";
import RemoveIcon from "./icons/removeIcon";

type UserElementProps = {
  user: user;
  userTodos: todo[];
  setTodos: React.Dispatch<React.SetStateAction<todo[]>>;
};

export default function UserElement({
  user,
  userTodos,
  setTodos,
}: UserElementProps) {
  const { socket } = useContext(WsContext) as WsContextType;
  const [isCreatingTodo, setIsCreatingTodo] = useState(false);

  const handleCreateTodo = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && e.currentTarget.value.trim() !== "") {
      setTodos((prev) => {
        if (prev.some((t) => t.title === e.currentTarget.value.trim()))
          return prev;

        return [
          ...prev,
          {
            title: e.currentTarget.value.trim(),
            owner: user.id,
            completed: false,
          },
        ];
      });
      setIsCreatingTodo(false);
    }
  };

  const handleRemoveTodo = (todo: todo) => {
    setTodos((prev) => prev.filter((t) => t.title !== todo.title));
  };

  const handleCheckTodo = (todo: todo) => {
    setTodos((prev) =>
      prev.map((t) => {
        if (t.title === todo.title && t.owner === todo.owner) {
          return { ...t, completed: !t.completed };
        }
        return t;
      }),
    );
  };

  return (
    <section className="flex flex-col">
      <article className="flex flex-row items-center space-x-2 overflow-hidden">
        <button onClick={() => setIsCreatingTodo(!isCreatingTodo)}>
          <PlusIcon />
        </button>
        <div className="flex flex-col sm:flex-row sm:items-center space-y-1 sm:space-y-0 sm:space-x-2 min-w-0 mt-1">
          {user.id === socket.id ? (
            <h4 className="text-sm font-semibold truncate sm:text-base md:text-lg">
              {user.name}
            </h4>
          ) : (
            <h4 className="text-sm truncate sm:text-base md:text-lg">
              {user.name}
            </h4>
          )}
          {user.id !== user.name && (
            <p className="text-xs text-gray-400 truncate sm:text-[8px] md:text-xs pt-1 hidden md:inline">
              {user.id}
            </p>
          )}
        </div>
      </article>
      <ul className="flex flex-col space-y-1">
        {userTodos.map((todo, index) => (
          <li
            key={index}
            className="py-2 px-3 flex flex-row space-y-1 sm:space-y-0 sm:space-x-2 min-w-0 mt-1"
          >
            <div className="flex flex-auto space-x-2 items-center">
              <input
                id="checkbox"
                type="checkbox"
                onChange={() => handleCheckTodo(todo)}
                className="w-4 h-4 rounded"
              />
              <label
                htmlFor="checkbox"
                className="ms-2 text-sm font-medium text-gray-400 dark:text-gray-500"
              >
                <p className={todo.completed ? "line-through" : ""}>
                  {todo.title}
                </p>
              </label>
            </div>
            <button onClick={() => handleRemoveTodo(todo)}>
              <RemoveIcon />
            </button>
          </li>
        ))}
        {isCreatingTodo && (
          <li className="py-2 px-3 flex flex-row space-y-1 sm:space-y-0 sm:space-x-2 min-w-0 mt-1">
            <div className="flex flex-auto space-x-2 items-center">
              <input
                disabled
                type="checkbox"
                className="w-4 h-4 rounded hidden"
              />
              <input
                type="text"
                placeholder="New Todo"
                className="ms-2 text-sm font-medium text-gray-400 dark:text-gray-500 bg-transparent outline-none"
                onKeyUp={handleCreateTodo}
                autoFocus
              />
            </div>
          </li>
        )}
      </ul>
    </section>
  );
}
