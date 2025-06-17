import { Spacing } from './types';

/**
 * Crée une fonction d'espacement pour maintenir une mise en page cohérente
 * @param spacingUnit - L'unité de base pour l'espacement (par défaut 8px)
 * @returns Une fonction d'espacement
 */
export function createSpacing(spacingUnit = 8): Spacing {
  const spacing = (...args: number[]): string => {
    if (args.length === 0) {
      return '0px';
    }

    return args
      .map(factor => {
        if (factor === 0) {
          return '0px';
        }
        return `${factor * spacingUnit}px`;
      })
      .join(' ');
  };

  return spacing as Spacing;
}
