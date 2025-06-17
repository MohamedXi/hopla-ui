import { useState, useEffect } from 'react';

/**
 * Hook pour utiliser le localStorage avec React
 * @param key - La clé de stockage
 * @param initialValue - La valeur initiale
 * @returns Un tuple contenant la valeur et une fonction pour la mettre à jour
 */
export function useLocalStorage<T>(
  key: string,
  initialValue: T
): [T, (value: T | ((val: T) => T)) => void] {
  // Fonction pour obtenir la valeur initiale du localStorage ou utiliser la valeur par défaut
  const readValue = (): T => {
    if (typeof window === 'undefined') {
      return initialValue;
    }

    try {
      const item = window.localStorage.getItem(key);
      return item ? (JSON.parse(item) as T) : initialValue;
    } catch (error) {
      console.warn(`Erreur lors de la lecture de localStorage [${key}]:`, error);
      return initialValue;
    }
  };

  // État pour stocker notre valeur
  const [storedValue, setStoredValue] = useState<T>(readValue);

  // Fonction pour mettre à jour la valeur dans le state et localStorage
  const setValue = (value: T | ((val: T) => T)) => {
    try {
      // Permet à la valeur d'être une fonction pour être cohérent avec useState
      const valueToStore =
        value instanceof Function ? value(storedValue) : value;
      
      // Sauvegarde dans le state
      setStoredValue(valueToStore);
      
      // Sauvegarde dans localStorage
      if (typeof window !== 'undefined') {
        window.localStorage.setItem(key, JSON.stringify(valueToStore));
      }
    } catch (error) {
      console.warn(`Erreur lors de l'écriture dans localStorage [${key}]:`, error);
    }
  };

  // Écoute les changements de localStorage dans d'autres onglets/fenêtres
  useEffect(() => {
    const handleStorageChange = (event: StorageEvent) => {
      if (event.key === key && event.newValue) {
        setStoredValue(JSON.parse(event.newValue) as T);
      }
    };

    // Ajoute l'écouteur d'événements
    window.addEventListener('storage', handleStorageChange);

    // Nettoie l'écouteur d'événements
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, [key]);

  return [storedValue, setValue];
}
