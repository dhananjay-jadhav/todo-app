import type { ToDoItem } from "../types";
import TodoShow from "./ToDoShow";

const ToDoList = ({
  todos,
  removeTodo,
  updateTodo,
}: {
  todos: ToDoItem[];
  removeTodo: (id: string) => void;
  updateTodo: (todo: ToDoItem) => void;
}) => {
    const renderedTodos = todos.map(todo => {
        return <TodoShow
            key={todo.id}
            todo={todo}
            removeTodo={removeTodo}
            updateTodo={updateTodo}
        />
    });
  return <ul className="todo-list">{renderedTodos}</ul>;
};

export default ToDoList;
