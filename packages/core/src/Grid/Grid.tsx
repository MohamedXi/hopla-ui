import clsx from 'clsx';
import { forwardRef } from 'react';

import { Box } from '../Box';
import { useTheme } from '../ThemeProvider/ThemeProvider';
import { GridProps } from '../types';

/**
 * Composant Grid - Un système de grille flexible et responsive
 * @param props - Props du composant
 * @returns Composant React
 */
export const Grid = forwardRef<HTMLElement, GridProps>((props, ref) => {
  const {
    children,
    className,
    columns = 12,
    container = false,
    item = false,
    spacing = 0,
    rowSpacing,
    columnSpacing,
    xs,
    sm,
    md,
    lg,
    xl,
    component = 'div',
    ...other
  } = props;

  const theme = useTheme();

  // Convertir l'espacement en valeur CSS
  const getSpacing = (value: number | string) => {
    if (typeof value === 'string') return value;
    return `${value * 8}px`; // 8px est l'unité de base pour l'espacement
  };

  // Calculer les styles pour le conteneur de grille
  const getContainerStyles = () => {
    if (!container) return {};

    const rowGap = rowSpacing !== undefined ? getSpacing(rowSpacing) : getSpacing(spacing);
    const columnGap = columnSpacing !== undefined ? getSpacing(columnSpacing) : getSpacing(spacing);

    return {
      display: 'grid',
      gridTemplateColumns: `repeat(${columns}, 1fr)`,
      gap: spacing !== 0 ? getSpacing(spacing) : undefined,
      rowGap: rowSpacing !== undefined ? rowGap : undefined,
      columnGap: columnSpacing !== undefined ? columnGap : undefined,
    };
  };

  // Calculer les styles pour l'élément de grille
  const getItemStyles = () => {
    if (!item) return {};

    // Définir des types plus précis pour les styles
    interface GridColumnStyle {
      gridColumn: string;
    }
    
    interface GridStyles {
      gridColumn?: string;
      [key: string]: GridColumnStyle | string | undefined;
    }
    
    const styles: GridStyles = {};

    // Appliquer les breakpoints
    if (xs !== undefined) {
      styles.gridColumn = xs === 'auto' ? 'auto' : `span ${xs} / span ${xs}`;
    }

    // Créer un objet pour les styles responsifs
    const responsiveStyles: GridStyles = {};
    const breakpoints = theme.breakpoints.values;
    
    if (sm !== undefined) {
      responsiveStyles[`@media (min-width: ${breakpoints.sm}px)`] = {
        gridColumn: sm === 'auto' ? 'auto' : `span ${sm} / span ${sm}`,
      };
    }

    if (md !== undefined) {
      responsiveStyles[`@media (min-width: ${breakpoints.md}px)`] = {
        gridColumn: md === 'auto' ? 'auto' : `span ${md} / span ${md}`,
      };
    }

    if (lg !== undefined) {
      responsiveStyles[`@media (min-width: ${breakpoints.lg}px)`] = {
        gridColumn: lg === 'auto' ? 'auto' : `span ${lg} / span ${lg}`,
      };
    }

    if (xl !== undefined) {
      responsiveStyles[`@media (min-width: ${breakpoints.xl}px)`] = {
        gridColumn: xl === 'auto' ? 'auto' : `span ${xl} / span ${xl}`,
      };
    }

    // Fusionner les styles de base avec les styles responsifs
    return { ...styles, ...responsiveStyles };
  };

  const gridStyles = {
    ...(container ? getContainerStyles() : {}),
    ...(item ? getItemStyles() : {}),
    ...other.sx,
  };

  return (
    <Box
      ref={ref}
      component={component}
      className={clsx(
        'hopla-grid',
        {
          'hopla-grid-container': container,
          'hopla-grid-item': item,
        },
        className
      )}
      sx={gridStyles}
      {...other}
    >
      {children}
    </Box>
  );
});

Grid.displayName = 'Grid';
