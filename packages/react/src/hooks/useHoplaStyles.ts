import { Theme } from '@hopla-ui/system';

import { useTheme } from '../providers/ThemeProvider';

type StyleFunction<Props> = (theme: Theme, props: Props) => Record<string, React.CSSProperties>;

/**
 * Hook pour créer des styles basés sur le thème et les props
 * 
 * @param stylesFn - Fonction qui génère des styles à partir du thème et des props
 * @param props - Props à passer à la fonction de style
 * @returns Styles CSS calculés
 * 
 * @example
 * ```tsx
 * const Button = (props) => {
 *   const { color = 'primary', size = 'medium' } = props;
 *   const styles = useHoplaStyles((theme) => ({
 *     backgroundColor: theme.colors[color][500],
 *     padding: size === 'small' ? theme.spacing(1, 2) : theme.spacing(2, 4),
 *     borderRadius: theme.shape.borderRadius,
 *   }), props);
 *   
 *   return <button style={styles}>{props.children}</button>;
 * };
 * ```
 */
export function useHoplaStyles<Props extends Record<string, unknown> = Record<string, never>>(
  stylesFn: StyleFunction<Props>,
  props: Props = {} as Props
): { css: Record<string, React.CSSProperties> } {
  const { theme } = useTheme();
  return { css: stylesFn(theme, props) };
}

/**
 * Fonction utilitaire pour accéder aux variables CSS du thème
 * 
 * @param path - Chemin de la variable CSS (ex: 'colors.primary.500')
 * @returns Variable CSS formatée (ex: 'var(--hopla-primary-500)')
 * 
 * @example
 * ```css
 * .myComponent {
 *   color: var(--hopla-primary-500);
 *   font-size: var(--hopla-typography-body1-fontSize);
 * }
 * ```
 */
export function hoplaVar(path: string): string {
  const parts = path.split('.');
  if (parts.length === 1) {
    return `var(--hopla-${parts[0]})`;
  }
  
  if (parts[0] === 'colors' && parts.length === 3) {
    const [, colorName, shade] = parts;
    return `var(--hopla-${colorName}-${shade})`;
  }
  
  if (parts[0] === 'typography' && parts.length === 3) {
    const [, variant, property] = parts;
    return `var(--hopla-typography-${variant}-${property})`;
  }
  
  if (parts[0] === 'transitions') {
    if (parts[1] === 'easing' && parts.length === 3) {
      return `var(--hopla-transitions-easing-${parts[2]})`;
    }
    if (parts[1] === 'duration' && parts.length === 3) {
      return `var(--hopla-transitions-duration-${parts[2]})`;
    }
  }
  
  if (parts[0] === 'shape' && parts.length === 2) {
    return `var(--hopla-shape-${parts[1]})`;
  }
  
  // Fallback pour les chemins non reconnus
  return `var(--hopla-${parts.join('-')})`;
}
