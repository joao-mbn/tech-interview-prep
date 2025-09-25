import { useState } from 'react';

export function useCounter(initialValue: number = 0) {
  const [count, setCount] = useState(initialValue);
  const increment = () => setCount(prev => ++prev);
  const decrement = () => setCount(prev => --prev);
  const reset = () => setCount(0);

  return {
    count,
    increment,
    decrement,
    reset,
  };
}
