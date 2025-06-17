/**
 * Types utilitaires pour la bibliothèque Hopla UI
 */

/**
 * Type pour les fonctions sans arguments et sans retour
 */
export type VoidFunction = () => void;

/**
 * Type pour les fonctions avec un argument générique et sans retour
 */
export type EventHandler<T = unknown> = (event: T) => void;

/**
 * Type pour les fonctions avec un argument générique et un retour générique
 */
export type GenericFunction<T = unknown, R = unknown> = (arg: T) => R;

/**
 * Type pour les objets avec des clés de chaîne et des valeurs génériques
 */
export type Dictionary<T = unknown> = Record<string, T>;

/**
 * Type pour les objets avec des clés de chaîne et des valeurs de n'importe quel type
 */
export type AnyObject = Record<string, any>;

/**
 * Type pour les props de style React
 */
export type StyleProps = React.CSSProperties;

/**
 * Type pour les props de référence React
 */
export type RefProp<T> = React.Ref<T>;

/**
 * Type pour les props d'enfants React
 */
export type ChildrenProps = {
  children?: React.ReactNode;
};

/**
 * Type pour les props de classe CSS
 */
export type ClassNameProps = {
  className?: string;
};

/**
 * Type pour les props de style et de classe CSS
 */
export type StyleAndClassProps = StyleProps & ClassNameProps;

/**
 * Type pour les props de base de tous les composants
 */
export type BaseProps = ChildrenProps & ClassNameProps & {
  style?: StyleProps;
  id?: string;
  'data-testid'?: string;
};

/**
 * Type pour les tailles disponibles dans les composants
 */
export type Size = 'small' | 'medium' | 'large';

/**
 * Type pour les couleurs disponibles dans les composants
 */
export type Color = 'primary' | 'secondary' | 'success' | 'error' | 'warning' | 'info' | 'default';

/**
 * Type pour les variantes de composants
 */
export type Variant = 'filled' | 'outlined' | 'text' | 'standard';

/**
 * Type pour les positions
 */
export type Position = 'top' | 'right' | 'bottom' | 'left';

/**
 * Type pour les alignements
 */
export type Alignment = 'start' | 'center' | 'end';

/**
 * Type pour les directions de flexbox
 */
export type FlexDirection = 'row' | 'column' | 'row-reverse' | 'column-reverse';

/**
 * Type pour les justifications de flexbox
 */
export type JustifyContent = 'flex-start' | 'flex-end' | 'center' | 'space-between' | 'space-around' | 'space-evenly';

/**
 * Type pour les alignements d'items de flexbox
 */
export type AlignItems = 'flex-start' | 'flex-end' | 'center' | 'baseline' | 'stretch';

/**
 * Type pour les enveloppements de flexbox
 */
export type FlexWrap = 'nowrap' | 'wrap' | 'wrap-reverse';

/**
 * Type pour les orientations
 */
export type Orientation = 'horizontal' | 'vertical';

/**
 * Type pour les props de responsive
 */
export type ResponsiveValue<T> = T | Array<T | null> | { [key: string]: T };

/**
 * Type pour les props d'accessibilité de base
 */
export type A11yProps = {
  'aria-label'?: string;
  'aria-labelledby'?: string;
  'aria-describedby'?: string;
  'aria-details'?: string;
  'aria-hidden'?: boolean;
  role?: string;
  tabIndex?: number;
};
