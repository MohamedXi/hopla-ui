import * as React from 'react';
const { useRef, useEffect } = React;

/**
 * Hook pour accéder à la valeur précédente d'un état ou d'une prop
 * @param value - La valeur dont on veut connaître la valeur précédente
 * @returns La valeur précédente
 */
export function usePrevious<T>(value: T): T | undefined {
  // Référence pour stocker la valeur précédente
  const ref = useRef<T | undefined>(undefined);

  // Mise à jour de la référence après chaque rendu
  useEffect(() => {
    ref.current = value;
  }, [value]);

  // Retourne la valeur précédente (qui est undefined lors du premier rendu)
  return ref.current;
}
