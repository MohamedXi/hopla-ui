/**
 * Convertit une chaîne en camelCase
 * @param str - La chaîne à convertir
 * @returns La chaîne en camelCase
 */
export function toCamelCase(str: string): string {
  return str
    .replace(/(?:^\w|[A-Z]|\b\w)/g, (letter, index) => {
      return index === 0 ? letter.toLowerCase() : letter.toUpperCase();
    })
    .replace(/\s+|[-_]/g, '');
}

/**
 * Convertit une chaîne en PascalCase
 * @param str - La chaîne à convertir
 * @returns La chaîne en PascalCase
 */
export function toPascalCase(str: string): string {
  return str
    .replace(/(?:^\w|[A-Z]|\b\w)/g, letter => letter.toUpperCase())
    .replace(/\s+|[-_]/g, '');
}

/**
 * Convertit une chaîne en kebab-case
 * @param str - La chaîne à convertir
 * @returns La chaîne en kebab-case
 */
export function toKebabCase(str: string): string {
  return str
    .replace(/([a-z])([A-Z])/g, '$1-$2')
    .replace(/\s+|_/g, '-')
    .toLowerCase();
}

/**
 * Convertit une chaîne en snake_case
 * @param str - La chaîne à convertir
 * @returns La chaîne en snake_case
 */
export function toSnakeCase(str: string): string {
  return str
    .replace(/([a-z])([A-Z])/g, '$1_$2')
    .replace(/\s+|-/g, '_')
    .toLowerCase();
}

/**
 * Capitalise la première lettre d'une chaîne
 * @param str - La chaîne à capitaliser
 * @returns La chaîne avec la première lettre en majuscule
 */
export function capitalize(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

/**
 * Tronque une chaîne à une longueur maximale
 * @param str - La chaîne à tronquer
 * @param maxLength - La longueur maximale
 * @param suffix - Le suffixe à ajouter si la chaîne est tronquée
 * @returns La chaîne tronquée
 */
export function truncate(str: string, maxLength: number, suffix = '...'): string {
  if (str.length <= maxLength) {
    return str;
  }
  return str.substring(0, maxLength - suffix.length) + suffix;
}

/**
 * Génère un slug à partir d'une chaîne
 * @param str - La chaîne à convertir en slug
 * @returns Le slug généré
 */
export function slugify(str: string): string {
  return str
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^\w-]+/g, '')
    .replace(/--+/g, '-')
    .replace(/^-+/, '')
    .replace(/-+$/, '');
}

/**
 * Vérifie si une chaîne est vide ou ne contient que des espaces
 * @param str - La chaîne à vérifier
 * @returns true si la chaîne est vide ou ne contient que des espaces
 */
export function isEmptyString(str: string): boolean {
  return str.trim() === '';
}

/**
 * Formate un nombre avec des séparateurs de milliers
 * @param num - Le nombre à formater
 * @param separator - Le séparateur de milliers
 * @returns Le nombre formaté
 */
export function formatNumber(num: number, separator = ','): string {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, separator);
}
