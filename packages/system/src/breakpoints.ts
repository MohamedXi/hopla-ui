import { Breakpoints, BreakpointValues } from './types';

/**
 * Crée un objet de points de rupture pour les requêtes média
 * @returns Un objet contenant les points de rupture et les fonctions utilitaires
 */
export function createBreakpoints(): Breakpoints {
  const values: BreakpointValues = {
    xs: 0,
    sm: 600,
    md: 900,
    lg: 1200,
    xl: 1536,
  };

  const up = (key: keyof BreakpointValues): string => {
    return `@media (min-width:${values[key]}px)`;
  };

  const down = (key: keyof BreakpointValues): string => {
    const value = values[key];
    return `@media (max-width:${value - 0.05}px)`;
  };

  const between = (start: keyof BreakpointValues, end: keyof BreakpointValues): string => {
    return `@media (min-width:${values[start]}px) and (max-width:${values[end] - 0.05}px)`;
  };

  const only = (key: keyof BreakpointValues): string => {
    const keys = Object.keys(values) as (keyof BreakpointValues)[];
    const keyIndex = keys.indexOf(key);
    
    if (keyIndex === keys.length - 1) {
      return up(key);
    }

    const nextKey = keys[keyIndex + 1];
    return between(key, nextKey);
  };

  return {
    values,
    up,
    down,
    between,
    only,
  };
}
