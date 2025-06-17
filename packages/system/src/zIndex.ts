import { ZIndex } from './types';

/**
 * Crée un objet contenant les indices z pour différents composants
 * @returns Un objet avec les indices z
 */
export function createZIndex(): ZIndex {
  return {
    appBar: 1100,
    drawer: 1200,
    modal: 1300,
    snackbar: 1400,
    tooltip: 1500,
  };
}
