import { RefObject } from 'react';
import { useIsomorphicLayoutEffect } from './useIsomorphicLayoutEffect';

/**
 * Hook pour détecter les clics en dehors d'un élément
 * @param ref - Référence à l'élément DOM
 * @param handler - Fonction à appeler lorsqu'un clic est détecté en dehors de l'élément
 * @param enabled - Si le hook est actif
 */
export function useClickOutside<T extends HTMLElement = HTMLElement>(
  ref: RefObject<T>,
  handler: (event: MouseEvent | TouchEvent) => void,
  enabled = true
): void {
  useIsomorphicLayoutEffect(() => {
    if (!enabled) return;

    const listener = (event: MouseEvent | TouchEvent) => {
      // Ne rien faire si le clic est sur l'élément lui-même
      if (!ref.current || ref.current.contains(event.target as Node)) {
        return;
      }

      handler(event);
    };

    document.addEventListener('mousedown', listener);
    document.addEventListener('touchstart', listener);

    return () => {
      document.removeEventListener('mousedown', listener);
      document.removeEventListener('touchstart', listener);
    };
  }, [ref, handler, enabled]);
}
