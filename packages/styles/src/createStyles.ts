import { Theme } from '@hopla-ui/system';
import { StyleFunction, Styles, UseStylesResult } from './types';
import { useTheme } from './useTheme';

/**
 * Crée une fonction de hook pour utiliser des styles basés sur le thème
 * @param stylesOrCreator - Objet de styles ou fonction créatrice de styles
 * @returns Hook pour utiliser les styles
 */
export function createStyles<Props extends object = {}, ClassKey extends string = string>(
  stylesOrCreator: Styles<Props, ClassKey> | StyleFunction<Props, Styles<Props, ClassKey>>
) {
  // Retourne un hook qui peut être utilisé dans les composants
  return function useStyles(props: Props = {} as Props): UseStylesResult<ClassKey> {
    const theme = useTheme();
    
    // Déterminer les styles à appliquer
    const styles =
      typeof stylesOrCreator === 'function'
        ? stylesOrCreator({ ...props, theme })
        : stylesOrCreator;
    
    // Traiter les styles pour générer des noms de classes CSS
    const classes: Partial<Record<ClassKey, string>> = {};
    
    // Pour chaque clé de style, générer un nom de classe unique
    Object.keys(styles).forEach((key) => {
      const classKey = key as ClassKey;
      // Générer un nom de classe basé sur la clé
      const className = `hopla-${classKey}`;
      
      // Stocker le nom de classe
      classes[classKey] = className;
      
      // Dans une implémentation réelle, nous injecterions ici les styles dans le DOM
      // via une solution comme CSS Modules, Emotion, ou Styled Components
    });
    
    return classes as UseStylesResult<ClassKey>;
  };
}

/**
 * Version simplifiée pour créer des styles sans props
 * @param styles - Styles à créer
 * @returns Les styles créés
 */
export function makeStyles<ClassKey extends string = string>(
  styles: Styles<{}, ClassKey> | ((theme: Theme) => Styles<{}, ClassKey>)
) {
  // Adapter le type pour qu'il soit compatible avec createStyles
  return createStyles<{}, ClassKey>(
    typeof styles === 'function'
      ? (props: { theme: Theme }) => styles(props.theme)
      : styles
  );
}
