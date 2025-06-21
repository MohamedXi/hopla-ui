# Système de Theming Hopla UI

Le système de theming de Hopla UI permet de personnaliser facilement l'apparence de votre application. Il est inspiré par Material UI mais adapté aux besoins spécifiques de Hopla UI.

## Table des matières

- [Installation](#installation)
- [Utilisation de base](#utilisation-de-base)
- [Personnalisation du thème](#personnalisation-du-thème)
  - [Couleurs](#couleurs)
  - [Typographie](#typographie)
  - [Espacement](#espacement)
  - [Points de rupture](#points-de-rupture)
  - [Forme](#forme)
  - [Transitions](#transitions)
- [Mode sombre](#mode-sombre)
- [Variables CSS](#variables-css)
- [Thème responsive](#thème-responsive)
- [API](#api)
  - [ThemeProvider](#themeprovider)
  - [useTheme](#usetheme)
  - [createTheme](#createtheme)
  - [createResponsiveTheme](#createresponsivetheme)
  - [hoplaVar](#hoplavar)

## Installation

Le système de theming est inclus dans le package principal de Hopla UI.

```bash
npm install @hopla-ui/react
# ou
yarn add @hopla-ui/react
```

## Utilisation de base

Pour utiliser le système de theming, vous devez envelopper votre application avec le `ThemeProvider` :

```jsx
import { ThemeProvider } from '@hopla-ui/react';

function App() {
  return (
    <ThemeProvider>
      <YourApp />
    </ThemeProvider>
  );
}
```

Par défaut, le `ThemeProvider` utilise le thème par défaut de Hopla UI. Vous pouvez accéder au thème dans n'importe quel composant enfant en utilisant le hook `useTheme` :

```jsx
import { useTheme } from '@hopla-ui/react';

function MyComponent() {
  const { theme } = useTheme();
  
  return (
    <div style={{ color: theme.colors.primary[500] }}>
      Texte coloré avec la couleur primaire
    </div>
  );
}
```

## Personnalisation du thème

Vous pouvez personnaliser le thème en passant un objet de configuration au `ThemeProvider` ou en utilisant la fonction `createTheme` :

```jsx
import { ThemeProvider, createTheme } from '@hopla-ui/react';

// Créer un thème personnalisé
const customTheme = createTheme({
  // Options de personnalisation
  colors: {
    primary: {
      500: '#1976d2', // Bleu
    },
  },
  shape: {
    borderRadius: 8,
  },
});

function App() {
  return (
    <ThemeProvider theme={customTheme}>
      <YourApp />
    </ThemeProvider>
  );
}
```

### Couleurs

Le système de couleurs de Hopla UI est basé sur des palettes de couleurs avec des nuances allant de 50 à 900 :

```jsx
const theme = createTheme({
  colors: {
    primary: {
      50: '#e3f2fd',
      100: '#bbdefb',
      200: '#90caf9',
      300: '#64b5f6',
      400: '#42a5f5',
      500: '#2196f3', // Couleur principale
      600: '#1e88e5',
      700: '#1976d2',
      800: '#1565c0',
      900: '#0d47a1',
    },
    secondary: {
      // Nuances de la couleur secondaire
    },
    // Autres couleurs : success, error, warning, info, grey
  },
});
```

Vous pouvez également utiliser l'option `palette` pour définir des couleurs principales et laisser le système générer automatiquement les nuances :

```jsx
const theme = createTheme({
  palette: {
    primary: '#2196f3',
    secondary: '#9c27b0',
    success: '#4caf50',
    error: '#f44336',
    warning: '#ff9800',
    info: '#03a9f4',
  },
});
```

### Typographie

Vous pouvez personnaliser la typographie en modifiant les variantes typographiques :

```jsx
const theme = createTheme({
  typography: {
    h1: {
      fontSize: '2.5rem',
      fontWeight: 600,
      lineHeight: 1.2,
    },
    body1: {
      fontSize: '1rem',
      lineHeight: 1.5,
    },
    // Autres variantes : h2, h3, h4, h5, h6, subtitle1, subtitle2, body2, button, caption, overline
  },
});
```

### Espacement

L'espacement dans Hopla UI est basé sur une unité de base de 8px :

```jsx
// Dans votre composant
const { theme } = useTheme();

// Utilisation de l'espacement
const styles = {
  padding: theme.spacing(2), // 16px
  margin: theme.spacing(1, 2), // 8px vertical, 16px horizontal
  border: theme.spacing(1, 2, 3, 4), // 8px top, 16px right, 24px bottom, 32px left
};
```

### Points de rupture

Les points de rupture permettent de créer des designs responsifs :

```jsx
const theme = createTheme({
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 960,
      lg: 1280,
      xl: 1920,
    },
  },
});

// Dans votre composant
const { theme } = useTheme();

// Utilisation des points de rupture
const styles = {
  [theme.breakpoints.up('sm')]: {
    display: 'block',
  },
  [theme.breakpoints.down('md')]: {
    display: 'none',
  },
  [theme.breakpoints.between('md', 'lg')]: {
    display: 'flex',
  },
};
```

### Forme

Vous pouvez personnaliser les aspects de forme comme les rayons de bordure :

```jsx
const theme = createTheme({
  shape: {
    borderRadius: 8, // 8px par défaut pour tous les composants
  },
});
```

### Transitions

Personnalisez les transitions d'animation :

```jsx
const theme = createTheme({
  transitions: {
    easing: {
      easeInOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
      easeOut: 'cubic-bezier(0.0, 0, 0.2, 1)',
      easeIn: 'cubic-bezier(0.4, 0, 1, 1)',
      sharp: 'cubic-bezier(0.4, 0, 0.6, 1)',
    },
    duration: {
      shortest: 150,
      shorter: 200,
      short: 250,
      standard: 300,
      complex: 375,
      enteringScreen: 225,
      leavingScreen: 195,
    },
  },
});
```

## Mode sombre

Hopla UI prend en charge le mode sombre. Vous pouvez basculer entre les modes clair et sombre :

```jsx
import { ThemeProvider, useTheme, createTheme } from '@hopla-ui/react';

// Créer un thème avec mode sombre
const darkTheme = createTheme({
  mode: 'dark',
  // Autres options...
});

// Ou basculer le mode dans un composant
function ThemeToggle() {
  const { theme, updateTheme } = useTheme();
  
  const toggleTheme = () => {
    updateTheme({ mode: theme.mode === 'light' ? 'dark' : 'light' });
  };
  
  return (
    <button onClick={toggleTheme}>
      Basculer en mode {theme.mode === 'light' ? 'sombre' : 'clair'}
    </button>
  );
}
```

## Variables CSS

Hopla UI peut générer des variables CSS à partir du thème, ce qui permet d'utiliser le thème dans vos styles CSS :

```jsx
const theme = createTheme({
  cssVariables: true, // Activer les variables CSS
  // Autres options...
});

// Dans votre CSS
.myComponent {
  color: var(--hopla-primary-500);
  font-size: var(--hopla-typography-body1-fontSize);
  padding: var(--hopla-spacing-2);
}

// Ou avec la fonction hoplaVar
import { hoplaVar } from '@hopla-ui/react';

const styles = {
  color: hoplaVar('colors.primary.500'),
  fontSize: hoplaVar('typography.body1.fontSize'),
};
```

## Thème responsive

Vous pouvez créer un thème avec des tailles de police responsives :

```jsx
import { createTheme, createResponsiveTheme } from '@hopla-ui/react';

// Créer un thème de base
const baseTheme = createTheme({
  // Options...
});

// Rendre le thème responsive
const responsiveTheme = createResponsiveTheme(baseTheme, {
  breakpoints: ['sm', 'md', 'lg'], // Points de rupture à utiliser
  factor: 2, // Facteur d'échelle
  variants: ['h1', 'h2', 'h3'], // Variantes typographiques à rendre responsives
});

// Utiliser le thème responsive
function App() {
  return (
    <ThemeProvider theme={responsiveTheme}>
      <YourApp />
    </ThemeProvider>
  );
}
```

## API

### ThemeProvider

```jsx
<ThemeProvider theme={theme}>
  <App />
</ThemeProvider>
```

| Prop | Type | Description |
|------|------|-------------|
| theme | Theme \| ThemeOptions | Le thème à utiliser. Si non fourni, le thème par défaut sera utilisé. |
| children | ReactNode | Les composants enfants. |

### useTheme

```jsx
const { theme, updateTheme } = useTheme();
```

| Retour | Type | Description |
|--------|------|-------------|
| theme | Theme | L'objet thème actuel. |
| updateTheme | (options: ThemeOptions) => void | Fonction pour mettre à jour le thème. |

### createTheme

```jsx
const theme = createTheme(options);
```

| Paramètre | Type | Description |
|-----------|------|-------------|
| options | ThemeOptions | Options de personnalisation du thème. |

### createResponsiveTheme

```jsx
const responsiveTheme = createResponsiveTheme(theme, options);
```

| Paramètre | Type | Description |
|-----------|------|-------------|
| theme | Theme | Le thème de base à rendre responsive. |
| options | ResponsiveThemeOptions | Options pour la configuration des tailles de police responsives. |

### hoplaVar

```jsx
const cssVar = hoplaVar(path);
```

| Paramètre | Type | Description |
|-----------|------|-------------|
| path | string | Chemin de la variable CSS (ex: 'colors.primary.500'). |

## Exemples

Vous pouvez trouver des exemples d'utilisation du système de theming dans le dossier `examples` du package `@hopla-ui/react`.

```jsx
import { ThemeExample } from '@hopla-ui/react/examples';

function App() {
  return <ThemeExample />;
}
```
