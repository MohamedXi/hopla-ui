import { ElementType, ReactNode } from 'react';
import { Theme } from '@hopla-ui/system';
import { BaseProps, StyleProps } from '@hopla-ui/utils';

/**
 * Props pour le composant ThemeProvider
 */
export interface ThemeProviderProps {
  /**
   * Le thème à appliquer
   */
  theme: Theme;
  
  /**
   * Les enfants du composant
   */
  children: ReactNode;
}

/**
 * Props pour le composant Box
 */
export interface BoxProps extends BaseProps {
  /**
   * Composant à utiliser pour le rendu
   * @default 'div'
   */
  component?: ElementType;
  
  /**
   * Propriétés de style spécifiques au système de design
   */
  sx?: StyleProps;
}

/**
 * Props pour le composant Stack
 */
export interface StackProps extends BoxProps {
  /**
   * Direction de l'empilement
   * @default 'column'
   */
  direction?: 'row' | 'column' | 'row-reverse' | 'column-reverse';
  
  /**
   * Espacement entre les éléments
   * @default 0
   */
  spacing?: number | string;
  
  /**
   * Alignement des éléments sur l'axe principal
   */
  justifyContent?: 'flex-start' | 'flex-end' | 'center' | 'space-between' | 'space-around' | 'space-evenly';
  
  /**
   * Alignement des éléments sur l'axe secondaire
   */
  alignItems?: 'flex-start' | 'flex-end' | 'center' | 'baseline' | 'stretch';
  
  /**
   * Si les éléments doivent être enveloppés
   * @default 'nowrap'
   */
  flexWrap?: 'nowrap' | 'wrap' | 'wrap-reverse';
}

/**
 * Props pour le composant Grid
 */
export interface GridProps extends BoxProps {
  /**
   * Nombre de colonnes dans la grille
   * @default 12
   */
  columns?: number;
  
  /**
   * Espacement entre les éléments
   * @default 0
   */
  spacing?: number | string;
  
  /**
   * Espacement entre les lignes
   * @default 0
   */
  rowSpacing?: number | string;
  
  /**
   * Espacement entre les colonnes
   * @default 0
   */
  columnSpacing?: number | string;
  
  /**
   * Nombre de colonnes occupées par l'élément
   */
  xs?: number | 'auto';
  
  /**
   * Nombre de colonnes occupées par l'élément sur les écrans small
   */
  sm?: number | 'auto';
  
  /**
   * Nombre de colonnes occupées par l'élément sur les écrans medium
   */
  md?: number | 'auto';
  
  /**
   * Nombre de colonnes occupées par l'élément sur les écrans large
   */
  lg?: number | 'auto';
  
  /**
   * Nombre de colonnes occupées par l'élément sur les écrans extra-large
   */
  xl?: number | 'auto';
  
  /**
   * Si l'élément est un conteneur de grille
   */
  container?: boolean;
  
  /**
   * Si l'élément est un élément de grille
   */
  item?: boolean;
}

/**
 * Props pour le composant Paper
 */
export interface PaperProps extends BoxProps {
  /**
   * Niveau d'élévation (ombre)
   * @default 1
   */
  elevation?: number;
  
  /**
   * Si le papier doit avoir un carré (pas de border-radius)
   * @default false
   */
  square?: boolean;
  
  /**
   * Variante du papier
   * @default 'elevation'
   */
  variant?: 'elevation' | 'outlined';
}

/**
 * Props pour le composant Card
 */
export interface CardProps extends PaperProps {
  /**
   * Si la carte doit avoir une bordure
   * @default false
   */
  outlined?: boolean;
}

/**
 * Props pour le composant Divider
 */
export interface DividerProps extends BoxProps {
  /**
   * Orientation du diviseur
   * @default 'horizontal'
   */
  orientation?: 'horizontal' | 'vertical';
  
  /**
   * Si le diviseur doit avoir une marge
   * @default false
   */
  flexItem?: boolean;
  
  /**
   * Variante du diviseur
   * @default 'fullWidth'
   */
  variant?: 'fullWidth' | 'inset' | 'middle';
  
  /**
   * Alignement du texte dans le diviseur
   */
  textAlign?: 'left' | 'center' | 'right';
}
