/**
 * Vérifie si le code s'exécute dans un environnement navigateur
 * @returns true si le code s'exécute dans un navigateur
 */
export const isBrowser = typeof window !== 'undefined';

/**
 * Vérifie si un élément est visible dans le viewport
 * @param element - L'élément DOM à vérifier
 * @param partiallyVisible - Si true, l'élément est considéré visible même s'il n'est que partiellement visible
 * @returns true si l'élément est visible
 */
export function isElementInViewport(element: HTMLElement, partiallyVisible = false): boolean {
  if (!isBrowser) return false;

  const rect = element.getBoundingClientRect();
  const windowHeight = window.innerHeight || document.documentElement.clientHeight;
  const windowWidth = window.innerWidth || document.documentElement.clientWidth;

  const vertInView = partiallyVisible
    ? rect.top <= windowHeight && rect.bottom >= 0
    : rect.top >= 0 && rect.bottom <= windowHeight;

  const horInView = partiallyVisible
    ? rect.left <= windowWidth && rect.right >= 0
    : rect.left >= 0 && rect.right <= windowWidth;

  return vertInView && horInView;
}

/**
 * Obtient la position d'un élément par rapport au document
 * @param element - L'élément DOM
 * @returns Un objet contenant les coordonnées top et left
 */
export function getElementOffset(element: HTMLElement): { top: number; left: number } {
  if (!isBrowser) return { top: 0, left: 0 };

  const rect = element.getBoundingClientRect();
  const scrollLeft = window.pageXOffset || document.documentElement.scrollLeft;
  const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

  return {
    top: rect.top + scrollTop,
    left: rect.left + scrollLeft,
  };
}

/**
 * Ajoute ou supprime une classe CSS d'un élément
 * @param element - L'élément DOM
 * @param className - La classe CSS à ajouter ou supprimer
 * @param condition - Si true, ajoute la classe, sinon la supprime
 */
export function toggleClass(element: HTMLElement, className: string, condition?: boolean): void {
  if (condition === undefined) {
    element.classList.toggle(className);
  } else if (condition) {
    element.classList.add(className);
  } else {
    element.classList.remove(className);
  }
}

/**
 * Obtient la taille de la fenêtre du navigateur
 * @returns Un objet contenant la largeur et la hauteur de la fenêtre
 */
export function getWindowSize(): { width: number; height: number } {
  if (!isBrowser) return { width: 0, height: 0 };

  return {
    width: window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth,
    height: window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight,
  };
}

/**
 * Vérifie si un élément contient un autre élément
 * @param parent - L'élément parent potentiel
 * @param child - L'élément enfant potentiel
 * @returns true si parent contient child
 */
export function containsElement(parent: HTMLElement, child: HTMLElement): boolean {
  return parent !== child && parent.contains(child);
}

/**
 * Obtient la position du curseur dans un champ de texte
 * @param input - L'élément input ou textarea
 * @returns La position du curseur
 */
export function getCursorPosition(input: HTMLInputElement | HTMLTextAreaElement): number {
  if (!isBrowser) return 0;
  return input.selectionStart || 0;
}

/**
 * Définit la position du curseur dans un champ de texte
 * @param input - L'élément input ou textarea
 * @param position - La position où placer le curseur
 */
export function setCursorPosition(input: HTMLInputElement | HTMLTextAreaElement, position: number): void {
  if (!isBrowser) return;
  input.setSelectionRange(position, position);
}

/**
 * Crée un ID unique pour les éléments DOM
 * @param prefix - Préfixe pour l'ID
 * @returns Un ID unique
 */
export function generateUniqueId(prefix = 'hopla-'): string {
  return `${prefix}${Math.random().toString(36).substring(2, 9)}`;
}
