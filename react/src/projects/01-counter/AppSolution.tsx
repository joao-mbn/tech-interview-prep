import { useState } from 'react';
import './App.css';

function App() {
  const [counter, setCounter] = useState(0);
  return (
    <div className="counter-app">
      <h1>Counter Challenge</h1>
      <p>Click the button to increment the counter</p>
      <div className="counter-display">
        <span className="count">{counter}</span>
      </div>
      <button className="increment-btn" onClick={() => setCounter(prev => ++prev)}>
        Click me!
      </button>
      <button className="reset-btn" onClick={() => setCounter(0)}>
        Reset
      </button>
    </div>
  );
}

export default App;
