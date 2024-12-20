/* eslint-disable react/prop-types */
import { useState } from "react"

export default function TodoForm({ addTodo }) {

    const [title, setTitle] = useState('')

    const handleSubmit = (e) => {
        e.preventDefault()

        if (title.trim() === '') return

        let newTodo = {
            id: Math.floor(Math.random() * 10000).toString(),
            title: title.trim(),
            completed: false
        }

        addTodo(newTodo)
        setTitle('')
    }

    return (
        <form onSubmit={handleSubmit}>
            <input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                type="text"
                className="todo-input"
                placeholder="What do you need to do?"
            />
        </form>
    )
}
