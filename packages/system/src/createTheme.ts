import deepmerge from 'deepmerge';

import { createDarkTheme } from './darkTheme';
import { defaultTheme } from './defaultTheme';
import {
  Breakpoints,
  Colors,
  PaletteOptions,
  Spacing,
  Theme,
  ThemeMode,
  TypographyVariants,
  ZIndex,
} from './types';

export interface ThemeOptions {
  mode?: ThemeMode;
  colors?: Partial<Colors>;
  palette?: PaletteOptions;
  typography?: Partial<TypographyVariants>;
  breakpoints?: Partial<Breakpoints>;
  spacing?: Spacing;
  shadows?: string[];
  zIndex?: Partial<ZIndex>;
  shape?: {
    borderRadius?: number;
  };
  transitions?: {
    easing?: {
      easeInOut?: string;
      easeOut?: string;
      easeIn?: string;
      sharp?: string;
    };
    duration?: {
      shortest?: number;
      shorter?: number;
      short?: number;
      standard?: number;
      complex?: number;
      enteringScreen?: number;
      leavingScreen?: number;
    };
  };
  /** Active les variables CSS pour le thème */
  cssVariables?: boolean;
  /** Options personnalisées qui peuvent être ajoutées par l'utilisateur */
  components?: Record<string, unknown>;
}

/**
 * Crée un thème personnalisé en fusionnant les options fournies avec le thème par défaut
 * @param options - Options de personnalisation du thème
 * @returns Un thème personnalisé
 */
export function createTheme(options: ThemeOptions = {}): Theme {
  const {
    mode = 'light',
    colors: colorsInput = {},
    palette: paletteInput = {},
    typography: typographyInput = {},
    breakpoints: breakpointsInput = {},
    spacing: spacingInput,
    shadows: shadowsInput,
    zIndex: zIndexInput = {},
    shape: shapeInput = {},
    transitions: transitionsInput = {},
    cssVariables = false,
    components = {},
    ...other
  } = options;

  // Sélectionner le thème de base en fonction du mode
  const baseTheme = mode === 'dark' ? createDarkTheme() : defaultTheme;

  // Fusion profonde des options avec le thème par défaut
  const theme = deepmerge(
    baseTheme,
    {
      mode,
      colors: colorsInput,
      palette: paletteInput,
      typography: typographyInput,
      breakpoints: breakpointsInput,
      spacing: spacingInput,
      shadows: shadowsInput,
      zIndex: zIndexInput,
      shape: shapeInput,
      transitions: transitionsInput,
      cssVariables,
      components,
      ...other,
    } as Theme,
    { clone: true }
  );

  return theme;
}

/**
 * Crée un thème réactif avec des tailles de police adaptatives
 * @param theme - Le thème à rendre réactif
 * @param options - Options pour la configuration des tailles de police réactives
 * @returns Un thème avec des tailles de police réactives
 */
export function createResponsiveTheme(theme: Theme, options: ResponsiveThemeOptions = {}): Theme {
  const {
    breakpoints = ['sm', 'md', 'lg'],
    factor = 2,
    variants = [
      'h1',
      'h2',
      'h3',
      'h4',
      'h5',
      'h6',
      'subtitle1',
      'subtitle2',
      'body1',
      'body2',
      'button',
      'caption',
      'overline',
    ],
  } = options;

  const responsiveTheme = { ...theme };

  // Ajuster les tailles de police pour chaque point de rupture
  variants.forEach(variant => {
    const typography =
      responsiveTheme.typography[variant as keyof typeof responsiveTheme.typography];
    if (!typography || !typography.fontSize) return;

    // Convertir la taille de police en nombre (sans unité)
    const baseFontSize = parseFloat(typography.fontSize.toString());

    // Créer des règles CSS media query pour chaque point de rupture
    breakpoints.forEach((breakpoint, index) => {
      // Calculer le facteur d'échelle en fonction de l'index du point de rupture
      const scaleFactor = 1 + (breakpoints.length - index - 1) * (factor / 10);

      // Ajouter des règles responsives au thème
      if (!responsiveTheme.typography.responsive) {
        responsiveTheme.typography.responsive = {};
      }

      if (!responsiveTheme.typography.responsive[variant]) {
        responsiveTheme.typography.responsive[variant] = {};
      }

      if (responsiveTheme.typography.responsive) {
        // Utilisation d'assertion de type pour éviter l'erreur
        const responsiveTypography = responsiveTheme.typography.responsive as Record<
          string,
          Record<string, Partial<React.CSSProperties>>
        >;

        responsiveTypography[variant] = responsiveTypography[variant] || {};
        responsiveTypography[variant][breakpoint] = {
          fontSize: `${baseFontSize / scaleFactor}rem`,
        };
      }
    });
  });

  return responsiveTheme;
}

export interface ResponsiveThemeOptions {
  /** Points de rupture à utiliser pour les tailles de police réactives */
  breakpoints?: Array<'xs' | 'sm' | 'md' | 'lg' | 'xl'>;
  /** Facteur d'échelle pour les tailles de police (plus le facteur est élevé, plus la différence entre les tailles d'écran est grande) */
  factor?: number;
  /** Variantes typographiques à rendre réactives */
  variants?: string[];
}
