import { useState, type ChangeEvent, type FormEvent } from "react";
import type { ToDoItem } from "../utils/types";

const ToDoEdit = ({
  todo,
  onSubmit,
}: {
  todo: ToDoItem;
  onSubmit: (id: string, title: string) => void;
}) => {
  const [title, setTitle] = useState(todo.title);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  }

  const handleSubmit = (event: FormEvent<HTMLButtonElement>) => {
    event.preventDefault();
    onSubmit(todo.id, title);
  }

  return (
    <form className="todo-edit">
        <input type="text" value={title} onChange={handleChange}/>
        <button type="submit" onClick={handleSubmit} >
            {/* <img src={CheckIcon} title="save" /> */}
            <img title="save" />
        </button>
    </form>
  )
};

export default ToDoEdit;
