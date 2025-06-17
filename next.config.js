import nextra from 'nextra';

// Configuration Nextra pour la version 4.x
const withNextra = nextra({
  // Options Nextra spécifiques
  defaultShowCopyCode: true
});

// Export de la configuration Next.js avec Nextra
export default withNextra({
  reactStrictMode: true
});
