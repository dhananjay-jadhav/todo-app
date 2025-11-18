import { useContext } from "react";
import TodoShow from "./ToDoShow";
import MyContext from "../context/context";

// const ToDoList = ({
//   todos,
//   removeTodo,
//   updateTodo,
// }: {
//   todos: ToDoItem[];
//   removeTodo: (id: string) => void;
//   updateTodo: (todo: ToDoItem) => void;
// }) => {
const ToDoList = () => { 
   const { todos } = useContext(MyContext);
   
    const renderedTodos = todos?.map(todo => {
        return <TodoShow
            todo={todo}
        />
    });
  return <ul className="todo-list">{renderedTodos}</ul>;
};

export default ToDoList;
