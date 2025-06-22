import { useContext } from 'react';
import { Theme } from '@hopla-ui/system';
import { ThemeContext } from './ThemeProvider';

/**
 * Hook pour accéder au thème actuel dans les composants
 * @returns Le thème actuel
 */
export function useTheme(): Theme {
  const theme = useContext(ThemeContext);
  
  if (!theme) {
    throw new Error(
      'useTheme: `theme` est undefined. Assurez-vous que le composant est enveloppé dans un <ThemeProvider>'
    );
  }
  
  return theme;
}
