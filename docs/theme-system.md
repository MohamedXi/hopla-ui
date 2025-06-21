# Hopla UI Theme System

The Hopla UI theme system allows you to customize the global appearance of your application in a consistent manner. It is based on a set of design tokens that can be easily customized.

## Core Concepts

The theme system is defined in the `@hopla-ui/system` package and includes several key aspects:

- **Color Palette**: Defines primary, secondary colors and variants
- **Typography**: Defines text styles for different elements
- **Spacing**: Consistent spacing system
- **Breakpoints**: Breakpoints for responsive design
- **Shadows**: Elevation levels via shadows
- **Z-index**: Management of overlay levels

## Using ThemeProvider

To use the theme system, you need to wrap your application with the `ThemeProvider`:

```jsx
import { ThemeProvider } from '@hopla-ui/react';
import { defaultTheme } from '@hopla-ui/system';

function App() {
  return (
    <ThemeProvider theme={defaultTheme}>
      {/* Your application */}
    </ThemeProvider>
  );
}
```

## Creating a Custom Theme

You can create a custom theme using the `createTheme` function:

```jsx
import { createTheme } from '@hopla-ui/system';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
      light: '#42a5f5',
      dark: '#1565c0',
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#9c27b0',
      light: '#ba68c8',
      dark: '#7b1fa2',
      contrastText: '#ffffff',
    },
    error: {
      main: '#d32f2f',
    },
    warning: {
      main: '#ed6c02',
    },
    info: {
      main: '#0288d1',
    },
    success: {
      main: '#2e7d32',
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontSize: '2.5rem',
      fontWeight: 500,
    },
    // Other typography styles...
  },
  // Other customizations...
});
```

## Dark Theme

Hopla UI includes a ready-to-use dark theme:

```jsx
import { ThemeProvider } from '@hopla-ui/react';
import { darkTheme } from '@hopla-ui/system';

function App() {
  return (
    <ThemeProvider theme={darkTheme}>
      {/* Your application */}
    </ThemeProvider>
  );
}
```

You can also toggle between light and dark themes:

```jsx
import { useState } from 'react';
import { ThemeProvider } from '@hopla-ui/react';
import { createTheme, darkTheme } from '@hopla-ui/system';

const lightTheme = createTheme(); // Default theme

function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const theme = isDarkMode ? darkTheme : lightTheme;

  return (
    <ThemeProvider theme={theme}>
      <button onClick={() => setIsDarkMode(!isDarkMode)}>
        Toggle theme
      </button>
      {/* Your application */}
    </ThemeProvider>
  );
}
```

## Theme Structure

### Palette

The palette defines the colors used in the application:

```typescript
interface Palette {
  primary: PaletteColor;
  secondary: PaletteColor;
  error: PaletteColor;
  warning: PaletteColor;
  info: PaletteColor;
  success: PaletteColor;
  text: {
    primary: string;
    secondary: string;
    disabled: string;
  };
  background: {
    default: string;
    paper: string;
  };
  divider: string;
  // ...
}

interface PaletteColor {
  main: string;
  light: string;
  dark: string;
  contrastText: string;
}
```

### Typography

Typography defines text styles:

```typescript
interface Typography {
  fontFamily: string;
  fontSize: number;
  fontWeightLight: number;
  fontWeightRegular: number;
  fontWeightMedium: number;
  fontWeightBold: number;
  h1: TypographyStyle;
  h2: TypographyStyle;
  h3: TypographyStyle;
  h4: TypographyStyle;
  h5: TypographyStyle;
  h6: TypographyStyle;
  subtitle1: TypographyStyle;
  subtitle2: TypographyStyle;
  body1: TypographyStyle;
  body2: TypographyStyle;
  button: TypographyStyle;
  caption: TypographyStyle;
  overline: TypographyStyle;
}

interface TypographyStyle {
  fontSize: string;
  fontWeight: number;
  lineHeight: number;
  letterSpacing?: string;
  textTransform?: string;
}
```

### Breakpoints

Breakpoints define the breakpoints for responsive design:

```typescript
interface Breakpoints {
  values: {
    xs: number; // 0px
    sm: number; // 600px
    md: number; // 960px
    lg: number; // 1280px
    xl: number; // 1920px
  };
  up: (key: string) => string;
  down: (key: string) => string;
  between: (start: string, end: string) => string;
  only: (key: string) => string;
}
```

### Spacing

The spacing system helps maintain consistency in margins and paddings:

```jsx
import { Box } from '@hopla-ui/core';

// Spacing is based on a default unit of 8px
<Box padding={2}> {/* 16px of padding */}
  <Box marginTop={3}> {/* 24px of top margin */}
    Content
  </Box>
</Box>
```

### Shadows

Shadows define different elevation levels:

```jsx
import { Paper } from '@hopla-ui/core';

// Elevation values range from 0 to 24
<Paper elevation={2}>
  Content with slight elevation
</Paper>

<Paper elevation={8}>
  Content with medium elevation
</Paper>

<Paper elevation={16}>
  Content with high elevation
</Paper>
```

## Accessing the Theme in Components

You can access the theme in your components using the `useTheme` hook:

```jsx
import { useTheme } from '@hopla-ui/react';

function MyComponent() {
  const theme = useTheme();
  
  return (
    <div style={{ color: theme.palette.primary.main }}>
      Text colored with the primary color
    </div>
  );
}
```

## Color Manipulation

The `@hopla-ui/system` package includes utilities for manipulating colors:

```jsx
import { alpha, darken, lighten } from '@hopla-ui/system';

// Adds transparency to a color
const transparentColor = alpha('#1976d2', 0.5);

// Darkens a color by 20%
const darkerColor = darken('#1976d2', 0.2);

// Lightens a color by 20%
const lighterColor = lighten('#1976d2', 0.2);
```

## Advanced Customization

For more advanced customization, you can extend the default theme:

```jsx
import { createTheme, defaultTheme } from '@hopla-ui/system';
import deepmerge from 'deepmerge';

const customTheme = createTheme(deepmerge(defaultTheme, {
  components: {
    Button: {
      styleOverrides: {
        root: {
          borderRadius: '8px',
        },
        contained: {
          boxShadow: 'none',
        },
      },
      defaultProps: {
        disableElevation: true,
      },
    },
  },
}));
