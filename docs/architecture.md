# Hopla UI Architecture

## Overview

Hopla UI is designed with a modular architecture that promotes reusability, maintainability, and flexibility. The project is structured as a monorepo using Lerna and pnpm, which allows for efficient dependency management between the different packages.

## Monorepo Structure

```
hopla-ui/
├── .storybook/        # Storybook configuration
├── docs/              # Documentation
├── packages/
│   ├── core/          # Fundamental components
│   ├── icons/         # Icon library
│   ├── react/         # React components
│   ├── system/        # Design system and theme
│   └── utils/         # Utilities and hooks
└── ...
```

## Packages

### @hopla-ui/core

This package contains the fundamental and primitive components that serve as the foundation for more complex components. These components are designed to be highly reusable and customizable.

Example components:
- Box
- Card
- Divider
- Grid
- Paper
- Stack
- ThemeProvider

### @hopla-ui/react

This package provides ready-to-use React components that can be used directly in applications. These components are built on the primitives from the core package and integrate the design system's functionality.

Example components:
- Avatar
- Badge
- Button
- ButtonGroup
- Checkbox
- IconButton
- LikeButton
- TextField

### @hopla-ui/system

This package defines the design and theme system used by all components. It includes:
- Breakpoint management for responsive design
- Color manipulation
- Theme creation and customization
- Dark theme
- Shadow management
- Spacing system
- Typography
- Z-index management

### @hopla-ui/utils

This package contains reusable utilities and hooks that facilitate the development of components and applications.

Utility categories:
- Array manipulation
- DOM utilities
- Custom React hooks
- Object manipulation
- String manipulation
- TypeScript types

### @hopla-ui/icons

This package provides an icon library optimized for use with Hopla UI components.

## Data Flow

1. The theme system (`@hopla-ui/system`) defines the global appearance
2. The base components (`@hopla-ui/core`) use the theme system
3. The React components (`@hopla-ui/react`) extend the base components
4. The utilities (`@hopla-ui/utils`) are used at all levels

## Compilation and Distribution

Each package is compiled independently using tsup, which generates:
- ESM and CommonJS bundles
- TypeScript type declarations

This approach allows users to import only what they need, thus optimizing the final bundle size.
