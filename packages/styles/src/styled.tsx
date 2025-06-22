import clsx from 'clsx';
import * as React from 'react';
import type { ElementType, ComponentPropsWithRef } from 'react';

import { processSxProps } from './sx';
import { ensureExtendedTheme } from './themeAdapter';
import { Theme } from './themeTypes';
import { StyleOptions, SxProps } from './types';
import { useTheme } from './useTheme';

const { forwardRef } = React;

/**
 * Crée un composant stylisé avec support pour les props sx et les styles basés sur le thème
 * @param Component - Le composant de base à styliser
 * @param styles - Les styles à appliquer au composant
 * @param options - Options de configuration
 * @returns Un composant stylisé avec support pour les props sx
 */
export function styled<
  C extends ElementType,
  Props extends Record<string, any> = ComponentPropsWithRef<C>,
>(
  Component: C,
  styles: ((theme: Theme) => React.CSSProperties) | React.CSSProperties,
  options: StyleOptions = {}
) {
  const { name = '', slot = '', skipSx = false, shouldForwardProp } = options;

  const StyledComponent = forwardRef<any, Props & { sx?: SxProps; className?: string }>(
    (props, ref) => {
      const { sx, className, ...other } = props;
      const theme = useTheme();

      // S'assurer que le thème est un thème étendu
      const extendedTheme = ensureExtendedTheme(theme);

      // Calculer les styles basés sur le thème si nécessaire
      const baseStyles = typeof styles === 'function' ? styles(extendedTheme as Theme) : styles;

      // Traiter les props sx si elles sont présentes et non ignorées
      const sxStyles = !skipSx && sx ? processSxProps(sx, extendedTheme) : {};

      // Combiner les styles
      const combinedStyles = {
        ...baseStyles,
        ...sxStyles,
      };

      // Filtrer les props si nécessaire
      const componentProps: Record<string, unknown> = { ...other };
      if (shouldForwardProp) {
        Object.keys(other).forEach(key => {
          if (!shouldForwardProp(key)) {
            delete componentProps[key];
          }
        });
      }

      // Générer un nom de classe unique pour le composant
      const componentName = name || getDisplayName(Component);
      const slotName = slot || 'root';
      const generatedClassName = `hopla-${componentName}-${slotName}`;

      // Utiliser createElement pour éviter les problèmes de JSX avec les types génériques
      return React.createElement(
        Component as React.ElementType,
        Object.assign({}, componentProps, {
          ref,
          className: clsx(generatedClassName, className),
          style: combinedStyles as React.CSSProperties,
        })
      );
    }
  );

  // Définir le nom d'affichage pour le composant stylisé
  const displayName = name || getDisplayName(Component);
  StyledComponent.displayName = `Styled(${displayName})`;

  return StyledComponent;
}

/**
 * Obtient le nom d'affichage d'un composant
 */
function getDisplayName(Component: ElementType): string {
  if (typeof Component === 'string') {
    return Component;
  }
  
  // Vérifier si Component a les propriétés displayName ou name
  const componentType = Component as React.ComponentType<unknown>;
  return componentType.displayName || componentType.name || 'Component';
}
