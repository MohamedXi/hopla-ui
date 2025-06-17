import { ElementType, SVGProps } from 'react';

/**
 * Props pour les composants d'icônes
 */
export interface SvgIconProps extends SVGProps<SVGSVGElement> {
  /**
   * Taille de l'icône
   * @default 24
   */
  size?: number | string;
  
  /**
   * Couleur de l'icône
   * @default 'currentColor'
   */
  color?: string;
  
  /**
   * Titre pour l'accessibilité
   */
  title?: string;
  
  /**
   * Description pour l'accessibilité
   */
  desc?: string;
  
  /**
   * Composant à utiliser pour le rendu de l'icône
   * @default 'svg'
   */
  component?: ElementType;
  
  /**
   * Viewbox de l'icône
   * @default '0 0 24 24'
   */
  viewBox?: string;
  
  /**
   * Si l'icône doit être mise en miroir en mode RTL
   * @default false
   */
  mirrored?: boolean;
}
