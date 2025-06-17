import { defineWorkspace } from 'vitest/config';
import storybookTest from '@storybook/addon-vitest/vitest-plugin';

export default defineWorkspace([
  // Configuration pour les tests unitaires
  {
    test: {
      name: 'unit',
      environment: 'jsdom',
      globals: true,
      setupFiles: ['./vitest.setup.ts'],
      include: ['src/**/*.test.{ts,tsx}'],
    }
  },
  // Configuration pour les tests Storybook
  {
    extends: './vitest.config.ts',
    test: {
      name: 'storybook',
      environment: 'jsdom',
    }
  }
]);
