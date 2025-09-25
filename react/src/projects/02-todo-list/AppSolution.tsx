import { useState } from 'react';
import './App.css';

interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

function App() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTodo, setNewTodo] = useState('');

  function handleAddTodo(): void {
    setTodos(prev => [
      ...prev,
      {
        completed: false,
        id: Date.now(),
        text: newTodo,
      },
    ]);
    setNewTodo('');
  }

  function handleToggleFinish(id: number): void {
    setTodos(prev =>
      prev.map(todo => (todo.id === id ? { ...todo, completed: !todo.completed } : todo))
    );
  }

  function handleDeleteTodo(id: number): void {
    setTodos(prev => prev.filter(todo => todo.id !== id));
  }

  return (
    <div className="todo-app">
      <h1>Todo List</h1>

      <div className="add-todo">
        <input
          type="text"
          value={newTodo}
          onChange={e => setNewTodo(e.target.value)}
          placeholder="Add a new todo..."
        />
        <button onClick={handleAddTodo} disabled={newTodo.trim() === ''}>
          Add
        </button>
      </div>

      <div className="todo-list">
        {todos.length === 0 ? (
          <p>No todos yet</p>
        ) : (
          todos.map(({ id, text, completed }) => (
            <div key={id} className="todo-item">
              <input type="checkbox" onClick={() => handleToggleFinish(id)} checked={completed} />
              <span>{text}</span>
              <button onClick={() => handleDeleteTodo(id)}>Delete</button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default App;
