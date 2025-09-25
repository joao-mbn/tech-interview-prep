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
        <button>Add</button>
      </div>

      <div className="todo-list">
        {todos.length === 0 ? (
          <p>No todos yet</p>
        ) : (
          todos.map(todo => <div key={todo.id} className="todo-item"></div>)
        )}
      </div>
    </div>
  );
}

export default App;
