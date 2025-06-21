import type { Preview } from '@storybook/react';
import React from 'react';
import { ThemeProvider } from '../packages/react/src/providers/ThemeProvider';
import { defaultTheme } from '../packages/system/src/defaultTheme';

// Décorateur global pour envelopper tous les composants avec ThemeProvider
const withThemeProvider = Story => {
  return (
    <ThemeProvider theme={defaultTheme}>
      <Story />
    </ThemeProvider>
  );
};

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
    backgrounds: {
      default: 'light',
      values: [
        {
          name: 'light',
          value: '#ffffff',
        },
        {
          name: 'dark',
          value: '#1a1a1a',
        },
      ],
    },
  },
  // Ajouter le décorateur global
  decorators: [withThemeProvider],
};

export default preview;
