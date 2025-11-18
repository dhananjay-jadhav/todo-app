import { useContext, useState, type ChangeEvent, type FormEvent } from "react";
import MyContext from "../context/context";


const ToDoCreate = () => {
    const [title,setTitle] = useState<string>('');

    const { createToDo } = useContext(MyContext);

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        setTitle(event.target.value);
    }

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        createToDo!(title);
        setTitle('');
    }

    return (
        <form onSubmit={handleSubmit} className="todo-create">
            <div>To DO Create</div>
            <input
                type="text"
                name="title"
                id="title"
                placeholder="Enter a ToDo"
                value={title}
                onChange={handleChange}
            />
        </form>

    )
}

export default ToDoCreate;