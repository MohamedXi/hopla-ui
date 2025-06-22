import * as React from 'react';
import { CSSVariables, Theme, ThemeProviderOptions } from './themeTypes';

const { createContext, useEffect, useMemo } = React;

// Création du contexte pour le thème
export const ThemeContext = createContext<Theme>({} as Theme);

/**
 * Propriétés du ThemeProvider
 */
interface ThemeProviderProps extends ThemeProviderOptions {
  /**
   * Le thème à utiliser
   */
  theme: Theme;
  /**
   * Les enfants à rendre
   */
  children: React.ReactNode;
}

/**
 * Composant ThemeProvider pour fournir le thème via contexte
 * @param props Les propriétés du composant
 */
export function ThemeProvider({
  theme,
  children,
  enableCssVariables = true,
  cssVarPrefix = '--hopla',
}: ThemeProviderProps) {
  // Mémoriser le contexte pour éviter les re-rendus inutiles
  const themeContextValue = useMemo(() => theme, [theme]);

  // Appliquer les variables CSS au document
  useEffect(() => {
    if (!enableCssVariables) return;

    // Générer les variables CSS pour le thème principal
    const baseVariables = themeToVariables(theme, cssVarPrefix);

    // Générer les variables CSS pour les modes light et dark si disponibles
    const isLightMode = theme.palette?.mode === 'light';
    const isDarkMode = theme.palette?.mode === 'dark';

    let lightVariables: CSSVariables = {};
    let darkVariables: CSSVariables = {};

    if (isLightMode || theme.lightTheme) {
      const lightThemeSource = isLightMode ? theme : theme.lightTheme;
      if (lightThemeSource) {
        lightVariables = themeToVariables(lightThemeSource as Theme, cssVarPrefix, 'light');
      }
    }

    if (isDarkMode || theme.darkTheme) {
      const darkThemeSource = isDarkMode ? theme : theme.darkTheme;
      if (darkThemeSource) {
        darkVariables = themeToVariables(darkThemeSource as Theme, cssVarPrefix, 'dark');
      }
    }

    // Appliquer les variables CSS
    const allVariables = { ...baseVariables, ...lightVariables, ...darkVariables };
    applyVariablesToDocument(allVariables);

    // Ajouter des styles pour le mode sombre si disponible
    if (Object.keys(darkVariables).length > 0) {
      const darkModeSelector = '@media (prefers-color-scheme: dark)';
      applyVariablesToDocument(darkVariables, `${darkModeSelector} :root`);
    }
  }, [theme, enableCssVariables, cssVarPrefix]);

  return React.createElement(ThemeContext.Provider, { value: themeContextValue }, children);
}

/**
 * Applique les variables CSS à l'élément :root ou au sélecteur spécifié
 * @param variables Les variables CSS à appliquer
 * @param selector Sélecteur CSS pour appliquer les variables
 */
function applyVariablesToDocument(variables: CSSVariables, selector = ':root') {
  if (typeof document === 'undefined') return;

  // Créer ou mettre à jour l'élément style pour les variables CSS
  let styleElement = document.getElementById('hopla-theme-variables');
  if (!styleElement) {
    styleElement = document.createElement('style');
    styleElement.id = 'hopla-theme-variables';
    document.head.appendChild(styleElement);
  }

  // Générer le contenu CSS
  const cssContent = `${selector} {\n${Object.entries(variables)
    .map(([key, value]) => `  ${key}: ${value};`)
    .join('\n')}\n}`;

  styleElement.textContent = cssContent;
}

/**
 * Convertit un objet de thème en variables CSS
 * @param theme Le thème à convertir
 * @param prefix Préfixe pour les variables CSS
 * @param mode Mode du thème (light ou dark)
 * @returns Un objet de variables CSS
 */
function themeToVariables(theme: Theme, prefix = '--hopla', mode?: 'light' | 'dark'): CSSVariables {
  const variables: Record<string, string> = {};
  const modePrefix = mode ? `${prefix}-${mode}` : prefix;

  // Traiter les couleurs
  if (theme.colors) {
    Object.entries(theme.colors).forEach(([key, value]) => {
      variables[`${modePrefix}-color-${key}`] = value;
    });
  }

  // Traiter la palette
  if (theme.palette) {
    Object.entries(theme.palette).forEach(([key, value]) => {
      if (typeof value === 'object') {
        Object.entries(value).forEach(([subKey, subValue]) => {
          if (typeof subValue === 'string') {
            variables[`${modePrefix}-palette-${key}-${subKey}`] = subValue;
          }
        });
      }
    });
  }

  // Traiter la typographie
  if (theme.typography) {
    Object.entries(theme.typography).forEach(([key, value]) => {
      if (typeof value === 'object') {
        Object.entries(value).forEach(([subKey, subValue]) => {
          variables[`${modePrefix}-typography-${key}-${subKey}`] = String(subValue);
        });
      } else if (typeof value === 'string' || typeof value === 'number') {
        variables[`${modePrefix}-typography-${key}`] = String(value);
      }
    });
  }

  // Traiter les espacements
  if (theme.spacing) {
    if (typeof theme.spacing === 'function') {
      // Si spacing est une fonction, créer quelques variables prédéfinies
      for (let i = 0; i <= 10; i++) {
        variables[`${modePrefix}-spacing-${i}`] = String(theme.spacing(i));
      }
    } else if (typeof theme.spacing === 'number') {
      variables[`${modePrefix}-spacing-base`] = String(theme.spacing);
    }
  }

  // Traiter les breakpoints
  if (theme.breakpoints?.values) {
    Object.entries(theme.breakpoints.values).forEach(([key, value]) => {
      variables[`${modePrefix}-breakpoint-${key}`] = `${value}px`;
    });
  }

  // Traiter les transitions
  if (theme.transitions) {
    if (theme.transitions.duration) {
      Object.entries(theme.transitions.duration).forEach(([key, value]) => {
        variables[`${modePrefix}-transition-duration-${key}`] = `${value}ms`;
      });
    }
    if (theme.transitions.easing) {
      Object.entries(theme.transitions.easing).forEach(([key, value]) => {
        variables[`${modePrefix}-transition-easing-${key}`] = value;
      });
    }
  }

  // Traiter les ombres
  if (theme.shadows) {
    Object.entries(theme.shadows).forEach(([key, value]) => {
      variables[`${modePrefix}-shadow-${key}`] = value;
    });
  }

  // Traiter les formes
  if (theme.shape) {
    Object.entries(theme.shape).forEach(([key, value]) => {
      variables[`${modePrefix}-shape-${key}`] =
        typeof value === 'number' ? `${value}rem` : String(value);
    });
  }

  return variables;
}
