# React Interview Projects

This folder contains independent React practice challenges for technical interview preparation. Each challenge is self-contained.

## Project Structure

```
src/
├── projects/              # Individual React practice challenges
├── hooks/                 # Custom React hooks for testing hooks knowledge
├── test/                  # Test setup and utilities
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

## Adding New Projects

1. Create a new folder in `src/projects/`
2. Add `App.tsx` with basic component structure
3. Add `App.css` with styling
4. Import CSS in `App.tsx`: `import './App.css'`
5. Create `DESCRIPTION.md` with challenge details:

```
# [Challenge Name]

## Difficulty: [Easy/Medium/Hard/Expert]

## Description
[Brief explanation of what to build]

## Requirements
- [Specific requirement 1]
- [Specific requirement 2]
- [Specific requirement 3]
```

6. Update the import in `src/main.tsx` to point to your new project

## Adding New Hooks

1. Create a new folder in `src/hooks/` named after the hook (e.g., `useCounter`)
2. Add `useX.ts` with hook implementation
3. Add `useX.test.ts` with comprehensive tests
4. Add `DESCRIPTION.md` with challenge details:

```
# useX Hook

## Difficulty: [Easy/Medium/Hard/Expert]

## Description
[Brief explanation of what the hook should do]

## Requirements
- [Specific requirement 1]
- [Specific requirement 2]
- [Specific requirement 3]
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

4. Open your browser to the provided local URL

## Testing
```bash
  npm test
```

