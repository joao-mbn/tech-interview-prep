import { act, renderHook } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { useDebounce } from './useDebounce';

describe('useDebounce', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.runOnlyPendingTimers();
    vi.useRealTimers();
  });

  it('should return the initial value immediately', () => {
    const { result } = renderHook(() => useDebounce('initial', 500));
    expect(result.current).toBe('initial');
  });

  it('should debounce string values', () => {
    const { result, rerender } = renderHook(({ value, delay }) => useDebounce(value, delay), {
      initialProps: { value: 'initial', delay: 500 },
    });

    expect(result.current).toBe('initial');

    // Change the value
    rerender({ value: 'updated', delay: 500 });
    expect(result.current).toBe('initial'); // Should still be initial

    // Fast forward time by 499ms
    act(() => {
      vi.advanceTimersByTime(499);
    });
    expect(result.current).toBe('initial'); // Should still be initial

    // Fast forward time by 1ms more
    act(() => {
      vi.advanceTimersByTime(1);
    });
    expect(result.current).toBe('updated'); // Should now be updated
  });

  it('should debounce number values', () => {
    const { result, rerender } = renderHook(({ value, delay }) => useDebounce(value, delay), {
      initialProps: { value: 0, delay: 300 },
    });

    expect(result.current).toBe(0);

    rerender({ value: 42, delay: 300 });
    expect(result.current).toBe(0);

    act(() => {
      vi.advanceTimersByTime(300);
    });
    expect(result.current).toBe(42);
  });

  it('should debounce object values', () => {
    const initialObj = { name: 'John', age: 30 };
    const updatedObj = { name: 'Jane', age: 25 };

    const { result, rerender } = renderHook(({ value, delay }) => useDebounce(value, delay), {
      initialProps: { value: initialObj, delay: 200 },
    });

    expect(result.current).toEqual(initialObj);

    rerender({ value: updatedObj, delay: 200 });
    expect(result.current).toEqual(initialObj);

    act(() => {
      vi.advanceTimersByTime(200);
    });
    expect(result.current).toEqual(updatedObj);
  });

  it('should cancel previous timeout when value changes rapidly', () => {
    const { result, rerender } = renderHook(({ value, delay }) => useDebounce(value, delay), {
      initialProps: { value: 'first', delay: 500 },
    });

    expect(result.current).toBe('first');

    // Change value multiple times rapidly
    rerender({ value: 'second', delay: 500 });
    rerender({ value: 'third', delay: 500 });
    rerender({ value: 'fourth', delay: 500 });

    // Fast forward time by 499ms
    act(() => {
      vi.advanceTimersByTime(499);
    });
    expect(result.current).toBe('first'); // Should still be first

    // Fast forward time by 1ms more
    act(() => {
      vi.advanceTimersByTime(1);
    });
    expect(result.current).toBe('fourth'); // Should be the last value
  });

  it('should handle zero delay', () => {
    const { result, rerender } = renderHook(({ value, delay }) => useDebounce(value, delay), {
      initialProps: { value: 'initial', delay: 0 },
    });

    expect(result.current).toBe('initial');

    rerender({ value: 'updated', delay: 0 });
    expect(result.current).toBe('initial');

    act(() => {
      vi.advanceTimersByTime(0);
    });
    expect(result.current).toBe('updated');
  });

  it('should handle delay changes', () => {
    const { result, rerender } = renderHook(({ value, delay }) => useDebounce(value, delay), {
      initialProps: { value: 'initial', delay: 500 },
    });

    expect(result.current).toBe('initial');

    rerender({ value: 'updated', delay: 200 }); // Change delay
    expect(result.current).toBe('initial');

    act(() => {
      vi.advanceTimersByTime(200);
    });
    expect(result.current).toBe('updated');
  });

  it('should clean up timeout on unmount', () => {
    const clearTimeoutSpy = vi.spyOn(globalThis, 'clearTimeout');

    const { unmount } = renderHook(() => useDebounce('test', 500));

    unmount();

    expect(clearTimeoutSpy).toHaveBeenCalled();

    clearTimeoutSpy.mockRestore();
  });

  it('should handle multiple rapid changes with different delays', () => {
    const { result, rerender } = renderHook(({ value, delay }) => useDebounce(value, delay), {
      initialProps: { value: 'start', delay: 1000 },
    });

    expect(result.current).toBe('start');

    // Change value and delay multiple times
    rerender({ value: 'first', delay: 500 });
    rerender({ value: 'second', delay: 300 });
    rerender({ value: 'final', delay: 200 });

    act(() => {
      vi.advanceTimersByTime(200);
    });
    expect(result.current).toBe('final');
  });

  it('should work with array values', () => {
    const initialArray = [1, 2, 3];
    const updatedArray = [4, 5, 6];

    const { result, rerender } = renderHook(({ value, delay }) => useDebounce(value, delay), {
      initialProps: { value: initialArray, delay: 100 },
    });

    expect(result.current).toEqual(initialArray);

    rerender({ value: updatedArray, delay: 100 });
    expect(result.current).toEqual(initialArray);

    act(() => {
      vi.advanceTimersByTime(100);
    });
    expect(result.current).toEqual(updatedArray);
  });
});
