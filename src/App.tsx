import { useContext, useEffect } from "react";
import "./App.css";
import ToDoList from "./components/ToDoList";
import ToDoCreate from "./components/ToDoCreate";
import MyContext from "./context/context";

function App() {
  const { getTodos } = useContext(MyContext);

  useEffect(() => {
    if(getTodos){
      getTodos();
    }
  }, []);

  return (
    <>
      <h1>To Do List</h1>
      <ToDoList />
      <ToDoCreate />
    </>
  );
}

export default App;

// const createToDo = (title: string) => {
//     const todo: ToDoItem = {
//       id: crypto.randomUUID(),
//       title,
//       completed: false
//     };
//     updateToDos([todo, ...todos])
// };

// const updateTodo = (todo: ToDoItem) => {
//   const updatedList = todos.map(item =>{
//       if(item.id === todo.id){
//         return { ...item, title: todo.title, completed: todo.completed};
//       }
//       return item;
//   });
//   updateToDos(updatedList);
// }

// const removeTodo = (id: string) => {
//   const updatedList = todos.filter(todo => todo.id != id);
//   updateToDos(updatedList);
// }
