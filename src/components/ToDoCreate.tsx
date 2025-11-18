import { useState, type ChangeEvent, type FormEvent } from "react";


const ToDoCreate = ({ createTodo}:{createTodo: (title: string) => void }) => {
    const [title,setTitle] = useState<string>('');

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        setTitle(event.target.value);
    }

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        createTodo(title);
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