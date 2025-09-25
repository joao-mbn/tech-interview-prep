export function useCounter(initialValue: number = 0) {
  return {
    count: 0,
    increment: () => {},
    decrement: () => {},
    reset: () => {}
  }
}
