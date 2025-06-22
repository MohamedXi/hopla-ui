import { Theme } from '@hopla-ui/system';

/**
 * Utilitaire pour créer des media queries basées sur les breakpoints du thème
 * @param theme Le thème Hopla UI
 */
type BreakpointKey = string;

type MediaQueryFunctions = {
  up: (key: BreakpointKey) => string;
  down: (key: BreakpointKey) => string;
  between: (start: BreakpointKey, end: BreakpointKey) => string;
  only: (key: BreakpointKey) => string;
};

export const createMediaQueries = (theme: Theme): MediaQueryFunctions => {
  const { breakpoints } = theme;
  
  if (!breakpoints) {
    return {
      up: (_key: BreakpointKey) => '',
      down: (_key: BreakpointKey) => '',
      between: (_start: BreakpointKey, _end: BreakpointKey) => '',
      only: (_key: BreakpointKey) => '',
    };
  }

  return {
    /**
     * Crée une media query pour les écrans plus grands qu'un breakpoint donné
     * @param key Le nom du breakpoint (xs, sm, md, lg, xl)
     */
    up: (key: BreakpointKey) => {
      if (!(key in breakpoints.values)) return '';
      const value = breakpoints.values[key as keyof typeof breakpoints.values];
      return `@media (min-width: ${value}px)`;
    },

    /**
     * Crée une media query pour les écrans plus petits qu'un breakpoint donné
     * @param key Le nom du breakpoint (xs, sm, md, lg, xl)
     */
    down: (key: BreakpointKey) => {
      if (!(key in breakpoints.values)) return '';
      const value = breakpoints.values[key as keyof typeof breakpoints.values];
      return `@media (max-width: ${value - 0.05}px)`;
    },

    /**
     * Crée une media query pour les écrans entre deux breakpoints
     * @param start Le breakpoint de début
     * @param end Le breakpoint de fin
     */
    between: (start: BreakpointKey, end: BreakpointKey) => {
      if (!(start in breakpoints.values) || !(end in breakpoints.values)) return '';
      const startValue = breakpoints.values[start as keyof typeof breakpoints.values];
      const endValue = breakpoints.values[end as keyof typeof breakpoints.values];
      return `@media (min-width: ${startValue}px) and (max-width: ${endValue - 0.05}px)`;
    },

    /**
     * Crée une media query pour un breakpoint spécifique
     * @param key Le nom du breakpoint (xs, sm, md, lg, xl)
     */
    only: (key: BreakpointKey): string => {
      if (!(key in breakpoints.values)) return '';
      
      // Convertir la clé en type sûr pour l'indexation
      const safeKey = key as keyof typeof breakpoints.values;
      const keys = Object.keys(breakpoints.values) as Array<keyof typeof breakpoints.values>;
      const keyIndex = keys.indexOf(safeKey);
      
      if (keyIndex === keys.length - 1) {
        return createMediaQueries(theme).up(key);
      }
      
      const nextKey = keys[keyIndex + 1];
      return createMediaQueries(theme).between(key, nextKey as string);
    },
  };
};

/**
 * Utilitaire pour créer des styles de transition basés sur le thème
 * @param theme Le thème Hopla UI
 */
export const createTransitions = (theme: Theme) => {
  const { transitions } = theme;
  
  if (!transitions) {
    return {
      create: () => '',
      duration: {
        shortest: 150,
        shorter: 200,
        short: 250,
        standard: 300,
        complex: 375,
        enteringScreen: 225,
        leavingScreen: 195,
      },
      easing: {
        easeInOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
        easeOut: 'cubic-bezier(0.0, 0, 0.2, 1)',
        easeIn: 'cubic-bezier(0.4, 0, 1, 1)',
        sharp: 'cubic-bezier(0.4, 0, 0.6, 1)',
      },
    };
  }

  return {
    /**
     * Crée une transition CSS pour les propriétés spécifiées
     * @param props Les propriétés CSS à animer
     * @param options Options de transition (durée, easing, delay)
     */
    create: (
      props: string | string[],
      options: {
        duration?: number | string;
        easing?: string;
        delay?: number | string;
      } = {},
    ) => {
      const {
        duration = transitions.duration?.standard || 300,
        easing = transitions.easing?.easeInOut || 'cubic-bezier(0.4, 0, 0.2, 1)',
        delay = 0,
      } = options;

      const properties = Array.isArray(props) ? props : [props];
      
      return properties
        .map((prop) => `${prop} ${duration}ms ${easing} ${delay}ms`)
        .join(',');
    },
    duration: transitions.duration || {
      shortest: 150,
      shorter: 200,
      short: 250,
      standard: 300,
      complex: 375,
      enteringScreen: 225,
      leavingScreen: 195,
    },
    easing: transitions.easing || {
      easeInOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
      easeOut: 'cubic-bezier(0.0, 0, 0.2, 1)',
      easeIn: 'cubic-bezier(0.4, 0, 1, 1)',
      sharp: 'cubic-bezier(0.4, 0, 0.6, 1)',
    },
  };
};

