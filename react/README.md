# React Interview Projects

This folder contains independent React practice challenges for technical interview preparation. Each challenge is self-contained.

## Project Structure

```
src/
├── projects/              # Individual React practice challenges
├── index.css              # Global styles
└── main.tsx               # Entry point
```

## How to Switch Between Projects

1. Open `src/main.tsx`
2. Change the import path to the project you want to work on
3. Save the file

### Example:

```tsx
// Current project (Counter)
import App from './projects/counter/App.tsx'

// Switch to Form project
import App from './projects/form/App.tsx'
```

## Setup and Run

1. Install dependencies:
   ```bash
   npm install
   ```

2. Start development server:
   ```bash
   npm run dev
   ```

3. Open your browser to the provided local URL

