import clsx from 'clsx';
import { forwardRef } from 'react';

import { Paper } from '../Paper';
import { CardProps } from '../types';
import styles from './Card.module.css';

/**
 * Composant Card - Une carte pour afficher du contenu
 * @param props - Props du composant
 * @returns Composant React
 */
export const Card = forwardRef<HTMLDivElement, CardProps>((props, ref) => {
  const { children, className, outlined = false, elevation = outlined ? 0 : 1, ...other } = props;

  return (
    <Paper
      ref={ref}
      className={clsx(styles.card, className)}
      elevation={elevation}
      variant={outlined ? 'outlined' : 'elevation'}
      {...other}
    >
      {children}
    </Paper>
  );
});

Card.displayName = 'Card';
