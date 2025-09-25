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
import App from './projects/01-counter/App.tsx';

// Switch to Todo List project
import App from './projects/02-todo-list/App.tsx';
```

## Adding New Projects

1. Create a new numbered folder in `src/projects/` (e.g., `03-form`, `04-calculator`)
   - Use the next sequential number (increment from the highest existing number)
   - Format: `##-[project-name]` (e.g., `01-counter`, `02-todo-list`)
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

1. Create a new numbered folder in `src/hooks/` (e.g., `02-useToggle`, `03-useLocalStorage`)
   - Use the next sequential number (increment from the highest existing number)
   - Format: `##-useX` (e.g., `01-useCounter`)
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

3. Open your browser to the provided local URL

## Testing

```bash
  npm test
```
