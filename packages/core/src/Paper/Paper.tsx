import clsx from 'clsx';
import { forwardRef } from 'react';

import { Box } from '../Box';
import { useTheme } from '../ThemeProvider/ThemeProvider';
import { PaperProps } from '../types';

/**
 * Composant Paper - Une surface avec élévation et bordures
 * @param props - Props du composant
 * @returns Composant React
 */
export const Paper = forwardRef<HTMLDivElement, PaperProps>((props, ref) => {
  const {
    children,
    className,
    component = 'div',
    elevation = 1,
    square = false,
    variant = 'elevation',
    ...other
  } = props;

  const theme = useTheme();

  // Obtenir l'ombre correspondant à l'élévation
  const getShadow = () => {
    if (variant === 'outlined') return 'none';
    const shadowIndex = Math.min(Math.max(0, elevation), theme.shadows.length - 1);
    return theme.shadows[shadowIndex];
  };

  const paperStyles = {
    backgroundColor: theme.colors.background.paper,
    color: theme.colors.text.primary,
    transition: `box-shadow ${theme.transitions.duration.standard}ms ${theme.transitions.easing.easeInOut}`,
    boxShadow: getShadow(),
    borderRadius: square ? 0 : theme.shape.borderRadius,
    border: variant === 'outlined' ? `1px solid ${theme.colors.divider}` : 'none',
    ...other.sx,
  };

  return (
    <Box
      ref={ref}
      component={component}
      className={clsx('hopla-paper', {
        [`hopla-paper-elevation${elevation}`]: variant === 'elevation',
        'hopla-paper-outlined': variant === 'outlined',
        'hopla-paper-rounded': !square,
      }, className)}
      sx={paperStyles}
      {...other}
    >
      {children}
    </Box>
  );
});

Paper.displayName = 'Paper';
