import React from 'react';

export default {
  logo: <span style={{ fontWeight: 'bold' }}>Hopla UI</span>,
  project: {
    link: 'https://github.com/yourusername/hopla-ui',
  },
  docsRepositoryBase: 'https://github.com/yourusername/hopla-ui/blob/main',
  footer: {
    text: `© ${new Date().getFullYear()} Hopla UI. Tous droits réservés.`,
  },
  useNextSeoProps() {
    return {
      titleTemplate: '%s – Hopla UI'
    }
  },
  head: (
    <>
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta name="description" content="Hopla UI: Une librairie UI moderne pour React" />
      <meta name="og:title" content="Hopla UI: Une librairie UI moderne pour React" />
    </>
  ),
  sidebar: {
    defaultMenuCollapseLevel: 1,
    toggleButton: true,
  },
  toc: {
    float: true,
    title: 'Sur cette page',
  },
  navigation: {
    prev: true,
    next: true,
  },
  darkMode: true,
  primaryHue: {
    dark: 210,
    light: 210,
  },
  main: ({ children }) => {
    return (
      <div className="nextra-container main-container">
        {children}
      </div>
    )
  },
  themeSwitch: {
    component: () => null
  }
};
