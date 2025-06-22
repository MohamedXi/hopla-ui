import { SxProps, styled } from '@hopla-ui/styles';
import React, { forwardRef } from 'react';

import { ButtonColor, ButtonSize, ButtonVariant } from '../Button/Button';
import { iconButtonGroupStyles } from './IconButtonGroup.styled';

export interface IconButtonGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Le contenu du groupe de boutons d'icônes
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
  /**
   * Styles personnalisés via le système sx
   */
  sx?: SxProps;
}

// Créer un composant de base stylisé
const IconButtonGroupRoot = styled(
  'div',
  () => ({
    ...iconButtonGroupStyles().root,
  }),
  { name: 'IconButtonGroup' }
);

/**
 * Le composant IconButtonGroup permet de regrouper plusieurs boutons d'icônes ensemble.
 * Les boutons dans un groupe partagent les mêmes propriétés et sont visuellement connectés.
 * Ce composant est spécialement conçu pour les boutons d'icônes sans texte.
 */
export const IconButtonGroup = forwardRef<HTMLDivElement, IconButtonGroupProps>((props, ref) => {
  const {
    children,
    variant = 'filled',
    color = 'primary',
    size = 'medium',
    vertical = false,
    fullWidth = false,
    disabled = false,
    className,
    sx,
    ...rest
  } = props;

  // Obtenir les styles du thème actuel
  const themeStyles = iconButtonGroupStyles();
  
  // Construire les styles basés sur les props
  const groupSx = {
    // Styles de base appliqués dans IconButtonGroupRoot
    
    // Appliquer les styles conditionnels
    ...(vertical ? themeStyles.vertical : {}),
    ...(fullWidth ? themeStyles.fullWidth : {}),
    
    // Fusionner avec les styles sx personnalisés
    ...(sx || {}),
  };

  // Clone children to pass props
  const childrenWithProps = React.Children.map(children, (child, index) => {
    if (React.isValidElement(child)) {
      // Déterminer la position du bouton (premier, dernier ou milieu)
      const isFirst = index === 0;
      const isLast = index === React.Children.count(children) - 1;
      
      // Définir les styles spécifiques pour chaque position
      let buttonSx: SxProps = {};
      
      if (vertical) {
        // Styles pour l'orientation verticale
        buttonSx = {
          borderRadius: 0,
          ...(isFirst ? {
            borderTopLeftRadius: 'var(--hopla-shape-borderRadius)',
            borderTopRightRadius: 'var(--hopla-shape-borderRadius)',
          } : {}),
          ...(isLast ? {
            borderBottomLeftRadius: 'var(--hopla-shape-borderRadius)',
            borderBottomRightRadius: 'var(--hopla-shape-borderRadius)',
          } : {}),
          ...(!isLast ? { borderBottomWidth: 0 } : {}),
        };
      } else {
        // Styles pour l'orientation horizontale
        buttonSx = {
          borderRadius: 0,
          ...(isFirst ? {
            borderTopLeftRadius: 'var(--hopla-shape-borderRadius)',
            borderBottomLeftRadius: 'var(--hopla-shape-borderRadius)',
          } : {}),
          ...(isLast ? {
            borderTopRightRadius: 'var(--hopla-shape-borderRadius)',
            borderBottomRightRadius: 'var(--hopla-shape-borderRadius)',
          } : {}),
          ...(!isLast ? { borderRightWidth: 0 } : {}),
        };
      }
      
      // Fusionner avec les styles sx existants du bouton
      const childSx = ((child as React.ReactElement).props as any)?.sx || {};
      
      return React.cloneElement(child, {
        variant,
        color,
        size,
        disabled: disabled || ((child as React.ReactElement).props as any)?.disabled,
        sx: { ...childSx, ...buttonSx },
      } as React.HTMLAttributes<HTMLElement>);
    }
    return child;
  });

  return (
    <IconButtonGroupRoot 
      ref={ref} 
      className={className} 
      role="group" 
      sx={groupSx}
      {...rest}
    >
      {childrenWithProps}
    </IconButtonGroupRoot>
  );
});

IconButtonGroup.displayName = 'IconButtonGroup';

export default IconButtonGroup;
