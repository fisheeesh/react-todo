/* eslint-disable react/prop-types */
import Todo from "./Todo";

export default function TodoList({ todos, deleteTodo }) {
    return (
        <ul className="todo-list">
            {
                todos.map(todo => (
                    <Todo key={todo.id} todo={todo} deleteTodo={deleteTodo}/>
                ))
            }
        </ul>
    )
}
