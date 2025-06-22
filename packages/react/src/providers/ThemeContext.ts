import React from 'react';
import { Theme, ThemeOptions, createTheme } from '@hopla-ui/system';

/**
 * Interface pour le contexte de thème
 */
export interface ThemeContextType {
  /** Le thème actuel */
  theme: Theme;
  /** Fonction pour mettre à jour le thème */
  updateTheme: (options: ThemeOptions) => void;
}

/**
 * Thème par défaut utilisé lorsque le hook useTheme est appelé en dehors d'un ThemeProvider
 */
export const defaultTheme = createTheme();

/**
 * Contexte React pour le thème
 */
export const ThemeContext = React.createContext<ThemeContextType | undefined>(undefined);

ThemeContext.displayName = 'HoplaThemeContext';
