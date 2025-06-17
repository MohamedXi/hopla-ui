import { useState, useEffect, useRef } from 'react';

/**
 * Hook pour throttler une valeur
 * @param value - La valeur à throttler
 * @param limit - La limite en millisecondes
 * @returns La valeur throttlée
 */
export function useThrottle<T>(value: T, limit: number): T {
  const [throttledValue, setThrottledValue] = useState<T>(value);
  const lastRan = useRef<number>(Date.now());

  useEffect(() => {
    const handler = setTimeout(() => {
      const now = Date.now();
      if (now - lastRan.current >= limit) {
        setThrottledValue(value);
        lastRan.current = now;
      }
    }, limit - (Date.now() - lastRan.current));

    return () => {
      clearTimeout(handler);
    };
  }, [value, limit]);

  return throttledValue;
}
