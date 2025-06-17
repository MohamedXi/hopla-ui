import React, { createContext, useContext } from 'react';
import { Theme, defaultTheme } from '@hopla-ui/system';
import { ThemeProviderProps } from '../types';

// Création du contexte de thème avec le thème par défaut
export const ThemeContext = createContext<Theme>(defaultTheme);

/**
 * Hook pour accéder au thème actuel
 * @returns Le thème actuel
 */
export function useTheme(): Theme {
  return useContext(ThemeContext);
}

/**
 * Composant qui fournit le thème à tous les composants enfants
 * @param props - Props du composant
 * @returns Composant React
 */
export function ThemeProvider({ theme, children }: ThemeProviderProps): JSX.Element {
  return (
    <ThemeContext.Provider value={theme}>
      {children}
    </ThemeContext.Provider>
  );
}

/**
 * Composant d'ordre supérieur pour injecter le thème dans un composant
 * @param Component - Composant à envelopper
 * @returns Composant enveloppé avec le thème
 */
export function withTheme<T extends { theme?: Theme }>(
  Component: React.ComponentType<T>
): React.FC<Omit<T, 'theme'>> {
  const WithTheme = (props: Omit<T, 'theme'>) => {
    const theme = useTheme();
    return <Component {...(props as T)} theme={theme} />;
  };

  WithTheme.displayName = `WithTheme(${Component.displayName || Component.name || 'Component'})`;
  
  return WithTheme;
}
