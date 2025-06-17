// Import de React pour les types JSX avec esModuleInterop
import * as React from 'react';

// Définition du type pour la configuration du thème
type DocsThemeConfig = {
  logo: React.ReactNode;
  project?: { link?: string };
  docsRepositoryBase?: string;
  footer?: { text?: React.ReactNode };
  useNextSeoProps?: () => any;
  head?: React.ReactNode;
}

const config: DocsThemeConfig = {
  logo: (
    <span style={{ fontWeight: 'bold', fontSize: '1.5rem' }}>Hopla UI</span>
  ),
  project: {
    link: 'https://github.com/yourusername/hopla-ui',
  },
  docsRepositoryBase: 'https://github.com/yourusername/hopla-ui',
  footer: {
    text: `© ${new Date().getFullYear()} Hopla UI - Bibliothèque de composants React`,
  },
  useNextSeoProps() {
    return {
      titleTemplate: '%s – Hopla UI',
    };
  },
  head: (
    <>
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta
        name="description"
        content="Hopla UI: Bibliothèque de composants React moderne et accessible"
      />
      <meta name="og:title" content="Hopla UI: Documentation" />
    </>
  ),
};

export default config;
