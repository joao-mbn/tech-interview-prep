import type { Dinosaur } from './api';
import './App.css';

function LoadingSpinner() {
  return (
    <div className="loading-container">
      <div className="spinner"></div>
      <p>Loading dinosaurs...</p>
    </div>
  );
}

function ErrorFallback({ error }: { error: Error }) {
  return (
    <div className="error-container">
      <h2>Oops! Something went wrong</h2>
      <p>{error.message}</p>
      <button onClick={() => window.location.reload()}>Try Again</button>
    </div>
  );
}

function DinosaurCard({ dinosaur }: { dinosaur: Dinosaur }) {
  return (
    <div className="dinosaur-card">
      <h3>{dinosaur.name}</h3>
      <div className="dinosaur-info">
        <span className="period">{dinosaur.period}</span>
        <span className={`diet ${dinosaur.diet.toLowerCase()}`}>{dinosaur.diet}</span>
      </div>
      <p className="description">{dinosaur.description}</p>
    </div>
  );
}

function DinosaurList() {
  const dinosaurs: Dinosaur[] = [];

  return (
    <div className="dinosaur-list">
      <h1>Dinosaurs</h1>
      <div className="dinosaur-grid">
        {dinosaurs.map(dinosaur => (
          <DinosaurCard key={dinosaur.id} dinosaur={dinosaur} />
        ))}
      </div>
    </div>
  );
}

function App() {
  return (
    <div className="app">
      <DinosaurList />
    </div>
  );
}

export default App;
