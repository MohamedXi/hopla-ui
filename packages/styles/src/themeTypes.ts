import { Colors as SystemColors, Theme as SystemTheme } from '@hopla-ui/system';

/**
 * Type pour les couleurs du thème étendu
 */
export interface ExtendedColors extends SystemColors {
  [key: string]: any;
}

/**
 * Extension de l'interface PaletteOptions pour inclure le mode
 */
export interface ExtendedPaletteOptions {
  mode?: 'light' | 'dark';
  [key: string]: any;
}

/**
 * Extension de l'interface Theme pour inclure les thèmes light et dark
 */
export interface Theme extends SystemTheme {
  palette: SystemTheme['palette'] & ExtendedPaletteOptions;
  lightTheme?: Record<string, string>;
  darkTheme?: Record<string, string>;
  colors: ExtendedColors;
}

/**
 * Options pour le ThemeProvider
 */
export interface ThemeProviderOptions {
  enableCssVariables?: boolean;
  cssVarPrefix?: string;
}

/**
 * Type pour les variables CSS générées
 */
export type CSSVariables = Record<string, string>;
