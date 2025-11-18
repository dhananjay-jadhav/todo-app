import { useContext, useState } from "react";
import type { ToDoItem } from "../utils/types";
import ToDoEdit from "./ToDoEdit";
import MyContext from "../context/context";

// const TodoShow = ({
//   key,
//   todo,
//   removeTodo,
//   updateTodo,
// }: {
//   key: string;
//   todo: ToDoItem;
//   removeTodo: (id: string) => void;
//   updateTodo: (todo: ToDoItem) => void;
// }) => {
const TodoShow = ({todo}: {todo:ToDoItem}) => {

    const [showEdit, setShowEdit] = useState(false);

    const { removeTodo, updateTodo } = useContext(MyContext);

    const handleDelete = () => {
        removeTodo!(todo.id);
    };

    const handleEdit = () => {
        setShowEdit(true);
    }

    const handleDoubleClick = () => {
        updateTodo!({id: todo.id, title: todo.title, completed: !todo.completed})
    }

    const handleSubmit = (id: string, title: string) => {
        updateTodo!({
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
    <li className="todo" onDoubleClick={handleDoubleClick} key={todo.id}>
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
