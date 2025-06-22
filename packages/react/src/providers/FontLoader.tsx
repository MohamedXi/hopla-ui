import React from 'react';

export interface FontLoaderProps {
  /**
   * Polices à charger, dans l'ordre de préférence
   * Par défaut: Inter, SF Pro Display, Roboto, Helvetica Neue
   */
  fonts?: string[];
  /**
   * Poids des polices à charger
   * Par défaut: 300 (light), 400 (regular), 500 (medium), 600 (semibold), 700 (bold)
   */
  weights?: number[];
  /**
   * URL de base pour charger les polices
   * Par défaut: https://fonts.googleapis.com/css2
   */
  baseUrl?: string;
  /**
   * Contenu enfant à afficher
   */
  children: React.ReactNode;
}

/**
 * Composant pour charger les polices sans empattement nécessaires
 * Utilise Google Fonts par défaut, mais peut être configuré pour utiliser d'autres sources
 */
export const FontLoader: React.FC<FontLoaderProps> = ({
  fonts = ['Inter', 'Roboto'],
  weights = [300, 400, 500, 600, 700],
  baseUrl = 'https://fonts.googleapis.com/css2',
  children,
}) => {
  React.useEffect(() => {
    // Vérifier si le lien existe déjà
    const existingLink = document.getElementById('hopla-font-loader');
    if (existingLink) {
      return;
    }

    // Créer l'URL pour Google Fonts
    const fontFamilies = fonts.map(font => {
      // Formater le nom de la police pour l'URL (remplacer les espaces par +)
      const formattedName = font.replace(/\s+/g, '+');
      // Ajouter les poids de police
      const formattedWeights = weights.join(';');
      return `family=${formattedName}:wght@${formattedWeights}`;
    });

    // Créer le lien
    const link = document.createElement('link');
    link.id = 'hopla-font-loader';
    link.rel = 'stylesheet';
    link.href = `${baseUrl}?${fontFamilies.join('&')}&display=swap`;

    // Ajouter le lien au head
    document.head.appendChild(link);

    // Nettoyer lors du démontage
    return () => {
      const linkElement = document.getElementById('hopla-font-loader');
      if (linkElement && linkElement.parentNode) {
        linkElement.parentNode.removeChild(linkElement);
      }
    };
  }, [fonts, weights, baseUrl]);

  return <>{children}</>;
};

export default FontLoader;
