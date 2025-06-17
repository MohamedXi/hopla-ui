import clsx from 'clsx';
import { forwardRef } from 'react';

import { BoxProps } from '../types';

/**
 * Composant Box - Un composant de base pour la mise en page et le styling
 * @param props - Props du composant
 * @returns Composant React
 */
export const Box = forwardRef<HTMLElement, BoxProps>((props, ref) => {
  const {
    component: Component = 'div',
    className,
    children,
    style,
    sx,
    ...other
  } = props;

  // Pas besoin d'utiliser le thème dans ce composant
  
  // Fusion des styles inline et des styles sx
  const combinedStyle = {
    ...style,
    ...sx,
  };

  return (
    <Component
      ref={ref}
      className={clsx('hopla-box', className)}
      style={combinedStyle}
      {...other}
    >
      {children}
    </Component>
  );
});

Box.displayName = 'Box';
