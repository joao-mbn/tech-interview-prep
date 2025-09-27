import { Component, Suspense, use, type PropsWithChildren, type ReactNode } from 'react';
import './App.css';
import { getData, type Dinosaur } from './api';

interface ErrorBoundaryProps extends PropsWithChildren {
  fallback: React.ComponentType<{ error: string }>;
}

class ErrorBoundary extends Component<ErrorBoundaryProps, { hasErrors: boolean; error: string }> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasErrors: false, error: '' };
  }

  componentDidCatch(error: Error): void {
    this.setState({
      hasErrors: true,
      error: error.message,
    });
  }

  render(): ReactNode {
    if (this.state.hasErrors) {
      const Fallback = this.props.fallback;
      return <Fallback error={this.state.error} />;
    }

    return this.props.children;
  }
}

function LoadingSpinner() {
  return (
    <div className="loading-container">
      <div className="spinner"></div>
      <p>Loading dinosaurs...</p>
    </div>
  );
}

function ErrorFallback({ error }: { error: string }) {
  return (
    <div className="error-container">
      <h2>Oops! Something went wrong</h2>
      <p>{error}</p>
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
  const dinosaurs = use(getData());

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
      <ErrorBoundary fallback={ErrorFallback}>
        <Suspense fallback={<LoadingSpinner />}>
          <DinosaurList />
        </Suspense>
      </ErrorBoundary>
    </div>
  );
}

export default App;
