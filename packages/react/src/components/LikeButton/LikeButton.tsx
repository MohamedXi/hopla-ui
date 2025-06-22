import clsx from 'clsx';
import React, { forwardRef, useState } from 'react';

import styles from './LikeButton.module.css';
import { ButtonSize } from '../Button/Button';

export interface LikeButtonProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'onChange'> {
  /**
   * Si `true`, le bouton sera dans l'état "aimé"
   * @default false
   */
  liked?: boolean;
  /**
   * Callback appelé lorsque l'état du bouton change
   */
  onChange?: (liked: boolean) => void;
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
   * Texte à afficher à côté de l'icône
   * @default 'Like'
   */
  label?: string;
  /**
   * Nombre de likes à afficher dans le compteur
   * @default 0
   */
  count?: number;
  /**
   * Classes CSS personnalisées
   */
  className?: string;
}

/**
 * Le composant LikeButton est un bouton spécifique pour les actions "j'aime".
 * Il alterne entre deux états: aimé et non aimé.
 */
export const LikeButton = forwardRef<HTMLButtonElement, LikeButtonProps>((props, ref) => {
  const {
    liked: likedProp = false,
    onChange,
    size = 'medium',
    disabled = false,
    label = 'Like',
    count = 0,
    className,
    ...rest
  } = props;

  const [internalLiked, setInternalLiked] = useState(likedProp);
  const isLiked = onChange ? likedProp : internalLiked;

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    if (!disabled) {
      const newLiked = !isLiked;
      if (onChange) {
        onChange(newLiked);
      } else {
        setInternalLiked(newLiked);
      }

      if (props.onClick) {
        props.onClick(event);
      }
    }
  };

  const classes = clsx(
    styles.likeButton,
    styles[size as keyof typeof styles],
    isLiked && styles.liked,
    disabled && styles.disabled,
    className
  );

  return (
    <div className={classes}>
      <button
        ref={ref}
        className={styles.actionButton}
        disabled={disabled}
        onClick={handleClick}
        aria-pressed={isLiked}
        {...rest}
      >
        <svg
          className={styles.icon}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill={isLiked ? 'currentColor' : 'none'}
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
        </svg>
        <span className={styles.label}>{isLiked ? 'Liked' : label}</span>
      </button>
      <button
        className={styles.countButton}
        disabled={disabled}
        onClick={handleClick}
        aria-label={`${isLiked ? count + 1 : count} likes`}
      >
        <span className={styles.count}>{isLiked ? count + 1 : count}</span>
      </button>
    </div>
  );
});

LikeButton.displayName = 'LikeButton';
