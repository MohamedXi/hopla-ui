import clsx from 'clsx';
import React, { forwardRef } from 'react';

import styles from './Badge.module.css';

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  /**
   * Le contenu du badge
   */
  badgeContent?: React.ReactNode;
  
  /**
   * Les enfants du badge
   */
  children?: React.ReactNode;
  
  /**
   * Classe CSS à appliquer au composant
   */
  className?: string;
  
  /**
   * Couleur du badge
   * @default 'primary'
   */
  color?: 'primary' | 'secondary' | 'success' | 'error' | 'warning' | 'info' | 'default';
  
  /**
   * Position du badge
   * @default 'top-right'
   */
  position?: 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left';
  
  /**
   * Si le badge est visible
   * @default true
   */
  visible?: boolean;
  
  /**
   * Si le badge est un point (sans contenu)
   * @default false
   */
  dot?: boolean;
  
  /**
   * Valeur maximale à afficher
   * @default 99
   */
  max?: number;
  
  /**
   * Si le badge doit être affiché même si badgeContent est zéro
   * @default false
   */
  showZero?: boolean;
  
  /**
   * Variante du badge
   * @default 'standard'
   */
  variant?: 'standard' | 'dot';
  
  /**
   * Décalage horizontal du badge
   */
  horizontalOffset?: number | string;
  
  /**
   * Décalage vertical du badge
   */
  verticalOffset?: number | string;
}

/**
 * Composant Badge - Affiche un badge sur un élément
 * @param props - Props du composant
 * @returns Composant React
 */
export const Badge = forwardRef<HTMLSpanElement, BadgeProps>((props, ref) => {
  const {
    badgeContent,
    children,
    className,
    color = 'primary',
    position = 'top-right',
    visible = true,
    dot = false,
    max = 99,
    showZero = false,
    variant = 'standard',
    horizontalOffset,
    verticalOffset,
    ...other
  } = props;

  // Détermine si le badge doit être affiché
  const displayBadge = visible && (
    dot || 
    variant === 'dot' || 
    (badgeContent !== undefined && (showZero || badgeContent !== 0))
  );

  // Formatte le contenu du badge
  const getBadgeContent = () => {
    if (dot || variant === 'dot') return null;
    
    if (typeof badgeContent === 'number' && badgeContent > max) {
      return `${max}+`;
    }
    
    return badgeContent;
  };

  // Préparation des styles personnalisés pour les décalages
  const customStyles: React.CSSProperties = {};
  
  // Appliquer les décalages personnalisés si spécifiés
  if (horizontalOffset !== undefined) {
    if (position.includes('right')) {
      customStyles.right = horizontalOffset;
    } else {
      customStyles.left = horizontalOffset;
    }
  }

  if (verticalOffset !== undefined) {
    if (position.includes('top')) {
      customStyles.top = verticalOffset;
    } else {
      customStyles.bottom = verticalOffset;
    }
  }
  
  // Conversion des positions avec tirets en camelCase pour les classes CSS
  const getPositionClassName = () => {
    switch (position) {
      case 'top-right':
        return styles.topRight;
      case 'top-left':
        return styles.topLeft;
      case 'bottom-right':
        return styles.bottomRight;
      case 'bottom-left':
        return styles.bottomLeft;
      default:
        return styles.topRight;
    }
  };

  return (
    <span ref={ref} className={clsx(styles.root, className)} {...other}>
      {children}
      {displayBadge && (
        <span
          className={clsx(
            styles.badge,
            getPositionClassName(),
            styles[color as keyof typeof styles],
            (dot || variant === 'dot') && styles.dot
          )}
          style={customStyles}
        >
          {getBadgeContent()}
        </span>
      )}
    </span>
  );
});

Badge.displayName = 'Badge';
