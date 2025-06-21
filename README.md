# Hopla UI

Hopla UI is a modern and flexible React component library, designed to facilitate the development of elegant and consistent user interfaces.

## Project Structure

The project is organized as a monorepo managed with Lerna and pnpm, which allows for efficient dependency management and better separation of concerns.

### Main Packages

- **@hopla-ui/core**: Fundamental and primitive components
- **@hopla-ui/react**: Ready-to-use React components
- **@hopla-ui/system**: Design and theme system
- **@hopla-ui/utils**: Reusable utilities and hooks
- **@hopla-ui/icons**: Icon library

## Installation

```bash
npm install @hopla-ui/react
# or
yarn add @hopla-ui/react
# or
pnpm add @hopla-ui/react
```

## Quick Usage

```jsx
import { Button, ThemeProvider } from '@hopla-ui/react';

function App() {
  return (
    <ThemeProvider>
      <Button variant="contained" color="primary">
        Hello Hopla UI
      </Button>
    </ThemeProvider>
  );
}
```

## Documentation

For more information on using components and the design system, check out the following sections:

- [Architecture](./architecture.md)
- [Components](./components.md)
- [Theme System](./theme-system.md)
- [Utilities](./utils.md)
- [Contribution Guidelines](./contributing.md)

## Development

```bash
# Installing dependencies
pnpm install

# Starting Storybook
pnpm storybook

# Building all packages
pnpm build

# Tests
pnpm test
```

## License

MIT
