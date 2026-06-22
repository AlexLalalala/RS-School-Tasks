import { useState } from 'react';

function useLocalStorage<T>(key: string, init: T) {
  const [value, setValue] = useState<T>(() => {
    if (typeof window === 'undefined') return init;
    const stored = localStorage.getItem(key);
    if (stored === null) return init;
    try {
      return JSON.parse(stored);
    } catch {
      return init;
    }
  });

  function setStoredValue(newValue: T) {
    setValue(newValue);
    localStorage.setItem(key, JSON.stringify(newValue));
  }

  return [value, setStoredValue] as const;
}

export default useLocalStorage;
