import { Theme as SystemTheme } from '@hopla-ui/system';
import { ExtendedColors, Theme } from './themeTypes';

/**
 * Adapte un thème système en thème étendu
 * @param systemTheme Le thème système à adapter
 * @returns Un thème étendu
 */
export function adaptSystemTheme(systemTheme: SystemTheme): Theme {
  // Assurer que colors est compatible avec ExtendedColors
  const extendedColors: ExtendedColors = systemTheme.colors as unknown as ExtendedColors;

  return {
    ...systemTheme,
    palette: {
      ...systemTheme.palette,
      mode: 'light', // Valeur par défaut
    },
    colors: extendedColors,
    lightTheme: {},
    darkTheme: {},
  };
}

/**
 * Vérifie si un thème est un thème étendu
 * @param theme Le thème à vérifier
 * @returns true si le thème est un thème étendu
 */
export function isExtendedTheme(theme: SystemTheme | Theme): theme is Theme {
  return Boolean(
    'lightTheme' in theme ||
      'darkTheme' in theme ||
      ('palette' in theme && theme.palette && 'mode' in theme.palette)
  );
}

/**
 * Convertit un thème en thème étendu si nécessaire
 * @param theme Le thème à convertir
 * @returns Un thème étendu
 */
export function ensureExtendedTheme(theme: SystemTheme | Theme): Theme {
  if (isExtendedTheme(theme)) {
    return theme;
  }
  return adaptSystemTheme(theme);
}
