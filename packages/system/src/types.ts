export interface ColorPalette {
  50: string;
  100: string;
  200: string;
  300: string;
  400: string;
  500: string;
  600: string;
  700: string;
  800: string;
  900: string;
}

export interface Colors {
  primary: ColorPalette;
  secondary: ColorPalette;
  success: ColorPalette;
  error: ColorPalette;
  warning: ColorPalette;
  info: ColorPalette;
  grey: ColorPalette;
  common: {
    black: string;
    white: string;
  };
  text: {
    primary: string;
    secondary: string;
    disabled: string;
  };
  background: {
    default: string;
    paper: string;
  };
  action: {
    active: string;
    hover: string;
    selected: string;
    disabled: string;
    disabledBackground: string;
  };
  divider: string;
}

export interface TypographyVariants {
  h1: React.CSSProperties;
  h2: React.CSSProperties;
  h3: React.CSSProperties;
  h4: React.CSSProperties;
  h5: React.CSSProperties;
  h6: React.CSSProperties;
  subtitle1: React.CSSProperties;
  subtitle2: React.CSSProperties;
  body1: React.CSSProperties;
  body2: React.CSSProperties;
  button: React.CSSProperties;
  caption: React.CSSProperties;
  overline: React.CSSProperties;
}

export interface BreakpointValues {
  xs: number;
  sm: number;
  md: number;
  lg: number;
  xl: number;
}

export interface Breakpoints {
  values: BreakpointValues;
  up: (key: keyof BreakpointValues) => string;
  down: (key: keyof BreakpointValues) => string;
  between: (start: keyof BreakpointValues, end: keyof BreakpointValues) => string;
  only: (key: keyof BreakpointValues) => string;
}

export interface Spacing {
  (value: number): string;
  (topBottom: number, rightLeft: number): string;
  (top: number, rightLeft: number, bottom: number): string;
  (top: number, right: number, bottom: number, left: number): string;
}

export interface ZIndex {
  appBar: number;
  drawer: number;
  modal: number;
  snackbar: number;
  tooltip: number;
}

export interface Theme {
  colors: Colors;
  typography: TypographyVariants;
  breakpoints: Breakpoints;
  spacing: Spacing;
  shadows: string[];
  zIndex: ZIndex;
  shape: {
    borderRadius: number;
  };
  transitions: {
    easing: {
      easeInOut: string;
      easeOut: string;
      easeIn: string;
      sharp: string;
    };
    duration: {
      shortest: number;
      shorter: number;
      short: number;
      standard: number;
      complex: number;
      enteringScreen: number;
      leavingScreen: number;
    };
  };
}
