import { Check } from '@hopla-ui/icons';
import clsx from 'clsx';
import React, { forwardRef } from 'react';

import styles from './Checkbox.module.css';

export type CheckboxColor = 'primary' | 'secondary' | 'success' | 'error' | 'warning' | 'info';
export type CheckboxSize = 'small' | 'medium' | 'large';

export interface CheckboxProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
  /**
   * La couleur de la case à cocher
   * @default 'primary'
   */
  color?: CheckboxColor;

  /**
   * La taille de la case à cocher
   * @default 'medium'
   */
  size?: CheckboxSize;

  /**
   * Le label de la case à cocher
   */
  label?: string;

  /**
   * Si `true`, la case à cocher sera cochée
   */
  checked?: boolean;

  /**
   * Si `true`, la case à cocher sera en état indéterminé
   * @default false
   */
  indeterminate?: boolean;

  /**
   * Si `true`, la case à cocher sera désactivée
   * @default false
   */
  disabled?: boolean;

  /**
   * Si `true`, la case à cocher sera en état d'erreur
   * @default false
   */
  error?: boolean;

  /**
   * Le texte d'aide affiché sous la case à cocher
   */
  helperText?: string;

  /**
   * Classes CSS personnalisées
   */
  className?: string;
}

/**
 * Le composant Checkbox permet aux utilisateurs de sélectionner une ou plusieurs options dans une liste.
 * Il est généralement utilisé dans des formulaires pour collecter des données utilisateur.
 */
export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>((props, ref) => {
  const {
    color = 'primary',
    size = 'medium',
    label,
    checked,
    indeterminate = false,
    disabled = false,
    error = false,
    helperText,
    id,
    onChange,
    ...rest
  } = props;

  const inputId = id || `hopla-checkbox-${Math.random().toString(36).substring(2, 9)}`;
  const helperTextId = helperText ? `${inputId}-helper-text` : undefined;

  // Référence React pour gérer l'état indéterminé
  const inputRef = React.useRef<HTMLInputElement | null>(null);

  // Combiner la référence externe avec notre référence interne
  React.useEffect(() => {
    if (inputRef.current) {
      inputRef.current.indeterminate = indeterminate;
    }
  }, [indeterminate]);

  // Utilisation de useCallback pour éviter les re-rendus inutiles
  const handleRefCallback = React.useCallback(
    (element: HTMLInputElement | null) => {
      // Mise à jour de notre référence interne
      inputRef.current = element;

      // Appliquer l'état indéterminé si l'élément existe
      if (element) {
        element.indeterminate = indeterminate;
      }

      // Transmission à la référence externe
      if (typeof ref === 'function') {
        ref(element);
      } else if (ref) {
        // Ne rien faire avec ref.current pour éviter l'erreur de lecture seule
      }
    },
    [ref, indeterminate]
  );

  // Obtenir les classes CSS pour les différentes tailles et états
  const getCheckboxSizeClass = () => styles[size];
  const getLabelSizeClass = () => styles[`${size}Label`];

  const labelClasses = clsx(
    styles.label,
    getLabelSizeClass(),
    disabled && styles.disabled,
    error && styles.error
  );

  const helperTextClasses = clsx(styles.helperText, error && styles.errorText);

  const containerClasses = clsx(styles.container);

  // Rendu personnalisé pour la case à cocher
  const renderCustomCheckbox = () => {
    const checkboxSize = size === 'small' ? 16 : size === 'medium' ? 20 : 24;

    return (
      <div
        className={clsx(
          styles.checkbox,
          getCheckboxSizeClass(),
          checked ? styles.checked : styles.unchecked,
          styles[color],
          disabled && styles.disabled,
          error && styles.error
        )}
      >
        {checked && (
          <Check
            className={styles.checkIcon}
            style={{ width: checkboxSize * 0.75, height: checkboxSize * 0.75 }}
          />
        )}
        {indeterminate && !checked && (
          <div className={styles.indeterminateMark}>
            <div className={styles.indeterminateBar} />
          </div>
        )}
      </div>
    );
  };

  return (
    <div>
      <div className={containerClasses}>
        <div className={styles.wrapper}>
          <input
            ref={handleRefCallback}
            type="checkbox"
            id={inputId}
            checked={checked}
            disabled={disabled}
            onChange={onChange}
            className={styles.input}
            aria-invalid={error}
            aria-describedby={helperTextId}
            {...rest}
          />
          <label htmlFor={inputId} className="flex items-center cursor-pointer">
            {renderCustomCheckbox()}
            {label && <span className={labelClasses}>{label}</span>}
          </label>
        </div>
      </div>
      {helperText && (
        <p id={helperTextId} className={helperTextClasses}>
          {helperText}
        </p>
      )}
    </div>
  );
});

Checkbox.displayName = 'Checkbox';
