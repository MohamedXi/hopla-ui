import clsx from 'clsx';
import React, { forwardRef } from 'react';

import { ButtonColor, ButtonSize, ButtonVariant } from './Button';
import styles from './ButtonGroup.module.css';

export interface ButtonGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Le contenu du groupe de boutons
   */
  children: React.ReactNode;
  /**
   * La variante des boutons dans le groupe
   * @default 'filled'
   */
  variant?: ButtonVariant;
  /**
   * La couleur des boutons dans le groupe
   * @default 'primary'
   */
  color?: ButtonColor;
  /**
   * La taille des boutons dans le groupe
   * @default 'medium'
   */
  size?: ButtonSize;
  /**
   * Si `true`, les boutons seront orientés verticalement
   * @default false
   */
  vertical?: boolean;
  /**
   * Si `true`, les boutons prendront toute la largeur disponible
   * @default false
   */
  fullWidth?: boolean;
  /**
   * Si `true`, les boutons seront désactivés
   * @default false
   */
  disabled?: boolean;
  /**
   * Classes CSS personnalisées
   */
  className?: string;
}

/**
 * Le composant ButtonGroup permet de regrouper plusieurs boutons ensemble.
 * Les boutons dans un groupe partagent les mêmes propriétés et sont visuellement connectés.
 */
export const ButtonGroup = forwardRef<HTMLDivElement, ButtonGroupProps>((props, ref) => {
  const {
    children,
    variant = 'filled',
    color = 'primary',
    size = 'medium',
    vertical = false,
    fullWidth = false,
    disabled = false,
    className,
    ...rest
  } = props;

  const classes = clsx(
    styles.buttonGroup,
    styles[variant as keyof typeof styles],
    styles[`${color}${variant.charAt(0).toUpperCase() + variant.slice(1)}` as keyof typeof styles],
    styles[size as keyof typeof styles],
    vertical && styles.vertical,
    fullWidth && styles.fullWidth,
    disabled && styles.disabled,
    className
  );

  // Clone children to pass props
  const childrenWithProps = React.Children.map(children, (child) => {
    if (React.isValidElement(child)) {
      return React.cloneElement(child, {
        variant,
        color,
        size,
        disabled: disabled || child.props.disabled,
        className: clsx(child.props.className, styles.groupedButton)
      } as React.HTMLAttributes<HTMLElement>);
    }
    return child;
  });

  return (
    <div
      ref={ref}
      className={classes}
      role="group"
      {...rest}
    >
      {childrenWithProps}
    </div>
  );
});

ButtonGroup.displayName = 'ButtonGroup';
