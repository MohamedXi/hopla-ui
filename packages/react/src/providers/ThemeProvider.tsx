import { Theme, ThemeOptions, createTheme } from '@hopla-ui/system';
import React, { createContext, useContext, useMemo } from 'react';

export interface ThemeContextType {
  theme: Theme;
  updateTheme: (options: ThemeOptions) => void;
}

export const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export interface ThemeProviderProps {
  theme?: Theme | ThemeOptions;
  children: React.ReactNode;
}

/**
 * ThemeProvider component for Hopla UI
 * Provides theme context to all child components
 */
export const ThemeProvider: React.FC<ThemeProviderProps> = ({ theme: themeProp, children }) => {
  // Initialize with the provided theme or create a default theme
  const [themeOptions, setThemeOptions] = React.useState<ThemeOptions>(
    themeProp && 'colors' in themeProp ? {} : (themeProp as ThemeOptions) || {}
  );

  // Create the theme object
  const theme = useMemo(() => {
    return 'colors' in (themeProp || {}) ? (themeProp as Theme) : createTheme(themeOptions);
  }, [themeProp, themeOptions]);

  // Function to update theme
  const updateTheme = (newOptions: ThemeOptions) => {
    setThemeOptions(prevOptions => ({
      ...prevOptions,
      ...newOptions,
    }));
  };

  // Create context value
  const contextValue = useMemo(
    () => ({
      theme,
      updateTheme,
    }),
    [theme]
  );

  // Generate CSS variables from theme
  React.useEffect(() => {
    // Apply CSS variables to :root
    const root = document.documentElement;

    // Colors
    Object.entries(theme.colors).forEach(([colorName, colorValue]) => {
      if (typeof colorValue === 'object') {
        Object.entries(colorValue).forEach(([shade, value]) => {
          root.style.setProperty(`--hopla-${colorName}-${shade}`, String(value));
        });
      } else {
        root.style.setProperty(`--hopla-${colorName}`, String(colorValue));
      }
    });

    // Typography
    Object.entries(theme.typography).forEach(([variant, styles]) => {
      Object.entries(styles).forEach(([property, value]) => {
        if (typeof value === 'string' || typeof value === 'number') {
          root.style.setProperty(`--hopla-typography-${variant}-${property}`, value.toString());
        }
      });
    });

    // Spacing
    root.style.setProperty('--hopla-shape-borderRadius', `${theme.shape.borderRadius}px`);

    // Transitions
    Object.entries(theme.transitions.easing).forEach(([name, value]) => {
      root.style.setProperty(`--hopla-transitions-easing-${name}`, value);
    });
    Object.entries(theme.transitions.duration).forEach(([name, value]) => {
      root.style.setProperty(`--hopla-transitions-duration-${name}`, `${value}ms`);
    });
  }, [theme]);

  return <ThemeContext.Provider value={contextValue}>{children}</ThemeContext.Provider>;
};

// Créer un thème par défaut singleton pour éviter de recréer le thème à chaque appel
const defaultThemeContext: ThemeContextType = (() => {
  const defaultTheme = createTheme({});
  return {
    theme: defaultTheme,
    updateTheme: (_options: ThemeOptions) => {
      console.warn(
        'updateTheme is not available outside of a ThemeProvider. Use ThemeProvider to enable theme customization.'
      );
    },
  };
})();

/**
 * Hook to access the theme context
 * If used outside of a ThemeProvider, returns a default theme
 */
export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  // Si aucun ThemeProvider n'est trouvé, utiliser le thème par défaut au lieu de lancer une erreur
  return context || defaultThemeContext;
};
