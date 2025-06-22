import { TypographyVariants } from './types';

// Définition des polices sans empattement par ordre de préférence
const DEFAULT_FONT_FAMILY = '"Inter", "SF Pro Display", "Roboto", "Helvetica Neue", "Arial", sans-serif';

// Définition des poids de police standard
const FONT_WEIGHTS = {
  light: 300,
  regular: 400,
  medium: 500,
  semiBold: 600,
  bold: 700,
};

/**
 * Crée un système de typographie cohérent pour le thème
 * @param fontFamily - Police principale à utiliser (par défaut: Inter et autres polices sans empattement)
 * @returns Un objet contenant les variantes typographiques
 */
export function createTypography(fontFamily = DEFAULT_FONT_FAMILY): TypographyVariants {
  return {
    h1: {
      fontFamily,
      fontWeight: FONT_WEIGHTS.light,
      fontSize: '6rem',
      lineHeight: 1.167,
      letterSpacing: '-0.01562em',
    },
    h2: {
      fontFamily,
      fontWeight: FONT_WEIGHTS.light,
      fontSize: '3.75rem',
      lineHeight: 1.2,
      letterSpacing: '-0.00833em',
    },
    h3: {
      fontFamily,
      fontWeight: FONT_WEIGHTS.regular,
      fontSize: '3rem',
      lineHeight: 1.167,
      letterSpacing: '0em',
    },
    h4: {
      fontFamily,
      fontWeight: FONT_WEIGHTS.regular,
      fontSize: '2.125rem',
      lineHeight: 1.235,
      letterSpacing: '0.00735em',
    },
    h5: {
      fontFamily,
      fontWeight: FONT_WEIGHTS.regular,
      fontSize: '1.5rem',
      lineHeight: 1.334,
      letterSpacing: '0em',
    },
    h6: {
      fontFamily,
      fontWeight: FONT_WEIGHTS.medium,
      fontSize: '1.25rem',
      lineHeight: 1.6,
      letterSpacing: '0.0075em',
    },
    subtitle1: {
      fontFamily,
      fontWeight: FONT_WEIGHTS.regular,
      fontSize: '1rem',
      lineHeight: 1.75,
      letterSpacing: '0.00938em',
    },
    subtitle2: {
      fontFamily,
      fontWeight: FONT_WEIGHTS.medium,
      fontSize: '0.875rem',
      lineHeight: 1.57,
      letterSpacing: '0.00714em',
    },
    body1: {
      fontFamily,
      fontWeight: FONT_WEIGHTS.regular,
      fontSize: '1rem',
      lineHeight: 1.5,
      letterSpacing: '0.00938em',
    },
    body2: {
      fontFamily,
      fontWeight: FONT_WEIGHTS.regular,
      fontSize: '0.875rem',
      lineHeight: 1.43,
      letterSpacing: '0.01071em',
    },
    button: {
      fontFamily,
      fontWeight: FONT_WEIGHTS.medium,
      fontSize: '0.875rem',
      lineHeight: 1.75,
      letterSpacing: '0.02857em',
      textTransform: 'uppercase' as const,
    },
    caption: {
      fontFamily,
      fontWeight: FONT_WEIGHTS.regular,
      fontSize: '0.75rem',
      lineHeight: 1.66,
      letterSpacing: '0.03333em',
    },
    overline: {
      fontFamily,
      fontWeight: FONT_WEIGHTS.regular,
      fontSize: '0.75rem',
      lineHeight: 2.66,
      letterSpacing: '0.08333em',
      textTransform: 'uppercase' as const,
    },
  };
}
