import { User } from '@hopla-ui/icons';
import clsx from 'clsx';
import React, { forwardRef, useState } from 'react';

import styles from './Avatar.module.css';

export interface AvatarProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * L'URL de l'image à afficher
   */
  src?: string;

  /**
   * Texte alternatif pour l'image
   */
  alt?: string;

  /**
   * Contenu à afficher à l'intérieur de l'avatar
   */
  children?: React.ReactNode;

  /**
   * Classe CSS à appliquer au composant
   */
  className?: string;

  /**
   * Taille de l'avatar
   * @default 'medium'
   */
  size?: 'small' | 'medium' | 'large';

  /**
   * Variante de l'avatar
   * @default 'circular'
   */
  variant?: 'circular' | 'rounded' | 'square';

  /**
   * Couleur de l'avatar
   * @default 'default'
   */
  color?: 'primary' | 'secondary' | 'success' | 'error' | 'warning' | 'info' | 'default';
}

/**
 * Composant Avatar - Affiche une image, des initiales ou une icône dans un format circulaire ou carré
 * @param props - Props du composant
 * @returns Composant React
 */
export const Avatar = forwardRef<HTMLDivElement, AvatarProps>((props, ref) => {
  const {
    alt,
    children,
    className,
    color = 'default',
    size = 'medium',
    src,
    variant = 'circular',
    ...other
  } = props;

  const [imgError, setImgError] = useState(false);

  const handleError = () => {
    setImgError(true);
  };

  // Déterminer le contenu de l'avatar
  const getAvatarContent = () => {
    if (src && !imgError) {
      return <img src={src} alt={alt} className={styles.img} onError={handleError} />;
    }

    if (children) {
      return <div className={styles.children}>{children}</div>;
    }

    // Si pas d'image ni d'enfants, afficher une icône par défaut
    return <User className={styles.fallback} />;
  };

  return (
    <div
      ref={ref}
      className={clsx(styles.avatar, styles[size], styles[variant], styles[color], className)}
      {...other}
    >
      {getAvatarContent()}
    </div>
  );
});

Avatar.displayName = 'Avatar';
