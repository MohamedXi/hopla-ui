import React from 'react';
import { Theme } from './themeTypes';
import { ensureExtendedTheme } from './themeAdapter';
import { SxProps } from './types';

/**
 * Récupère une valeur imbriquée dans un objet en utilisant un chemin sous forme de chaîne
 * @param obj L'objet dans lequel chercher
 * @param path Le chemin de la valeur (ex: 'palette.primary.main')
 * @returns La valeur trouvée ou undefined si non trouvée
 */
function getNestedValue(obj: Record<string, any>, path: string): any {
  const keys = path.split('.');
  let result = obj;

  for (const key of keys) {
    if (result === undefined || result === null) {
      return undefined;
    }
    result = result[key];
  }

  return result;
}

/**
 * Traite les propriétés sx et les convertit en styles CSS
 * @param sx - Les propriétés sx à traiter
 * @param theme - Le thème actuel
 * @returns Les styles CSS calculés
 */
export function processSxProps(sx: SxProps, theme: Theme): React.CSSProperties {
  // S'assurer que le thème est un thème étendu
  const extendedTheme = ensureExtendedTheme(theme);
  if (!sx || typeof sx !== 'object') {
    return {};
  }

  const result: Record<string, string | number> = {};

  // Traiter chaque propriété sx
  Object.entries(sx).forEach(([key, value]) => {
    // Traiter les propriétés spéciales
    if (key.startsWith('&:') || key.startsWith('&::') || key.startsWith('@media')) {
      // Les pseudo-classes, pseudo-éléments et media queries sont ignorés ici
      // car ils nécessitent une solution CSS-in-JS plus avancée
      return;
    }

    // Traiter les raccourcis de margin et padding
    if (key === 'm' || key === 'margin') {
      result.margin = resolveSpacing(value, extendedTheme);
      return;
    }
    if (key === 'mt' || key === 'marginTop') {
      result.marginTop = resolveSpacing(value, theme);
      return;
    }
    if (key === 'mr' || key === 'marginRight') {
      result.marginRight = resolveSpacing(value, theme);
      return;
    }
    if (key === 'mb' || key === 'marginBottom') {
      result.marginBottom = resolveSpacing(value, theme);
      return;
    }
    if (key === 'ml' || key === 'marginLeft') {
      result.marginLeft = resolveSpacing(value, theme);
      return;
    }
    if (key === 'mx' || key === 'marginX') {
      result.marginLeft = resolveSpacing(value, theme);
      result.marginRight = resolveSpacing(value, theme);
      return;
    }
    if (key === 'my' || key === 'marginY') {
      result.marginTop = resolveSpacing(value, theme);
      result.marginBottom = resolveSpacing(value, theme);
      return;
    }

    if (key === 'p' || key === 'padding') {
      result.padding = resolveSpacing(value, extendedTheme);
      return;
    }
    if (key === 'pt' || key === 'paddingTop') {
      result.paddingTop = resolveSpacing(value, theme);
      return;
    }
    if (key === 'pr' || key === 'paddingRight') {
      result.paddingRight = resolveSpacing(value, theme);
      return;
    }
    if (key === 'pb' || key === 'paddingBottom') {
      result.paddingBottom = resolveSpacing(value, theme);
      return;
    }
    if (key === 'pl' || key === 'paddingLeft') {
      result.paddingLeft = resolveSpacing(value, theme);
      return;
    }
    if (key === 'px' || key === 'paddingX') {
      result.paddingLeft = resolveSpacing(value, theme);
      result.paddingRight = resolveSpacing(value, theme);
      return;
    }
    if (key === 'py' || key === 'paddingY') {
      result.paddingTop = resolveSpacing(value, theme);
      result.paddingBottom = resolveSpacing(value, theme);
      return;
    }

    // Traiter les raccourcis de couleur
    if (key === 'color' && typeof value === 'string' && value.startsWith('theme.')) {
      const colorPath = value.substring(6); // Enlever 'theme.'
      const color = getNestedValue(extendedTheme, colorPath);
      if (color) {
        result.color = color;
      }
      return;
    }

    if (key === 'bgcolor' || key === 'backgroundColor') {
      if (typeof value === 'string' && value.startsWith('theme.')) {
        const colorPath = value.substring(6); // Enlever 'theme.'
        const color = getNestedValue(extendedTheme, colorPath);
        if (color) {
          result.backgroundColor = color;
        }
        return;
      }
      result.backgroundColor = value as string;
      return;
    }
    if (key === 'color') {
      result.color = resolveColor(value, theme);
      return;
    }

    // Ajouter la propriété telle quelle si aucun traitement spécial n'est nécessaire
    result[key as keyof React.CSSProperties] = value as string | number;
  });

  return result as React.CSSProperties;
}

/**
 * Résout une valeur d'espacement en utilisant le système d'espacement du thème
 * @param value - La valeur d'espacement à résoudre
 * @param theme - Le thème actuel
 * @returns La valeur d'espacement résolue
 */
function resolveSpacing(value: number | string, theme: Theme): string {
  if (typeof value === 'number' && theme.spacing && typeof theme.spacing === 'function') {
    return theme.spacing(value);
  }
  return typeof value === 'string' ? value : `${value}px`;
}

/**
 * Résout une valeur de couleur en utilisant le système de couleurs du thème
 * @param value - La valeur de couleur à résoudre
 * @param theme - Le thème actuel
 * @returns La valeur de couleur résolue
 */
function resolveColor(value: string, theme: Theme): string {
  // Si la valeur est une référence à une couleur du thème (ex: "primary.main")
  if (typeof value === 'string' && value.includes('.')) {
    const [paletteKey, colorKey] = value.split('.');

    if (
      theme.palette &&
      paletteKey in theme.palette &&
      typeof theme.palette[paletteKey] === 'object' &&
      theme.palette[paletteKey] !== null &&
      colorKey in (theme.palette[paletteKey] as Record<string, string>)
    ) {
      return (theme.palette[paletteKey] as Record<string, string>)[colorKey];
    }
  }

  // Si la valeur est une référence à une couleur simple du thème
  if (
    typeof value === 'string' &&
    theme.colors &&
    typeof theme.colors === 'object' &&
    value in theme.colors
  ) {
    return theme.colors[value] as string;
  }

  // Retourner la valeur telle quelle si elle n'est pas trouvée dans le thème
  return value;
}
