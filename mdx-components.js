import { useMDXComponents as getThemeComponents } from 'nextra-theme-docs'; // nextra-theme-blog or your custom theme

// Import des composants de notre bibliothèque
import { Button } from './src/components/Button';
import {
  ButtonExample,
  ButtonPrimary,
  ButtonSecondary,
  ButtonOutline,
  ButtonGhost,
  ButtonSmall,
  ButtonMedium,
  ButtonLarge,
  ButtonDisabled
} from './src/components/Button/ButtonExample';

// Cette fonction permet de personnaliser les composants MDX utilisés par Nextra
export function useMDXComponents(components) {
  return {
    ...components,
    ...getThemeComponents(),
    // Vous pouvez ajouter vos propres composants personnalisés ici
    h1: ({ children, ...props }) => (
      <h1 className="nextra-h1" {...props}>
        {children}
      </h1>
    ),
    // Ajout des composants de notre bibliothèque pour qu'ils soient disponibles dans les fichiers MDX
    Button,
    ButtonExample,
    ButtonPrimary,
    ButtonSecondary,
    ButtonOutline,
    ButtonGhost,
    ButtonSmall,
    ButtonMedium,
    ButtonLarge,
    ButtonDisabled,
    // Autres composants personnalisés...
  };
}
