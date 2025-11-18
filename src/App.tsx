import { useState } from 'react'
import './App.css'
import ToDoList from './components/ToDoList'
import ToDoCreate from './components/ToDoCreate'
import type { ToDoItem } from './types'

function App() {
  const [todos, updateToDos] = useState<ToDoItem[]>([]);

  const createToDo = (title: string) => {
      const todo: ToDoItem = {
        id: crypto.randomUUID(),
        title,
        completed: false
      };
      updateToDos([todo, ...todos])
  };

  const updateTodo = (todo: ToDoItem) => {
    const updatedList = todos.map(item =>{
        if(item.id === todo.id){
          return { ...item, title: todo.title, completed: todo.completed};
        }
        return item;
    });
    updateToDos(updatedList);
  }

  const removeTodo = (id: string) => {
    const updatedList = todos.filter(todo => todo.id != id);
    updateToDos(updatedList);
  }


  return (
    <>
      <h1>To Do List</h1>
      <ToDoList todos={todos} updateTodo={updateTodo} removeTodo={removeTodo} />
      <ToDoCreate createTodo={createToDo}/>
    </>
  )
}

export default App
