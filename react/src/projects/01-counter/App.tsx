import './App.css';

function App() {
  return (
    <div className="counter-app">
      <h1>Counter Challenge</h1>
      <p>Click the button to increment the counter</p>
      <div className="counter-display">
        <span className="count">0</span>
      </div>
      <button className="increment-btn">Click me!</button>
      <button className="reset-btn">Reset</button>
    </div>
  );
}

export default App;
