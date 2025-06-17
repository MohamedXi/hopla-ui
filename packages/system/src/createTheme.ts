import { Theme, Colors, TypographyVariants, Breakpoints, Spacing, ZIndex } from './types';
import { defaultTheme } from './defaultTheme';
import deepmerge from 'deepmerge';

export interface ThemeOptions {
  colors?: Partial<Colors>;
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
}

/**
 * Crée un thème personnalisé en fusionnant les options fournies avec le thème par défaut
 * @param options - Options de personnalisation du thème
 * @returns Un thème personnalisé
 */
export function createTheme(options: ThemeOptions = {}): Theme {
  const {
    colors: colorsInput = {},
    typography: typographyInput = {},
    breakpoints: breakpointsInput = {},
    spacing: spacingInput,
    shadows: shadowsInput,
    zIndex: zIndexInput = {},
    shape: shapeInput = {},
    transitions: transitionsInput = {},
    ...other
  } = options;

  // Fusion profonde des options avec le thème par défaut
  const theme = deepmerge(
    defaultTheme,
    {
      colors: colorsInput,
      typography: typographyInput,
      breakpoints: breakpointsInput,
      spacing: spacingInput,
      shadows: shadowsInput,
      zIndex: zIndexInput,
      shape: shapeInput,
      transitions: transitionsInput,
      ...other,
    } as Theme,
    { clone: true }
  );

  return theme;
}
