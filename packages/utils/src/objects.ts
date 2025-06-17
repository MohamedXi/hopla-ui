/**
 * Vérifie si la valeur est un objet
 * @param value - La valeur à vérifier
 * @returns true si la valeur est un objet
 */
export function isObject(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

/**
 * Fusionne profondément deux objets
 * @param target - L'objet cible
 * @param source - L'objet source
 * @returns Un nouvel objet fusionné
 */
export function deepMerge<T extends Record<string, any>, U extends Record<string, any>>(
  target: T,
  source: U
): T & U {
  const output = { ...target } as T & U;

  if (isObject(target) && isObject(source)) {
    Object.keys(source).forEach(key => {
      const sourceKey = key as keyof typeof source;
      if (isObject(source[sourceKey])) {
        if (!(key in target)) {
          Object.assign(output, { [key]: source[sourceKey] });
        } else {
          const targetKey = key as keyof typeof target;
          const merged = deepMerge(target[targetKey] as Record<string, any>, source[sourceKey] as Record<string, any>);
          Object.assign(output, { [key]: merged });
        }
      } else {
        Object.assign(output, { [key]: source[sourceKey] });
      }
    });
  }

  return output;
}

/**
 * Crée une copie profonde d'un objet
 * @param obj - L'objet à copier
 * @returns Une copie profonde de l'objet
 */
export function deepClone<T>(obj: T): T {
  if (obj === null || typeof obj !== 'object') {
    return obj;
  }

  if (Array.isArray(obj)) {
    return obj.map(deepClone) as unknown as T;
  }

  return Object.keys(obj).reduce((result, key) => {
    return {
      ...result,
      [key]: deepClone((obj as Record<string, unknown>)[key]),
    };
  }, {}) as T;
}

/**
 * Supprime les propriétés undefined d'un objet
 * @param obj - L'objet à nettoyer
 * @returns Un nouvel objet sans les propriétés undefined
 */
export function removeUndefined<T extends Record<string, unknown>>(obj: T): Partial<T> {
  return Object.entries(obj).reduce((acc, [key, value]) => {
    if (value !== undefined) {
      acc[key as keyof T] = value as any;
    }
    return acc;
  }, {} as Partial<T>);
}

/**
 * Vérifie si un objet est vide
 * @param obj - L'objet à vérifier
 * @returns true si l'objet est vide
 */
export function isEmptyObject(obj: Record<string, unknown>): boolean {
  return Object.keys(obj).length === 0;
}

/**
 * Récupère une valeur imbriquée dans un objet à partir d'un chemin
 * @param obj - L'objet source
 * @param path - Le chemin vers la valeur (ex: 'user.address.city')
 * @param defaultValue - La valeur par défaut si le chemin n'existe pas
 * @returns La valeur trouvée ou la valeur par défaut
 */
export function getNestedValue<T>(
  obj: Record<string, any>,
  path: string,
  defaultValue?: T
): T | undefined {
  const keys = path.split('.');
  let result: any = obj;

  for (const key of keys) {
    if (result === undefined || result === null) {
      return defaultValue;
    }
    result = result[key];
  }

  return (result === undefined ? defaultValue : result) as T | undefined;
}

/**
 * Définit une valeur imbriquée dans un objet à partir d'un chemin
 * @param obj - L'objet à modifier
 * @param path - Le chemin vers la valeur (ex: 'user.address.city')
 * @param value - La valeur à définir
 * @returns L'objet modifié
 */
export function setNestedValue<T extends Record<string, any>, V>(
  obj: T,
  path: string,
  value: V
): T {
  const keys = path.split('.');
  const lastKey = keys.pop();
  
  if (!lastKey) {
    return obj;
  }

  let current: Record<string, any> = obj;
  
  for (const key of keys) {
    if (current[key] === undefined || current[key] === null) {
      current[key] = {};
    }
    current = current[key] as Record<string, any>;
  }
  
  current[lastKey] = value;
  return obj;
}
