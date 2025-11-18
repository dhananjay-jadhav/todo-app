import { useState } from "react";
import type { ToDoItem } from "../types";
import ToDoEdit from "./ToDoEdit";

const TodoShow = ({
  key,
  todo,
  removeTodo,
  updateTodo,
}: {
  key: string;
  todo: ToDoItem;
  removeTodo: (id: string) => void;
  updateTodo: (todo: ToDoItem) => void;
}) => {
    const [showEdit, setShowEdit] = useState(false);

    const handleDelete = () => {
        removeTodo(todo.id);
    };

    const handleEdit = () => {
        setShowEdit(true);
    }

    const handleDoubleClick = () => {
        updateTodo({id: todo.id, title: todo.title, completed: !todo.completed})
    }

    const handleSubmit = (id: string, title: string) => {
        updateTodo({
            id,
            title,
            completed: false
        });
        setShowEdit(false);
    }

    if(showEdit){
        return (
            <li className="todo">
                <ToDoEdit todo={todo} onSubmit={handleSubmit}/>
            </li>
        )
    }

  return (
    <li className="todo" onDoubleClick={handleDoubleClick} key={key}>
        <p className={todo.completed ? 'completed' : 'notcompleted'}>{todo.title}</p>

        <div className="actions">
            <button onClick={handleDelete}>
                {/* <img  src={DeleteIcon} title="Delete"/> */}
                <img title="Delete"/>
            </button>
            <button onClick={handleEdit}>
                {/* <img  src={EditIcon} title="Edit"/> */}
                <img title="Edit"/>
            </button>
        </div>
    </li>
  );
};

export default TodoShow;
