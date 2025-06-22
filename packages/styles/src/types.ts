import { Theme } from '@hopla-ui/system';
import React from 'react';

// Type pour les propriétés de style acceptées par le système sx
export interface SxProps {
  // Propriétés de mise en page
  m?: number | string;
  margin?: number | string;
  mt?: number | string;
  marginTop?: number | string;
  mr?: number | string;
  marginRight?: number | string;
  mb?: number | string;
  marginBottom?: number | string;
  ml?: number | string;
  marginLeft?: number | string;
  mx?: number | string;
  marginX?: number | string;
  my?: number | string;
  marginY?: number | string;
  p?: number | string;
  padding?: number | string;
  pt?: number | string;
  paddingTop?: number | string;
  pr?: number | string;
  paddingRight?: number | string;
  pb?: number | string;
  paddingBottom?: number | string;
  pl?: number | string;
  paddingLeft?: number | string;
  px?: number | string;
  paddingX?: number | string;
  py?: number | string;
  paddingY?: number | string;

  // Propriétés de taille
  width?: number | string;
  height?: number | string;
  minWidth?: number | string;
  maxWidth?: number | string;
  minHeight?: number | string;
  maxHeight?: number | string;

  // Propriétés de couleur
  color?: string;
  bgcolor?: string;
  backgroundColor?: string;

  // Propriétés de typographie
  fontSize?: number | string;
  fontWeight?: number | string;
  lineHeight?: number | string;
  letterSpacing?: number | string;
  textAlign?: 'left' | 'right' | 'center' | 'justify';
  fontStyle?: string;

  // Propriétés de bordure
  border?: number | string;
  borderTop?: number | string;
  borderRight?: number | string;
  borderBottom?: number | string;
  borderLeft?: number | string;
  borderColor?: string;
  borderRadius?: number | string;

  // Propriétés de disposition
  display?: string;
  flexDirection?: 'row' | 'column' | 'row-reverse' | 'column-reverse';
  flexWrap?: 'nowrap' | 'wrap' | 'wrap-reverse';
  justifyContent?: 'flex-start' | 'flex-end' | 'center' | 'space-between' | 'space-around' | 'space-evenly';
  alignItems?: 'flex-start' | 'flex-end' | 'center' | 'baseline' | 'stretch';
  alignContent?: 'flex-start' | 'flex-end' | 'center' | 'space-between' | 'space-around' | 'stretch';
  gap?: number | string;
  rowGap?: number | string;
  columnGap?: number | string;
  flex?: number | string;
  flexGrow?: number;
  flexShrink?: number;
  flexBasis?: number | string;
  alignSelf?: 'auto' | 'flex-start' | 'flex-end' | 'center' | 'baseline' | 'stretch';
  order?: number;

  // Propriétés de position
  position?: 'static' | 'relative' | 'absolute' | 'fixed' | 'sticky';
  top?: number | string;
  right?: number | string;
  bottom?: number | string;
  left?: number | string;
  zIndex?: number;

  // Propriétés d'ombre
  boxShadow?: string;

  // Propriétés de transition
  transition?: string;

  // Support pour les pseudo-classes et pseudo-éléments
  '&:hover'?: SxProps;
  '&:active'?: SxProps;
  '&:focus'?: SxProps;
  '&:disabled'?: SxProps;
  '&::before'?: SxProps;
  '&::after'?: SxProps;

  // Support pour les media queries
  '@media'?: {
    [key: string]: SxProps;
  };

  // Support pour les styles personnalisés
  [key: string]: any;
}

// Type pour les props de composant avec support sx
export interface SxComponentProps {
  sx?: SxProps;
  className?: string;
}

// Type pour la fonction de style
export type StyleFunction<Props extends object = {}, Output = any> = (props: Props & { theme: Theme }) => Output;

// Type pour les styles créés
export type Styles<Props extends object = {}, ClassKey extends string = string> = Record<
  ClassKey,
  React.CSSProperties | StyleFunction<Props, React.CSSProperties>
>;

// Type pour les options de style
export interface StyleOptions {
  name?: string;
  slot?: string;
  skipSx?: boolean;
  skipVariants?: boolean;
  shouldForwardProp?: (prop: PropertyKey) => boolean;
}

// Type pour le résultat de useStyles
export type UseStylesResult<ClassKey extends string = string> = Record<ClassKey, string>;
