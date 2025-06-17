/**
 * Convertit une couleur hexadécimale en valeurs RGB
 * @param color - Couleur hexadécimale (ex: #ffffff)
 * @returns Un objet contenant les valeurs r, g, b
 */
export function hexToRgb(color: string): { r: number; g: number; b: number } {
  color = color.substring(1);

  const re = new RegExp(`.{1,${color.length >= 6 ? 2 : 1}}`, 'g');
  const matchResult = color.match(re);
  const colorParts: string[] = matchResult ? [...matchResult] : [];

  if (colorParts.length > 0 && colorParts[0].length === 1) {
    for (let i = 0; i < colorParts.length; i++) {
      colorParts[i] = colorParts[i] + colorParts[i];
    }
  }

  return colorParts.length >= 3
    ? {
        r: parseInt(colorParts[0], 16),
        g: parseInt(colorParts[1], 16),
        b: parseInt(colorParts[2], 16),
      }
    : { r: 0, g: 0, b: 0 };
}

/**
 * Convertit des valeurs RGB en couleur hexadécimale
 * @param r - Valeur rouge (0-255)
 * @param g - Valeur verte (0-255)
 * @param b - Valeur bleue (0-255)
 * @returns Couleur hexadécimale
 */
export function rgbToHex(r: number, g: number, b: number): string {
  const toHex = (value: number) => {
    const hex = Math.round(value).toString(16);
    return hex.length === 1 ? `0${hex}` : hex;
  };

  return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
}

/**
 * Éclaircit une couleur d'un certain coefficient
 * @param color - Couleur hexadécimale
 * @param coefficient - Coefficient d'éclaircissement (0-1)
 * @returns Couleur hexadécimale éclaircie
 */
export function lighten(color: string, coefficient: number): string {
  const { r, g, b } = hexToRgb(color);
  const lightenValue = (value: number) => Math.round(value + (255 - value) * coefficient);

  return rgbToHex(lightenValue(r), lightenValue(g), lightenValue(b));
}

/**
 * Assombrit une couleur d'un certain coefficient
 * @param color - Couleur hexadécimale
 * @param coefficient - Coefficient d'assombrissement (0-1)
 * @returns Couleur hexadécimale assombrie
 */
export function darken(color: string, coefficient: number): string {
  const { r, g, b } = hexToRgb(color);
  const darkenValue = (value: number) => Math.round(value * (1 - coefficient));

  return rgbToHex(darkenValue(r), darkenValue(g), darkenValue(b));
}

/**
 * Ajoute une transparence à une couleur
 * @param color - Couleur hexadécimale
 * @param value - Valeur de transparence (0-1)
 * @returns Couleur avec transparence (format rgba)
 */
export function alpha(color: string, value: number): string {
  const { r, g, b } = hexToRgb(color);
  return `rgba(${r}, ${g}, ${b}, ${value})`;
}

/**
 * Calcule le contraste entre deux couleurs
 * @param foreground - Couleur de premier plan (hexadécimale)
 * @param background - Couleur d'arrière-plan (hexadécimale)
 * @returns Ratio de contraste
 */
export function getContrastRatio(foreground: string, background: string): number {
  const getLuminance = (color: string): number => {
    const { r, g, b } = hexToRgb(color);
    
    const rgb = [r, g, b].map(value => {
      value /= 255;
      return value <= 0.03928 ? value / 12.92 : Math.pow((value + 0.055) / 1.055, 2.4);
    });
    
    return 0.2126 * rgb[0] + 0.7152 * rgb[1] + 0.0722 * rgb[2];
  };

  const luminance1 = getLuminance(foreground);
  const luminance2 = getLuminance(background);

  return (Math.max(luminance1, luminance2) + 0.05) / (Math.min(luminance1, luminance2) + 0.05);
}
