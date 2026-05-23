import { renderHook, act } from '@testing-library/react';
import useLocalStorage from './useLocalStorage';

beforeEach(() => {
  localStorage.clear();
});

describe('useLocalStorage', () => {
  it('returns init value if localStorage is empty', () => {
    const { result } = renderHook(() => useLocalStorage('TEST', '12345'));

    expect(result.current[0]).toBe('12345');
  });
  it('returns stored value if localStorage is populated', () => {
    localStorage.setItem('TEST', JSON.stringify('543'));
    const { result } = renderHook(() => useLocalStorage('TEST', '12345'));

    expect(result.current[0]).toBe('543');
  });
  it('setValue sets value correctly', () => {
    const { result } = renderHook(() => useLocalStorage('TEST', '12345'));

    act(() => {
      result.current[1]('543');
    });

    expect(result.current[0]).toBe('543');
  });
  it('returns correct string', () => {
    const { result } = renderHook(() => useLocalStorage('TEST', '12345'));

    expect(result.current[0]).toBe('12345');
  });
  it('returns correct number', () => {
    const { result } = renderHook(() => useLocalStorage('TEST', 12345));

    expect(result.current[0]).toBe(12345);
  });
  it('returns correct object', () => {
    const testObject = {
      test1: '12345',
      test2: 543,
      test3: {
        test4: 'test',
      },
    };

    const { result } = renderHook(() => useLocalStorage('TEST', testObject));

    expect(result.current[0]).toBe(testObject);
  });
});
