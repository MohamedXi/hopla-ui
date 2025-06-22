import { Theme, ThemeOptions, createTheme } from '@hopla-ui/system';
import * as React from 'react';
import { FontLoader } from './FontLoader';
import { ThemeContext, ThemeContextType } from './ThemeContext';

export interface ThemeProviderProps {
  theme?: Theme | ThemeOptions;
  children: React.ReactNode;
  enableCssVariables?: boolean;
  cssVarPrefix?: string;
}

/**
 * ThemeProvider component for Hopla UI
 * Provides theme context to all child components
 * Uses the ThemeProvider from @hopla-ui/styles internally
 */
export const ThemeProvider: React.FC<ThemeProviderProps> = ({
  theme: themeProp,
  children,
  enableCssVariables = true,
  cssVarPrefix = '--hopla',
}) => {
  // Initialize with the provided theme or create a default theme
  const [themeOptions, setThemeOptions] = React.useState<ThemeOptions>(
    themeProp && 'colors' in themeProp ? {} : (themeProp as ThemeOptions) || {}
  );

  // Create the theme object
  const theme = React.useMemo(() => {
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
  const contextValue = React.useMemo(
    () => ({
      theme,
      updateTheme,
    }),
    [theme]
  );

  // Generate CSS variables from theme
  React.useEffect(() => {
    if (!enableCssVariables) return;

    // Clear existing variables
    const existingStyles = document.getElementById('hopla-theme-variables');
    if (existingStyles) {
      existingStyles.remove();
    }

    // Create style element
    const styleElement = document.createElement('style');
    styleElement.id = 'hopla-theme-variables';

    // Generate CSS variables
    let cssContent = ':root {';

    // Colors
    if (theme.colors) {
      Object.entries(theme.colors).forEach(([colorName, colorValue]) => {
        if (typeof colorValue === 'object') {
          Object.entries(colorValue).forEach(([shade, value]) => {
            cssContent += `  ${cssVarPrefix}-color-${colorName}-${shade}: ${value};`;
          });
        } else {
          cssContent += `  ${cssVarPrefix}-color-${colorName}: ${colorValue};`;
        }
      });
    }

    // Typography
    if (theme.typography) {
      Object.entries(theme.typography).forEach(([variant, styles]) => {
        Object.entries(styles).forEach(([property, value]) => {
          if (typeof value === 'string' || typeof value === 'number') {
            cssContent += `  ${cssVarPrefix}-typography-${variant}-${property}: ${value};`;
          }
        });
      });
    }

    // Spacing
    if (theme.spacing) {
      if (typeof theme.spacing === 'function') {
        for (let i = 0; i <= 10; i++) {
          cssContent += `  ${cssVarPrefix}-spacing-${i}: ${theme.spacing(i)}px;`;
        }
      } else if (typeof theme.spacing === 'number') {
        cssContent += `  ${cssVarPrefix}-spacing-base: ${theme.spacing}px;`;
      }
    }

    // Shape
    if (theme.shape) {
      Object.entries(theme.shape).forEach(([key, value]) => {
        cssContent += `  ${cssVarPrefix}-shape-${key}: ${value}px;`;
      });
    }

    // Breakpoints
    if (theme.breakpoints?.values) {
      Object.entries(theme.breakpoints.values).forEach(([key, value]) => {
        cssContent += `  ${cssVarPrefix}-breakpoint-${key}: ${value}px;`;
      });
    }

    // Transitions
    if (theme.transitions) {
      if (theme.transitions.duration) {
        Object.entries(theme.transitions.duration).forEach(([key, value]) => {
          cssContent += `  ${cssVarPrefix}-transition-duration-${key}: ${value}ms;`;
        });
      }
      if (theme.transitions.easing) {
        Object.entries(theme.transitions.easing).forEach(([key, value]) => {
          cssContent += `  ${cssVarPrefix}-transition-easing-${key}: ${value};`;
        });
      }
    }

    // Shadows
    if (theme.shadows) {
      Object.entries(theme.shadows).forEach(([key, value]) => {
        cssContent += `  ${cssVarPrefix}-shadow-${key}: ${value};`;
      });
    }

    cssContent += '}';

    // Ajouter une règle globale pour appliquer la police sans empattement à tous les éléments
    const fontFamily =
      theme.typography?.body1?.fontFamily ||
      '"Inter", "SF Pro Display", "Roboto", "Helvetica Neue", "Arial", sans-serif';
    const globalFontStyle = document.createElement('style');
    globalFontStyle.id = 'hopla-global-font';
    globalFontStyle.textContent = `
      html, body, button, input, select, textarea {
        font-family: ${fontFamily};
      }
    `;

    // Add the styles to the document
    styleElement.textContent = cssContent;
    document.head.appendChild(styleElement);

    // Add global font style if it doesn't exist
    const existingGlobalFont = document.getElementById('hopla-global-font');
    if (existingGlobalFont) {
      existingGlobalFont.remove();
    }
    document.head.appendChild(globalFontStyle);

    // Return cleanup function
    return () => {
      // Clean up on unmount
      if (styleElement.parentNode) {
        styleElement.parentNode.removeChild(styleElement);
      }
      // Clean up global font style
      const globalFont = document.getElementById('hopla-global-font');
      if (globalFont && globalFont.parentNode) {
        globalFont.parentNode.removeChild(globalFont);
      }
    };
  }, [theme, enableCssVariables, cssVarPrefix]);

  // Extraire les polices du thème pour les charger
  const fontFamily = theme.typography?.button?.fontFamily || '';
  const fontNames = fontFamily
    .split(',') // Séparer les différentes polices
    .map(font => font.trim().replace(/["']/g, '')) // Nettoyer les guillemets
    .filter(
      font => !font.includes('sans-serif') && !font.includes('Arial') && !font.includes('Helvetica')
    ); // Exclure les polices génériques

  return (
    <ThemeContext.Provider value={contextValue}>
      <FontLoader fonts={fontNames}>{children}</FontLoader>
    </ThemeContext.Provider>
  );
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
  const context = React.useContext(ThemeContext);
  // Si aucun ThemeProvider n'est trouvé, utiliser le thème par défaut au lieu de lancer une erreur
  return context || defaultThemeContext;
};
