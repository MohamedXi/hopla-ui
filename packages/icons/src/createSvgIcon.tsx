import * as React from 'react';

import { SvgIconProps } from './types';

/**
 * Crée un composant d'icône SVG à partir d'un chemin SVG
 * @param path - Le chemin SVG ou un élément React
 * @param displayName - Le nom d'affichage du composant
 * @returns Un composant d'icône SVG
 */
export function createSvgIcon(path: React.ReactNode, displayName: string) {
  const Component = React.forwardRef<SVGSVGElement, SvgIconProps>((props, ref) => {
    const {
      size = 24,
      color = 'currentColor',
      title,
      desc,
      component: Component = 'svg',
      viewBox = '0 0 24 24',
      mirrored = false,
      children,
      ...other
    } = props;

    const style = mirrored ? { transform: 'scaleX(-1)', ...props.style } : props.style;

    return (
      <Component
        ref={ref}
        width={size}
        height={size}
        fill={color}
        viewBox={viewBox}
        focusable="false"
        aria-hidden={title ? undefined : 'true'}
        role={title ? 'img' : 'presentation'}
        style={style}
        {...other}
      >
        {title && <title>{title}</title>}
        {desc && <desc>{desc}</desc>}
        {path}
        {children}
      </Component>
    );
  });

  Component.displayName = `${displayName}Icon`;

  return Component;
}
