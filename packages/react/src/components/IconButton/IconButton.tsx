import clsx from 'clsx';
import React, { forwardRef } from 'react';

import { ButtonColor, ButtonSize, ButtonVariant } from './Button';
import styles from './IconButton.module.css';
import { useHoplaStyles, hoplaVar } from '../../hooks/useHoplaStyles';
import { useTheme } from '../../providers/ThemeProvider';

export interface IconButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /**
   * L'icône à afficher dans le bouton
   */
  icon: React.ReactNode;
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
   * Classes CSS personnalisées
   */
  className?: string;
}

/**
 * Le composant IconButton est un bouton circulaire qui contient uniquement une icône.
 * Il est utilisé pour des actions simples et compactes.
 */
export const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>((props, ref) => {
  const {
    icon,
    variant = 'filled',
    color = 'primary',
    size = 'medium',
    disabled = false,
    loading = false,
    className,
    ...rest
  } = props;

  // Accéder au thème pour les styles dynamiques
  const { theme } = useTheme();

  // Utiliser useHoplaStyles pour générer des styles basés sur le thème
  const { css: themeStyles } = useHoplaStyles(() => ({
    iconButtonThemed: {
      backgroundColor: variant === 'filled' ? hoplaVar(`colors.${color}.500`) : 'transparent',
      color:
        variant === 'filled' ? hoplaVar('colors.common.white') : hoplaVar(`colors.${color}.500`),
      borderRadius: hoplaVar('shape.borderRadius'),
      border: variant === 'outlined' ? `1px solid ${hoplaVar(`colors.${color}.500`)}` : 'none',
      transition: `all ${theme.transitions.duration.short}ms ${theme.transitions.easing.easeInOut}`,
      '&:hover': {
        backgroundColor:
          variant === 'filled' ? hoplaVar(`colors.${color}.700`) : hoplaVar(`colors.${color}.50`),
      },
      '&:focus': {
        outline: `2px solid ${hoplaVar(`colors.${color}.300`)}`,
        outlineOffset: '2px',
      },
    },
    sizeStyles: {
      ...(size === 'small' && { padding: '6px' }),
      ...(size === 'medium' && { padding: '8px' }),
      ...(size === 'large' && { padding: '12px' }),
    },
    disabledStyles: {
      opacity: 0.5,
      cursor: 'not-allowed',
      backgroundColor: hoplaVar('colors.grey.200'),
      color: hoplaVar('colors.grey.500'),
      border: 'none',
    },
    loadingIconThemed: {
      animation: 'spin 1s linear infinite',
      width: size === 'small' ? '16px' : size === 'medium' ? '20px' : '24px',
      height: size === 'small' ? '16px' : size === 'medium' ? '20px' : '24px',
    },
  }));

  // Construire les noms de classes CSS pour les variantes et couleurs combinées
  const getVariantColorClass = () => {
    const colorVariantKey =
      `${color}${variant.charAt(0).toUpperCase() + variant.slice(1)}` as keyof typeof styles;
    return styles[colorVariantKey];
  };

  // Combiner les classes CSS traditionnelles avec les styles basés sur le thème
  const classes = clsx(
    styles.iconButton,
    styles[variant as keyof typeof styles],
    getVariantColorClass(),
    styles[size as keyof typeof styles],
    disabled && styles.disabled,
    themeStyles.iconButtonThemed,
    themeStyles.sizeStyles,
    disabled && themeStyles.disabledStyles,
    className
  );

  return (
    <button
      ref={ref}
      className={classes}
      disabled={disabled || loading}
      {...rest}
      onFocus={e => {
        // Gérer l'accessibilité pour le focus
        if (rest.onFocus) {
          rest.onFocus(e);
        }
      }}
      onBlur={e => {
        // Gérer l'accessibilité pour le blur
        if (rest.onBlur) {
          rest.onBlur(e);
        }
      }}
    >
      {loading ? (
        <svg
          className={clsx(styles.loadingIcon, themeStyles.loadingIconThemed)}
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          aria-label="Chargement en cours"
          role="img"
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
      ) : (
        icon
      )}
    </button>
  );
});

IconButton.displayName = 'IconButton';
