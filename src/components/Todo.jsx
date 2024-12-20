import { useState } from "react"

/* eslint-disable react/prop-types */
export default function Todo({ todo, deleteTodo, updateTodo }) {
    const [isEdit, setIsEdit] = useState(false)
    const [title, setTitle] = useState(todo.title)

    const handleUpdate = (e) => {
        e.preventDefault()

        if (title.trim() === '') return

        let updatedTodo = {
            id: todo.id,
            title: title.trim(),
            completed: todo.completed
        }

        updateTodo(updatedTodo)
        setIsEdit(false)
    }

    const handleChecked = () => {
        let updatedTodo = {
            id: todo.id,
            title: todo.title,
            completed: !todo.completed
        }

        updateTodo(updatedTodo)
    }

    return (
        <li className="todo-item-container">
            <div className="todo-item">
                <input checked={todo.completed} onChange={handleChecked} type="checkbox" />
                {!isEdit ?
                    (<span onDoubleClick={() => setIsEdit(true)} className={`todo-item-label ${todo.completed ? 'line-through' : ''}`}>
                        {todo.title}
                    </span>)
                    :
                    (
                        <form onSubmit={handleUpdate}>
                            <input onChange={e => setTitle(e.target.value)} type="text" className="todo-item-input" value={title} />
                        </form>
                    )
                }

            </div>
            <button className="x-button" onClick={() => deleteTodo(todo.id)}>
                <svg
                    className="x-button-icon"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M6 18L18 6M6 6l12 12"
                    />
                </svg>
            </button>
        </li>
    )
}
