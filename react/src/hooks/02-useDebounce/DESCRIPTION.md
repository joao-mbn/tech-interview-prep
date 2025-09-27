# useDebounce Hook

## Difficulty: Medium

## Description

Create a custom React hook that debounces a value, delaying updates until after a specified delay period has passed since the last change. This is useful for optimizing performance when dealing with frequently changing values like search inputs, API calls, or expensive computations.

## Requirements

- The hook should accept a value of any type and a delay in milliseconds
- Return the debounced value that only updates after the delay period has elapsed
- The hook should cancel previous timeouts when the value changes before the delay completes
- Handle component unmounting
- The hook should work with any type of value (string, number, object, etc.)
- Provide proper TypeScript typing for the hook parameters and return value

## Example Usage

```typescript
const [searchTerm, setSearchTerm] = useState('');
const debouncedSearchTerm = useDebounce(searchTerm, 500);

// debouncedSearchTerm will only update 500ms after searchTerm stops changing
```
