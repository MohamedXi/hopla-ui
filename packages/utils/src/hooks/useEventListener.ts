import { RefObject, useEffect, useRef } from 'react';
import { useIsomorphicLayoutEffect } from './useIsomorphicLayoutEffect';

/**
 * Type pour les éléments qui peuvent recevoir des événements
 */
type EventTarget = HTMLElement | Window | Document | MediaQueryList;

/**
 * Hook pour ajouter facilement des écouteurs d'événements
 * @param eventName - Nom de l'événement à écouter
 * @param handler - Fonction à appeler lorsque l'événement est déclenché
 * @param element - Élément cible (par défaut window)
 * @param options - Options pour addEventListener
 */
export function useEventListener<K extends keyof WindowEventMap>(
  eventName: K,
  handler: (event: WindowEventMap[K]) => void,
  element?: RefObject<Window> | null,
  options?: boolean | AddEventListenerOptions
): void;

export function useEventListener<K extends keyof DocumentEventMap>(
  eventName: K,
  handler: (event: DocumentEventMap[K]) => void,
  element: RefObject<Document>,
  options?: boolean | AddEventListenerOptions
): void;

export function useEventListener<K extends keyof HTMLElementEventMap>(
  eventName: K,
  handler: (event: HTMLElementEventMap[K]) => void,
  element: RefObject<HTMLElement>,
  options?: boolean | AddEventListenerOptions
): void;

export function useEventListener<K extends keyof MediaQueryListEventMap>(
  eventName: K,
  handler: (event: MediaQueryListEventMap[K]) => void,
  element: RefObject<MediaQueryList>,
  options?: boolean | AddEventListenerOptions
): void;

export function useEventListener<
  KW extends keyof WindowEventMap,
  KD extends keyof DocumentEventMap,
  KH extends keyof HTMLElementEventMap,
  KM extends keyof MediaQueryListEventMap
>(
  eventName: KW | KD | KH | KM,
  handler: (
    event:
      | WindowEventMap[KW]
      | DocumentEventMap[KD]
      | HTMLElementEventMap[KH]
      | MediaQueryListEventMap[KM]
      | Event
  ) => void,
  element?: RefObject<EventTarget> | null,
  options?: boolean | AddEventListenerOptions
) {
  // Crée une référence qui stocke le gestionnaire d'événements
  const savedHandler = useRef(handler);

  useIsomorphicLayoutEffect(() => {
    savedHandler.current = handler;
  }, [handler]);

  useEffect(() => {
    // Définit l'élément cible
    const targetElement: EventTarget | null = element?.current ?? window;

    if (!(targetElement && targetElement.addEventListener)) {
      return;
    }

    // Crée un gestionnaire d'événements qui appelle le gestionnaire sauvegardé
    const eventListener: typeof handler = (event) => savedHandler.current(event);

    targetElement.addEventListener(eventName, eventListener, options);

    // Nettoie l'écouteur d'événements
    return () => {
      targetElement.removeEventListener(eventName, eventListener, options);
    };
  }, [eventName, element, options]);
}
