import { useState } from "react";
import MyContext, { type ProviderType } from "./context";
import type { ToDoItem } from "../utils/types";

const MyProvider = ({ children }: { children: React.ReactNode }) => {
  const [todos, updateToDos] = useState<ToDoItem[]>([]);

  const getTodos = async () => {
    const url = "http://localhost:5000/todos";

    try {
      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const storedTodos = await response.json();

      if (storedTodos) {
        updateToDos(storedTodos);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const createToDo = async (title: string) => {
    const newToDo: Partial<ToDoItem> = {
      title: title,
      completed: false,
    };

    const url = "http://localhost:5000/todos";

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          // Explicitly tell the server you are sending JSON
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newToDo),
      });

      console.log(response);

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const storedTodo = await response.json();

      updateToDos([storedTodo, ...todos]);
    } catch (err) {
      console.error(err);
    }
  };

  const updateTodo = async (todo: ToDoItem) => {
    const url = `http://localhost:5000/todos/${todo.id}`;

    const data: Partial<ToDoItem> = {
      title: todo.title,
      completed: todo.completed,
    };

    try {
      const response = await fetch(url, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const updatedTodo = await response.json();
      const updatedList = todos.map((item) => {
        if (item.id === todo.id) {
          return { ...item, ...updatedTodo };
        }
        return item;
      });
      updateToDos(updatedList);
    } catch (err) {
      console.error(err);
    }
  };

  const removeTodo = async (id: string) => {
    const url = `http://localhost:5000/todos/${id}`;

    try {
      const response = await fetch(url, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const updatedTodos = todos.filter((todo) => todo.id !== id);
      updateToDos(updatedTodos);
    } catch (err) {
      console.error(err);
    }
  };

  const shared: ProviderType = {
    todos,
    updateToDos,
    createToDo,
    getTodos,
    updateTodo,
    removeTodo,
  };

  return <MyContext.Provider value={shared}>{children}</MyContext.Provider>;
};

export default MyProvider;
