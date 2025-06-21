# Hopla UI Contribution Guide

Thank you for your interest in contributing to Hopla UI! This document provides guidelines for contributing to the project effectively.

## Prerequisites

- Node.js (version 18 or higher)
- pnpm (package manager)
- Git

## Development Environment Setup

1. **Clone the repository**

```bash
git clone https://github.com/your-organization/hopla-ui.git
cd hopla-ui
```

2. **Install dependencies**

```bash
pnpm install
```

3. **Build the packages**

```bash
pnpm build
```

## Project Structure

Hopla UI is organized as a monorepo with the following packages:

- `packages/core`: Fundamental components
- `packages/react`: React components
- `packages/system`: Design system and theme
- `packages/utils`: Utilities and hooks
- `packages/icons`: Icon library

## Development Workflow

### Local Development

1. **Start watch mode for compilation**

```bash
pnpm build:watch
```

2. **Launch Storybook for visual development**

```bash
pnpm storybook
```

3. **Run tests**

```bash
pnpm test
# or in watch mode
pnpm test:watch
```

### Creating a New Component

1. **Create the component folder**

For a React component, create a folder in `packages/react/src/components/ComponentName`.

2. **Recommended file structure**

```
ComponentName/
├── index.ts            # Entry point exporting the component
├── ComponentName.tsx  # Component implementation
├── ComponentName.styles.ts  # Component styles
├── ComponentName.types.ts   # TypeScript types
├── ComponentName.test.tsx   # Unit tests
└── ComponentName.stories.tsx  # Storybook stories
```

3. **Implementation example**

```tsx
// ComponentName.types.ts
export interface ComponentNameProps {
  variant?: 'default' | 'primary' | 'secondary';
  disabled?: boolean;
  children: React.ReactNode;
}

// ComponentName.tsx
import React from 'react';
import { ComponentNameProps } from './ComponentName.types';
import { StyledComponentName } from './ComponentName.styles';

export const ComponentName: React.FC<ComponentNameProps> = ({
  variant = 'default',
  disabled = false,
  children,
  ...props
}) => {
  return (
    <StyledComponentName
      variant={variant}
      disabled={disabled}
      {...props}
    >
      {children}
    </StyledComponentName>
  );
};
```

4. **Add tests**

```tsx
// ComponentName.test.tsx
import React from 'react';
import { render, screen } from '@testing-library/react';
import { ComponentName } from './ComponentName';

describe('ComponentName', () => {
  it('renders correctly', () => {
    render(<ComponentName>Test</ComponentName>);
    expect(screen.getByText('Test')).toBeInTheDocument();
  });
  
  it('applies variant styles', () => {
    render(<ComponentName variant="primary">Primary</ComponentName>);
    // Assertions...
  });
});
```

5. **Add Storybook stories**

```tsx
// ComponentName.stories.tsx
import type { Meta, StoryObj } from '@storybook/react';
import { ComponentName } from './ComponentName';

const meta: Meta<typeof ComponentName> = {
  title: 'Components/ComponentName',
  component: ComponentName,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'primary', 'secondary'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof ComponentName>;

export const Default: Story = {
  args: {
    children: 'Default Component',
  },
};

export const Primary: Story = {
  args: {
    variant: 'primary',
    children: 'Primary Component',
  },
};
```

6. **Export the component**

```ts
// index.ts
export * from './ComponentName';
export * from './ComponentName.types';
```

7. **Update the main index**

Add your component to the exports in `packages/react/src/index.ts`.

## Code Conventions

### Naming

- **Components**: PascalCase (e.g., `Button`, `TextField`)
- **Hooks**: camelCase with `use` prefix (e.g., `useTheme`, `useMediaQuery`)
- **Utilities**: camelCase (e.g., `deepMerge`, `capitalize`)
- **Types**: PascalCase with descriptive suffix (e.g., `ButtonProps`, `ThemeOptions`)

### Code Style

We use ESLint and Prettier to maintain a consistent code style:

```bash
# Check style
pnpm lint

# Format code
pnpm prettier
```

### TypeScript

- Use explicit types rather than `any`
- Document interfaces with JSDoc comments
- Export types and interfaces used by consumers

## Tests

We use Vitest and Testing Library for tests:

- **Unit tests**: Test each component in isolation
- **Integration tests**: Test interactions between components
- **Visual tests**: Use Storybook for visual testing

```bash
# Run all tests
pnpm test

# Run tests for a specific package
pnpm --filter @hopla-ui/react test
```

## Documentation

- Each component should have complete documentation
- Use JSDoc to document props, methods, and hooks
- Create usage examples in Storybook

## Contribution Process

1. **Create a branch**

```bash
git checkout -b feature/feature-name
# or
git checkout -b fix/fix-name
```

2. **Make atomic commits**

```bash
git commit -m "feat: add component X"
# or
git commit -m "fix: resolve issue Y in component Z"
```

We follow [Conventional Commits](https://www.conventionalcommits.org/) conventions.

3. **Submit a Pull Request**

- Clearly describe the changes
- Reference associated issues
- Ensure all tests pass
- Request a code review

## Versioning

We follow [Semantic Versioning](https://semver.org/):

- **Patch** (`x.y.Z`): Backward compatible bug fixes
- **Minor** (`x.Y.z`): Backward compatible features
- **Major** (`X.y.z`): Breaking changes

## Useful Resources

- [React Documentation](https://reactjs.org/docs)
- [TypeScript Documentation](https://www.typescriptlang.org/docs)
- [Storybook Documentation](https://storybook.js.org/docs)
- [Testing Library Guide](https://testing-library.com/docs)

## Code of Conduct

We expect all contributors to adhere to our code of conduct:

- Be respectful and inclusive
- Accept constructive criticism
- Focus on what is best for the community
- Show empathy towards other community members

## License

By contributing to Hopla UI, you agree that your contributions will be licensed under the MIT License.
