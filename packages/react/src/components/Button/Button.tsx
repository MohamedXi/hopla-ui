import clsx from 'clsx';
import React, { forwardRef } from 'react';

import styles from './Button.module.css';

export type ButtonVariant = 'filled' | 'outlined' | 'text' | 'ghost';
export type ButtonColor = 'primary' | 'secondary' | 'success' | 'error' | 'warning' | 'info' | 'neutral';
export type ButtonSize = 'small' | 'medium' | 'large';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /**
   * Le contenu du bouton
   */
  children: React.ReactNode;
  /**
   * La variante du bouton
   * @default 'filled'
   */
  variant?: ButtonVariant;
  /**
   * La couleur du bouton
   * @default 'primary'
   */
  color?: ButtonColor;
  /**
   * La taille du bouton
   * @default 'medium'
   */
  size?: ButtonSize;
  /**
   * Si `true`, le bouton prendra toute la largeur disponible
   * @default false
   */
  fullWidth?: boolean;
  /**
   * Si `true`, le bouton sera désactivé
   * @default false
   */
  disabled?: boolean;
  /**
   * Si `true`, le bouton affichera un état de chargement
   * @default false
   */
  loading?: boolean;
  /**
   * Élément à afficher avant le contenu du bouton
   */
  startIcon?: React.ReactNode;
  /**
   * Élément à afficher après le contenu du bouton
   */
  endIcon?: React.ReactNode;
  /**
   * Classes CSS personnalisées
   */
  className?: string;
}

/**
 * Le composant Button permet aux utilisateurs d'initier une action ou un événement,
 * comme soumettre un formulaire, ouvrir une boîte de dialogue, annuler une action,
 * ou effectuer une opération de suppression.
 */
export const Button = forwardRef<HTMLButtonElement, ButtonProps>((props, ref) => {
  const {
    children,
    variant = 'filled',
    color = 'primary',
    size = 'medium',
    fullWidth = false,
    disabled = false,
    loading = false,
    startIcon,
    endIcon,
    className,
    ...rest
  } = props;

  // Construire les noms de classes CSS pour les variantes et couleurs combinées
  const getVariantColorClass = () => {
    const colorVariantKey = `${color}${variant.charAt(0).toUpperCase() + variant.slice(1)}` as keyof typeof styles;
    return styles[colorVariantKey];
  };

  const classes = clsx(
    styles.button,
    styles[variant as keyof typeof styles],
    getVariantColorClass(),
    styles[size as keyof typeof styles],
    fullWidth && styles.fullWidth,
    disabled && styles.disabled,
    className
  );

  return (
    <button
      ref={ref}
      className={classes}
      disabled={disabled || loading}
      {...rest}
    >
      {loading && (
        <svg className={styles.loadingIcon} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
      )}
      {startIcon && !loading && <span className={styles.startIcon}>{startIcon}</span>}
      {children}
      {endIcon && <span className={styles.endIcon}>{endIcon}</span>}
    </button>
  );
});

Button.displayName = 'Button';
