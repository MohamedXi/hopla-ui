import { SxProps, styled } from '@hopla-ui/styles';
import * as React from 'react';
import { forwardRef } from 'react';

import { buttonStyles } from './Button.styled';

export type ButtonVariant = 'filled' | 'outlined' | 'text' | 'ghost';
export type ButtonColor =
  | 'primary'
  | 'secondary'
  | 'success'
  | 'error'
  | 'warning'
  | 'info'
  | 'neutral';
export type ButtonSize = 'small' | 'medium' | 'large';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /**
   * Propriété sx pour les styles personnalisés
   */
  sx?: SxProps;
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
// Créer un composant de base stylisé
const ButtonRoot = styled(
  'button',
  () => ({
    ...buttonStyles().root,
  }),
  { name: 'Button' }
);

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
    sx,
    ...rest
  } = props;

  // Obtenir les styles du thème actuel
  const themeStyles = buttonStyles(); // Utilise les variables CSS du thème

  // Fonction pour accéder aux styles de manière sécurisée
  const getStyleSafely = (key: string) => {
    return (themeStyles as Record<string, any>)[key] || {};
  };

  // Construire les styles basés sur les props
  const buttonSx = {
    // Appliquer les styles de base
    ...themeStyles.root,

    // Appliquer les styles de la variante
    ...getStyleSafely(variant),

    // Appliquer les styles de couleur + variante
    ...getStyleSafely(`${color}${variant.charAt(0).toUpperCase() + variant.slice(1)}`),

    // Appliquer les styles de taille
    ...getStyleSafely(size),

    // Appliquer les styles conditionnels
    ...(fullWidth ? themeStyles.fullWidth : {}),
    ...(disabled ? themeStyles.disabled : {}),

    // Fusionner avec les styles sx personnalisés
    ...(sx || {}),
  };

  // Styles pour les icônes adaptés à la taille du bouton
  const iconSizes = {
    small: '0.875rem', // 14px
    medium: '1rem', // 16px
    large: '1.25rem', // 20px
  };
  const iconSize = iconSizes[size as keyof typeof iconSizes];

  const startIconStyle = {
    ...themeStyles.startIcon,
    fontSize: iconSize,
  };

  const endIconStyle = {
    ...themeStyles.endIcon,
    fontSize: iconSize,
  };

  const loadingIconStyle = {
    ...themeStyles.loadingIcon,
    height: iconSize,
    width: iconSize,
  };

  // Classe CSS pour l'accessibilité et les états
  const buttonClassName = [className, disabled ? 'disabled' : '', loading ? 'loading' : '']
    .filter(Boolean)
    .join(' ');

  return (
    <ButtonRoot
      ref={ref}
      className={buttonClassName}
      sx={buttonSx}
      disabled={disabled || loading}
      aria-busy={loading}
      {...rest}
    >
      {loading && (
        <svg
          style={loadingIconStyle}
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          ></circle>
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          ></path>
        </svg>
      )}
      {startIcon && !loading && (
        <span style={startIconStyle} aria-hidden="true">
          {startIcon}
        </span>
      )}
      <span>{children}</span>
      {endIcon && (
        <span style={endIconStyle} aria-hidden="true">
          {endIcon}
        </span>
      )}
    </ButtonRoot>
  );
});

Button.displayName = 'Button';
