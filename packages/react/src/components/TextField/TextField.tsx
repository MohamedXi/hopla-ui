import clsx from 'clsx';
import React, { forwardRef, useState } from 'react';

import styles from './TextField.module.css';

export type TextFieldVariant = 'outlined' | 'filled' | 'standard';
export type TextFieldSize = 'small' | 'medium' | 'large';
export type TextFieldColor = 'primary' | 'secondary' | 'success' | 'error' | 'warning' | 'info';

export interface TextFieldProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
  /**
   * La variante du champ de texte
   * @default 'outlined'
   */
  variant?: TextFieldVariant;
  /**
   * La taille du champ de texte
   * @default 'medium'
   */
  size?: TextFieldSize;
  /**
   * La couleur du champ de texte
   * @default 'primary'
   */
  color?: TextFieldColor;
  /**
   * Le label du champ de texte
   */
  label?: string;
  /**
   * Le texte d'aide affiché sous le champ de texte
   */
  helperText?: string;
  /**
   * Si `true`, le champ de texte affichera un état d'erreur
   * @default false
   */
  error?: boolean;
  /**
   * Si `true`, le champ de texte sera désactivé
   * @default false
   */
  disabled?: boolean;
  /**
   * Si `true`, le champ de texte sera en lecture seule
   * @default false
   */
  readOnly?: boolean;
  /**
   * Si `true`, le champ de texte prendra toute la largeur disponible
   * @default false
   */
  fullWidth?: boolean;
  /**
   * Élément à afficher avant le champ de texte
   */
  startAdornment?: React.ReactNode;
  /**
   * Élément à afficher après le champ de texte
   */
  endAdornment?: React.ReactNode;
  /**
   * Classes CSS personnalisées
   */
  className?: string;
}

/**
 * Le composant TextField permet aux utilisateurs de saisir et de modifier du texte.
 * Il est généralement utilisé dans des formulaires pour collecter des données utilisateur.
 */
export const TextField = forwardRef<HTMLInputElement, TextFieldProps>((props, ref) => {
  const {
    variant = 'outlined',
    size = 'medium',
    color = 'primary',
    label,
    helperText,
    error = false,
    disabled = false,
    readOnly = false,
    fullWidth = false,
    startAdornment,
    endAdornment,
    className,
    id,
    ...rest
  } = props;

  const inputId = id || `hopla-textfield-${Math.random().toString(36).substring(2, 9)}`;
  const helperTextId = helperText ? `${inputId}-helper-text` : undefined;

  // État pour gérer le focus
  const [isFocused, setIsFocused] = useState(false);

  const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    setIsFocused(true);
    if (props.onFocus) props.onFocus(e);
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    setIsFocused(false);
    if (props.onBlur) props.onBlur(e);
  };

  // Classes CSS pour l'input
  const inputClasses = clsx(
    styles.input,
    styles[variant],
    styles[size],
    error && styles[`${variant}Error`],
    isFocused && styles[`${color}Focus`],
    fullWidth && styles.fullWidth,
    disabled && styles.disabled,
    className
  );

  const containerClasses = clsx(
    styles.container,
    fullWidth ? styles.fullWidth : styles.inlineBlock
  );

  const labelClasses = clsx(
    styles.label,
    disabled && styles.labelDisabled,
    error && styles.labelError
  );

  const helperTextClasses = clsx(styles.helperText, error && styles.helperTextError);

  const inputWrapperClasses = clsx(styles.inputWrapper, fullWidth && styles.fullWidth);

  // Classes pour les adornments
  const hasStartAdornment = !!startAdornment;
  const hasEndAdornment = !!endAdornment;

  return (
    <div className={containerClasses}>
      {label && (
        <label htmlFor={inputId} className={labelClasses}>
          {label}
        </label>
      )}
      <div className={inputWrapperClasses}>
        {startAdornment && <div className={styles.startAdornment}>{startAdornment}</div>}
        <input
          ref={ref}
          id={inputId}
          className={clsx(
            inputClasses,
            hasStartAdornment && styles.inputWithStartAdornment,
            hasEndAdornment && styles.inputWithEndAdornment
          )}
          disabled={disabled}
          readOnly={readOnly}
          aria-invalid={error}
          aria-describedby={helperTextId}
          onFocus={handleFocus}
          onBlur={handleBlur}
          {...rest}
        />
        {endAdornment && <div className={styles.endAdornment}>{endAdornment}</div>}
      </div>
      {helperText && (
        <p id={helperTextId} className={helperTextClasses}>
          {helperText}
        </p>
      )}
    </div>
  );
});

TextField.displayName = 'TextField';