/**
 * Utilitaire pour créer des styles de palette basés sur le thème
 * @param theme Le thème Hopla UI
 */
export const createPalette = (theme: Theme) => {
  const { palette } = theme;
  
  if (!palette) {
    return {
      alpha: () => '',
      darken: () => '',
      lighten: () => '',
    };
  }

  return {
    /**
     * Crée une couleur avec une opacité spécifiée
     * @param color La couleur (peut être une référence au thème comme 'primary.main')
     * @param value La valeur d'opacité (0-1)
     */
    alpha: (color: string, value: number) => {
      // Si la couleur est une référence au thème
      if (color.includes('.')) {
        const [paletteKey, colorKey] = color.split('.');
        // Utiliser une assertion de type pour éviter les erreurs d'indexation
        const paletteObj = palette as Record<string, Record<string, string>>;
        if (paletteObj[paletteKey] && paletteObj[paletteKey][colorKey]) {
          color = paletteObj[paletteKey][colorKey];
        }
      }

      // Convertir la couleur en rgba
      if (color.startsWith('#')) {
        const hex = color.substring(1);
        const r = parseInt(hex.substring(0, 2), 16);
        const g = parseInt(hex.substring(2, 4), 16);
        const b = parseInt(hex.substring(4, 6), 16);
        return `rgba(${r}, ${g}, ${b}, ${value})`;
      }
      
      if (color.startsWith('rgb(')) {
        const rgb = color.match(/\d+/g);
        if (rgb && rgb.length === 3) {
          return `rgba(${rgb[0]}, ${rgb[1]}, ${rgb[2]}, ${value})`;
        }
      }
      
      if (color.startsWith('rgba(')) {
        return color.replace(/[\d.]+\)$/g, `${value})`);
      }
      
      return color;
    },

    /**
     * Assombrit une couleur d'un pourcentage donné
     * @param color La couleur (peut être une référence au thème comme 'primary.main')
     * @param value Le pourcentage d'assombrissement (0-1)
     */
    darken: (color: string, _value: number) => {
      // Cette fonction est simplifiée et pourrait être améliorée avec une vraie bibliothèque de couleur
      return color;
    },

    /**
     * Éclaircit une couleur d'un pourcentage donné
     * @param color La couleur (peut être une référence au thème comme 'primary.main')
     * @param value Le pourcentage d'éclaircissement (0-1)
     */
    lighten: (color: string, _value: number) => {
      // Cette fonction est simplifiée et pourrait être améliorée avec une vraie bibliothèque de couleur
      return color;
    },
  };
};

/**
 * Utilitaire pour créer des styles basés sur le thème
 * @param theme Le thème Hopla UI
 */
export const createStyleUtils = (theme: Theme) => {
  return {
    media: createMediaQueries(theme),
    transitions: createTransitions(theme),
    palette: createPalette(theme),
    
    /**
     * Fonction utilitaire pour appliquer des styles conditionnellement
     * @param condition La condition à évaluer
     * @param styles Les styles à appliquer si la condition est vraie
     */
    applyIf: (condition: boolean, styles: Record<string, unknown>) => {
      return condition ? styles : {};
    },
  };
};

/**
 * Hook pour utiliser les utilitaires de style avec le thème actuel
 * @param theme Le thème Hopla UI
 */
export const useStyleUtils = (theme: Theme) => {
  return createStyleUtils(theme);
};
