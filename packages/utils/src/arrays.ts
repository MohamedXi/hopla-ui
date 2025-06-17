/**
 * Groupe les éléments d'un tableau par une clé
 * @param array - Le tableau à grouper
 * @param keyGetter - La fonction qui extrait la clé de regroupement
 * @returns Un objet avec les éléments groupés par clé
 */
export function groupBy<T, K extends string | number | symbol>(
  array: T[],
  keyGetter: (item: T) => K
): Record<K, T[]> {
  return array.reduce((acc, item) => {
    const key = keyGetter(item);
    if (!acc[key]) {
      acc[key] = [];
    }
    acc[key].push(item);
    return acc;
  }, {} as Record<K, T[]>);
}

/**
 * Supprime les doublons d'un tableau
 * @param array - Le tableau à traiter
 * @param keyGetter - Fonction optionnelle pour extraire la clé d'unicité
 * @returns Un tableau sans doublons
 */
export function unique<T>(array: T[], keyGetter?: (item: T) => any): T[] {
  if (!keyGetter) {
    return [...new Set(array)];
  }

  const seen = new Set();
  return array.filter(item => {
    const key = keyGetter(item);
    if (seen.has(key)) {
      return false;
    }
    seen.add(key);
    return true;
  });
}

/**
 * Divise un tableau en chunks de taille spécifiée
 * @param array - Le tableau à diviser
 * @param size - La taille des chunks
 * @returns Un tableau de chunks
 */
export function chunk<T>(array: T[], size: number): T[][] {
  if (size <= 0) {
    throw new Error('La taille du chunk doit être supérieure à 0');
  }

  const result: T[][] = [];
  for (let i = 0; i < array.length; i += size) {
    result.push(array.slice(i, i + size));
  }
  return result;
}

/**
 * Trie un tableau d'objets par une ou plusieurs propriétés
 * @param array - Le tableau à trier
 * @param keys - Les clés de tri avec direction (asc ou desc)
 * @returns Le tableau trié
 */
export function sortBy<T extends Record<string, any>>(
  array: T[],
  keys: Array<{ key: keyof T; direction?: 'asc' | 'desc' }>
): T[] {
  return [...array].sort((a, b) => {
    for (const { key, direction = 'asc' } of keys) {
      if (a[key] < b[key]) {
        return direction === 'asc' ? -1 : 1;
      }
      if (a[key] > b[key]) {
        return direction === 'asc' ? 1 : -1;
      }
    }
    return 0;
  });
}

/**
 * Mélange aléatoirement les éléments d'un tableau
 * @param array - Le tableau à mélanger
 * @returns Un nouveau tableau mélangé
 */
export function shuffle<T>(array: T[]): T[] {
  const result = [...array];
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

/**
 * Trouve l'intersection entre deux tableaux
 * @param array1 - Premier tableau
 * @param array2 - Deuxième tableau
 * @returns Un tableau contenant les éléments présents dans les deux tableaux
 */
export function intersection<T>(array1: T[], array2: T[]): T[] {
  return array1.filter(item => array2.includes(item));
}

/**
 * Trouve la différence entre deux tableaux
 * @param array1 - Premier tableau
 * @param array2 - Deuxième tableau
 * @returns Un tableau contenant les éléments présents dans array1 mais pas dans array2
 */
export function difference<T>(array1: T[], array2: T[]): T[] {
  return array1.filter(item => !array2.includes(item));
}
