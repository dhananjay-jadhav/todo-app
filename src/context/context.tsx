import { createContext } from "react";
import type { ToDoItem } from "../utils/types";

export type ProviderType = {
  todos?: ToDoItem[];
  updateToDos?: React.Dispatch<React.SetStateAction<ToDoItem[]>>;
  createToDo?: (title: string) => Promise<void>
  getTodos?: () => Promise<void>;
  removeTodo?: (id: string) => void;
  updateTodo?: (todo: ToDoItem) => void;
};

const MyContext = createContext<{
  todos?: ToDoItem[];
  updateToDos?: React.Dispatch<React.SetStateAction<ToDoItem[]>>;
  createToDo?: (title: string) => Promise<void>
  getTodos?: () => Promise<void>;
  removeTodo?: (id: string) => void;
  updateTodo?: (todo: ToDoItem) => void;
}>({});

export default MyContext;
