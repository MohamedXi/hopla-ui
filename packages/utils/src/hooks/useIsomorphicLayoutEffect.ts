import { useLayoutEffect, useEffect } from 'react';

/**
 * Hook qui utilise useLayoutEffect côté client et useEffect côté serveur
 * Cela évite les avertissements lors du rendu côté serveur
 */
export const useIsomorphicLayoutEffect =
  typeof window !== 'undefined' ? useLayoutEffect : useEffect;
