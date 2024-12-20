import './reset.css';
import './App.css';
import TodoForm from './components/TodoForm';
import TodoList from './components/TodoList';
import CheckAllAndRemaining from './components/CheckAllAndRemaining';
import TodoFilter from './components/TodoFilter';
import ClearCompletedBtn from './components/ClearCompletedBtn';
import { useEffect, useState } from 'react';

function App() {

  const [todos, setTodos] = useState([])
  const remainingTodos = todos.filter(todo => todo.completed).length

  useEffect(() => {
    fetch('http://localhost:3001/todos')
      .then(res => res.json())
      .then(data => setTodos(data))
      .catch(err => console.log(err.message))
  }, [])

  // @TODO add todo
  const addTodo = (newTodo) => {
    // ? client side update
    setTodos(prevTodo => [...prevTodo, newTodo])

    // $ server side update
    fetch('http://localhost:3001/todos', {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newTodo)
    })
  }

  //@TODO delete todo
  const deleteTodo = (todoID) => {
    // ? cliendt side update
    setTodos(prevTodo => prevTodo.filter(todo => todo.id !== todoID))

    // $ server side update
    fetch(`http://localhost:3001/todos/${todoID}`, {
      method: 'DELETE'
    })
  }

  //@TODO update todo
  const updateTodo = (updatedTodo) => {
    // ? client side update
    setTodos(prevTodo => prevTodo.map(todo => {
      if (todo.id === updatedTodo.id) return updatedTodo

      return todo
    }))

    // $ server side update
    fetch(`http://localhost:3001/todos/${updatedTodo.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedTodo)
    })
  }

  // @TODO check all todos
  const checkAllTodos = () => {
    // ? client side update
    /**
     * ? I use map() cuz I want a new array based on the previous array
     * ? I want to have an array of completed todos
     */
    setTodos(prevTodo => prevTodo.map(todo => ({ ...todo, completed: true })))

    // $ server side update
    todos.forEach(todo => {
      if (!todo.completed) {
        updateTodo({
          ...todo, completed: true
        })
      }
    })
  }

  return (
    <div className="todo-app-container">
      <div className="todo-app">
        <h2>Todo App</h2>
        <TodoForm addTodo={addTodo} />
        <TodoList todos={todos} deleteTodo={deleteTodo} updateTodo={updateTodo} />
        <CheckAllAndRemaining remainingTodos={remainingTodos} checkAllTodos={checkAllTodos} />
        <div className="other-buttons-container">
          <TodoFilter />
          <ClearCompletedBtn />
        </div>
      </div>
    </div>
  );
}

export default App;