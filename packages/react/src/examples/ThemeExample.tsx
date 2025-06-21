import { createResponsiveTheme, createTheme } from '@hopla-ui/system';
import React from 'react';
import { hoplaVar } from '../hooks/useHoplaStyles';
import { ThemeProvider, useTheme } from '../providers/ThemeProvider';

/**
 * Exemple de composant qui utilise le thème
 */
const ThemedButton: React.FC<React.ButtonHTMLAttributes<HTMLButtonElement>> = props => {
  const { theme } = useTheme();

  const buttonStyle: React.CSSProperties = {
    backgroundColor: theme.colors.primary[500],
    color: theme.colors.common.white,
    padding: '8px 16px',
    border: 'none',
    borderRadius: `${theme.shape.borderRadius}px`,
    cursor: 'pointer',
    transition: `background-color ${theme.transitions.duration.short}ms ${theme.transitions.easing.easeInOut}`,
  };

  const hoverStyle: React.CSSProperties = {
    backgroundColor: theme.colors.primary[700],
  };

  return (
    <button
      style={buttonStyle}
      onMouseOver={e => {
        (e.target as HTMLButtonElement).style.backgroundColor = theme.colors.primary[700];
      }}
      onMouseOut={e => {
        (e.target as HTMLButtonElement).style.backgroundColor = theme.colors.primary[500];
      }}
      {...props}
    />
  );
};

/**
 * Exemple de composant qui utilise les variables CSS du thème
 */
const CssVarButton: React.FC<React.ButtonHTMLAttributes<HTMLButtonElement>> = props => {
  // Utilisation des variables CSS du thème
  const buttonStyle: React.CSSProperties = {
    backgroundColor: hoplaVar('colors.primary.500'),
    color: hoplaVar('colors.common.white'),
    padding: '8px 16px',
    border: 'none',
    borderRadius: hoplaVar('shape.borderRadius'),
    cursor: 'pointer',
    transition: `background-color ${hoplaVar('transitions.duration.short')} ${hoplaVar('transitions.easing.easeInOut')}`,
  };

  return <button style={buttonStyle} {...props} />;
};

/**
 * Exemple de composant qui permet de basculer entre le mode clair et le mode sombre
 */
const ThemeToggle: React.FC = () => {
  const { theme, updateTheme } = useTheme();

  const toggleTheme = () => {
    updateTheme({ mode: theme.mode === 'light' ? 'dark' : 'light' });
  };

  return (
    <button onClick={toggleTheme}>
      Basculer en mode {theme.mode === 'light' ? 'sombre' : 'clair'}
    </button>
  );
};

/**
 * Exemple d'utilisation du système de theming Hopla UI
 */
export const ThemeExample: React.FC = () => {
  // Création d'un thème personnalisé
  const customTheme = createTheme({
    mode: 'light',
    colors: {
      primary: {
        // Remplacer seulement certaines nuances de la couleur primaire
        500: '#1976d2', // Bleu
        700: '#0d47a1',
      } as any, // Type assertion nécessaire car nous ne fournissons pas toutes les nuances
    },
    // Personnalisation de la typographie
    typography: {
      h1: {
        fontSize: '2.5rem',
        fontWeight: 600,
        lineHeight: 1.2,
      },
    },
    // Personnalisation de la forme
    shape: {
      borderRadius: 8, // Coins plus arrondis
    },
    // Activation des variables CSS
    cssVariables: true,
    // Options personnalisées pour les composants spécifiques
    components: {
      Button: {
        defaultProps: {
          size: 'medium',
          variant: 'contained',
        },
        styleOverrides: {
          root: {
            textTransform: 'none',
          },
        },
      },
    },
  });

  // Création d'un thème avec des tailles de police responsives
  const responsiveTheme = createResponsiveTheme(customTheme, {
    factor: 2.5, // Facteur d'échelle plus élevé pour une plus grande différence entre les tailles d'écran
    breakpoints: ['xs', 'sm', 'md', 'lg', 'xl'],
  });

  return (
    <ThemeProvider theme={responsiveTheme}>
      <div style={{ padding: '20px' }}>
        <h1>Exemple de système de theming Hopla UI</h1>

        <div style={{ marginBottom: '20px' }}>
          <ThemeToggle />
        </div>

        <div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
          <ThemedButton>Bouton avec thème JS</ThemedButton>
          <CssVarButton>Bouton avec variables CSS</CssVarButton>
        </div>

        <div>
          <h2>Comment utiliser le système de theming</h2>
          <pre
            style={{
              backgroundColor: '#f5f5f5',
              padding: '15px',
              borderRadius: '4px',
              overflow: 'auto',
            }}
          >
            {`
// 1. Créer un thème personnalisé
const customTheme = createTheme({
  mode: 'light', // ou 'dark'
  colors: {
    primary: {
      500: '#1976d2', // Personnaliser seulement les couleurs nécessaires
    },
  },
  // Autres options de personnalisation...
  cssVariables: true, // Activer les variables CSS
});

// 2. Optionnel: Rendre le thème responsive
const responsiveTheme = createResponsiveTheme(customTheme);

// 3. Fournir le thème à l'application
function App() {
  return (
    <ThemeProvider theme={responsiveTheme}>
      <YourApp />
    </ThemeProvider>
  );
}

// 4. Utiliser le thème dans vos composants
function MyComponent() {
  const { theme } = useTheme();

  // Accéder au thème via JavaScript
  const style = {
    color: theme.colors.primary[500],
  };

  // Ou utiliser les variables CSS
  const cssVarStyle = {
    color: 'var(--hopla-primary-500)',
  };

  return <div style={style}>Contenu stylisé</div>;
}
            `}
          </pre>
        </div>
      </div>
    </ThemeProvider>
  );
};
