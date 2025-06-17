import clsx from 'clsx';
import React, { forwardRef } from 'react';

import { Box } from '../Box';
import { StackProps } from '../types';

/**
 * Composant Stack - Un composant de mise en page flexible pour empiler les éléments
 * @param props - Props du composant
 * @returns Composant React
 */
export const Stack = forwardRef<HTMLElement, StackProps>((props, ref) => {
  const {
    children,
    className,
    direction = 'column',
    spacing = 0,
    justifyContent,
    alignItems,
    flexWrap = 'nowrap',
    component = 'div',
    ...other
  } = props;

  // Pas besoin d'utiliser le thème dans ce composant

  // Convertir l'espacement en valeur CSS
  const getSpacing = (value: number | string) => {
    if (typeof value === 'string') return value;
    return `${value * 8}px`; // 8px est l'unité de base pour l'espacement
  };

  // Styles pour le conteneur Stack
  const stackStyles = {
    display: 'flex',
    flexDirection: direction,
    flexWrap,
    justifyContent,
    alignItems,
    ...other.sx,
  };

  // Styles pour les enfants du Stack
  const childrenWithSpacing = React.Children.map(children, (child, index) => {
    if (!React.isValidElement(child)) return child;

    const spacingStyles = {
      ...(direction === 'column' || direction === 'column-reverse'
        ? { marginBottom: index < React.Children.count(children) - 1 ? getSpacing(spacing) : 0 }
        : { marginRight: index < React.Children.count(children) - 1 ? getSpacing(spacing) : 0 }),
    };

    // Utilisation d'une assertion de type pour éviter l'erreur TS2769
    return React.cloneElement(child, {
      style: {
        ...(child.props.style || {}),
        ...spacingStyles,
      },
    } as React.HTMLAttributes<HTMLElement>);
  });

  return (
    <Box
      ref={ref}
      component={component}
      className={clsx('hopla-stack', className)}
      sx={stackStyles}
      {...other}
    >
      {childrenWithSpacing}
    </Box>
  );
});

Stack.displayName = 'Stack';
