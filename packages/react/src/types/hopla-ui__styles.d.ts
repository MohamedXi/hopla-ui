declare module '@hopla-ui/styles' {
  import { Theme } from '@hopla-ui/system';
  import { ElementType } from 'react';

  export interface SxProps {
    [key: string]: any;
  }

  export interface StyledOptions {
    name?: string;
    slot?: string;
    skipSx?: boolean;
    skipVariantsResolver?: boolean;
    shouldForwardProp?: (prop: PropertyKey) => boolean;
  }

  export function styled<T extends ElementType>(
    Component: T,
    options?: StyledOptions
  ): (...args: any[]) => any;

  export function styled<T extends ElementType>(
    Component: T,
    styleFunction: (theme: Theme) => Record<string, any>,
    options?: StyledOptions
  ): (...args: any[]) => any;
}
