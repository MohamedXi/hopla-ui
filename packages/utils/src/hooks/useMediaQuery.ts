import { useState, useEffect } from 'react';

/**
 * Hook pour vérifier si une requête média correspond
 * @param query - La requête média à vérifier
 * @returns true si la requête média correspond
 */
export function useMediaQuery(query: string): boolean {
  const getMatches = (query: string): boolean => {
    // Vérifie si window est disponible (côté client)
    if (typeof window !== 'undefined') {
      return window.matchMedia(query).matches;
    }
    return false;
  };

  const [matches, setMatches] = useState<boolean>(getMatches(query));

  useEffect(() => {
    const mediaQuery = window.matchMedia(query);

    // Définit la valeur initiale
    setMatches(mediaQuery.matches);

    // Crée un gestionnaire d'événements pour suivre les changements
    const handler = (event: MediaQueryListEvent) => setMatches(event.matches);

    // Ajoute l'écouteur d'événements
    mediaQuery.addEventListener('change', handler);

    // Nettoie l'écouteur d'événements
    return () => mediaQuery.removeEventListener('change', handler);
  }, [query]);

  return matches;
}
