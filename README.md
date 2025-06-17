# Hopla UI

Une librairie UI moderne pour React avec une documentation complète via Nextra et Storybook.

## Caractéristiques

- 🚀 **Moderne** - Construit avec React et TypeScript
- 🎨 **Personnalisable** - Thèmes et styles facilement personnalisables
- ♿ **Accessible** - Conforme aux normes WCAG
- 📱 **Responsive** - Fonctionne sur tous les appareils
- 📚 **Documentation complète** - Documentation publique avec Nextra et documentation développeur avec Storybook

## Installation

```bash
npm install hopla-ui
# ou
yarn add hopla-ui
```

## Utilisation rapide

```jsx
import { Button } from 'hopla-ui';

function App() {
  return (
    <div>
      <Button variant="primary">Cliquez-moi</Button>
    </div>
  );
}
```

## Documentation

### Documentation publique

Pour lancer la documentation publique en mode développement :

```bash
npm run docs:dev
# ou
yarn docs:dev
```

La documentation sera disponible à l'adresse [http://localhost:3001](http://localhost:3001).

### Documentation développeur (Storybook)

Pour lancer Storybook en mode développement :

```bash
npm run storybook
# ou
yarn storybook
```

Storybook sera disponible à l'adresse [http://localhost:6006](http://localhost:6006).

## Développement

### Installation des dépendances

```bash
npm install
# ou
yarn
```

### Lancer le build en mode watch

```bash
npm run dev
# ou
yarn dev
```

### Build pour la production

```bash
npm run build
# ou
yarn build
```

### Tests

```bash
npm run test
# ou
yarn test
```

## Licence

MIT
