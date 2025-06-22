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
export function hoplaVar(path: string, prefix: string = '--hopla'): string {
  const parts = path.split('.');

  // Cas spécifiques pour les différentes parties du thème
  if (parts.length === 1) {
    return `var(${prefix}-${parts[0]})`;
  }

  if (parts[0] === 'colors') {
    if (parts.length === 2) {
      // colors.primary -> --hopla-color-primary
      return `var(${prefix}-color-${parts[1]})`;
    } else if (parts.length === 3) {
      // colors.primary.500 -> --hopla-color-primary-500
      const [, colorName, shade] = parts;
      return `var(${prefix}-color-${colorName}-${shade})`;
    }
  }

  if (parts[0] === 'typography') {
    if (parts.length === 3) {
      // typography.body1.fontSize -> --hopla-typography-body1-fontSize
      const [, variant, property] = parts;
      return `var(${prefix}-typography-${variant}-${property})`;
    }
  }

  if (parts[0] === 'spacing') {
    if (parts.length === 2 && !isNaN(Number(parts[1]))) {
      // spacing.2 -> --hopla-spacing-2
      return `var(${prefix}-spacing-${parts[1]})`;
    } else {
      // Fallback pour spacing
      return `var(${prefix}-spacing-base)`;
    }
  }

  if (parts[0] === 'transitions') {
    if (parts[1] === 'easing' && parts.length === 3) {
      // transitions.easing.easeInOut -> --hopla-transition-easing-easeInOut
      return `var(${prefix}-transition-easing-${parts[2]})`;
    }
    if (parts[1] === 'duration' && parts.length === 3) {
      // transitions.duration.short -> --hopla-transition-duration-short
      return `var(${prefix}-transition-duration-${parts[2]})`;
    }
  }

  if (parts[0] === 'shape' && parts.length === 2) {
    // shape.borderRadius -> --hopla-shape-borderRadius
    return `var(${prefix}-shape-${parts[1]})`;
  }

  if (parts[0] === 'breakpoints' && parts.length === 3 && parts[1] === 'values') {
    // breakpoints.values.md -> --hopla-breakpoint-md
    return `var(${prefix}-breakpoint-${parts[2]})`;
  }

  if (parts[0] === 'shadows' && parts.length === 2) {
    // shadows.1 -> --hopla-shadow-1
    return `var(${prefix}-shadow-${parts[1]})`;
  }

  // Fallback pour les chemins non reconnus
  return `var(${prefix}-${parts.join('-')})`;
}
