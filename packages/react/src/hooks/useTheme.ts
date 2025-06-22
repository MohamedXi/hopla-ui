import { ThemeOptions, createTheme } from '@hopla-ui/system';
import { useContext } from 'react';
import { ThemeContext } from '../providers';

// Thème par défaut utilisé lorsque le hook est appelé en dehors d'un ThemeProvider
const fallbackTheme = createTheme();

/**
 * Hook pour accéder au thème courant et à la fonction de mise à jour du thème
 * @returns Un objet contenant le thème courant et la fonction pour le mettre à jour
 */
export const useTheme = () => {
  const context = useContext(ThemeContext);
  
  // Si le hook est utilisé en dehors d'un ThemeProvider, retourner le thème par défaut
  if (!context) {
    return {
      theme: fallbackTheme,
      updateTheme: (_options: ThemeOptions) => {
        console.warn(
          'useTheme: Tentative de mise à jour du thème en dehors d\'un ThemeProvider. ' +
          'Assurez-vous que votre composant est enveloppé dans un ThemeProvider.'
        );
      },
    };
  }
  
  return context;
};

/**
 * Hook pour accéder aux polices configurées dans le thème
 * @returns Un objet contenant les informations sur les polices du thème
 */
export const useFonts = () => {
  const { theme } = useTheme();
  
  // Extraire les polices du thème
  const fontFamily = theme.typography?.body1?.fontFamily || '';
  
  // Traiter les polices uniquement si fontFamily est une chaîne de caractères
  const fontNames = typeof fontFamily === 'string'
    ? fontFamily
        .split(',') // Séparer les différentes polices
        .map((font: string) => font.trim().replace(/["']/g, '')) // Nettoyer les guillemets
        .filter((font: string) => 
          !font.includes('sans-serif') && 
          !font.includes('Arial') && 
          !font.includes('Helvetica')
        ) // Exclure les polices génériques
    : [];
  
  const primaryFont = fontNames[0] || 'Inter';
  
  return {
    fontFamily,
    primaryFont,
    fontNames,
    // Helpers pour les poids de police
    fontWeights: {
      light: 300,
      regular: 400,
      medium: 500,
      semiBold: 600,
      bold: 700,
    },
  };
};

export default useTheme;
