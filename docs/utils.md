# Hopla UI Utilities

The `@hopla-ui/utils` package provides a set of reusable utilities and hooks that facilitate the development of components and applications.

## Array Manipulation

Utility functions for efficiently manipulating arrays.

```javascript
import { 
  arrayToObject,
  chunk,
  compact,
  flatten,
  uniq,
  groupBy
} from '@hopla-ui/utils';

// Convert an array to an object
const users = [
  { id: 1, name: 'Alice' },
  { id: 2, name: 'Bob' }
];
const usersById = arrayToObject(users, 'id');
// { 1: { id: 1, name: 'Alice' }, 2: { id: 2, name: 'Bob' } }

// Split an array into chunks
const numbers = [1, 2, 3, 4, 5, 6];
const chunks = chunk(numbers, 2);
// [[1, 2], [3, 4], [5, 6]]

// Remove falsy values from an array
const values = [0, 1, false, 2, '', 3, null, undefined, NaN];
const compactValues = compact(values);
// [1, 2, 3]

// Flatten a multidimensional array
const nestedArray = [1, [2, [3, 4], 5]];
const flatArray = flatten(nestedArray);
// [1, 2, 3, 4, 5]

// Remove duplicates from an array
const duplicates = [1, 2, 2, 3, 3, 3];
const uniqueValues = uniq(duplicates);
// [1, 2, 3]

// Group an array by a property
const items = [
  { category: 'A', value: 1 },
  { category: 'B', value: 2 },
  { category: 'A', value: 3 }
];
const groupedItems = groupBy(items, 'category');
// { A: [{ category: 'A', value: 1 }, { category: 'A', value: 3 }], B: [{ category: 'B', value: 2 }] }
```

## DOM Utilities

Functions for interacting with the DOM in a safe and efficient manner.

```javascript
import {
  getScrollbarSize,
  ownerDocument,
  ownerWindow,
  setRef,
  useEventCallback,
  useForkRef
} from '@hopla-ui/utils';

// Get the scrollbar size
const scrollbarWidth = getScrollbarSize();

// Get the owner document of an element
const doc = ownerDocument(elementRef.current);

// Get the owner window of an element
const win = ownerWindow(elementRef.current);

// Set a React ref (useful for combining refs)
setRef(ref, element);

// Hook to create a stable callback that keeps reference to the latest version of the function
const handleClick = useEventCallback((event) => {
  console.log('Clicked', event);
});

// Hook to combine multiple React refs
const combinedRef = useForkRef(ref1, ref2);
```

## Custom React Hooks

Reusable React hooks for common functionalities.

```javascript
import {
  useBoolean,
  useClickOutside,
  useControlled,
  useDebounce,
  useEventListener,
  useFocusTrap,
  useLocalStorage,
  useMediaQuery,
  usePrevious
} from '@hopla-ui/utils/hooks';

// Manage a boolean state with toggle, on, off functions
const [isOpen, { toggle, setTrue, setFalse }] = useBoolean(false);

// Detect clicks outside an element
const ref = useClickOutside(() => {
  console.log('Clicked outside');
});

// Handle controlled/uncontrolled component
const [value, setValue] = useControlled({
  controlled: props.value,
  default: defaultValue,
  name: 'MyComponent',
});

// Debounce a value or function
const debouncedValue = useDebounce(value, 500);

// Add an event listener safely
useEventListener('resize', handleResize, window);

// Trap focus within an element (for modal accessibility)
const trapRef = useFocusTrap();

// Store and retrieve values in localStorage
const [theme, setTheme] = useLocalStorage('theme', 'light');

// React to CSS media queries
const isMobile = useMediaQuery('(max-width: 600px)');

// Access the previous value of a state or prop
const previousValue = usePrevious(value);
```

## Object Manipulation

Functions for manipulating JavaScript objects.

```javascript
import {
  deepClone,
  deepMerge,
  get,
  omit,
  pick,
  set
} from '@hopla-ui/utils';

// Deep clone an object
const original = { nested: { value: 42 } };
const clone = deepClone(original);

// Deep merge objects
const obj1 = { a: { b: 1 } };
const obj2 = { a: { c: 2 } };
const merged = deepMerge(obj1, obj2);
// { a: { b: 1, c: 2 } }

// Access a nested property safely
const user = { profile: { address: { city: 'Paris' } } };
const city = get(user, 'profile.address.city');
// 'Paris'
const country = get(user, 'profile.address.country', 'Unknown');
// 'Unknown' (default value)

// Omit properties from an object
const fullUser = { id: 1, name: 'Alice', password: 'secret' };
const safeUser = omit(fullUser, ['password']);
// { id: 1, name: 'Alice' }

// Select properties from an object
const userData = { id: 1, name: 'Alice', age: 30, email: 'alice@example.com' };
const basicInfo = pick(userData, ['name', 'email']);
// { name: 'Alice', email: 'alice@example.com' }

// Set a nested property
const state = { user: { profile: {} } };
const newState = set(state, 'user.profile.age', 30);
// { user: { profile: { age: 30 } } }
```

## String Manipulation

Functions for manipulating and formatting strings.

```javascript
import {
  capitalize,
  truncate,
  slugify,
  camelCase,
  kebabCase
} from '@hopla-ui/utils';

// Capitalize the first letter
const text = capitalize('hello world');
// 'Hello world'

// Truncate a string with an ellipsis
const longText = 'This is a very long text that needs to be truncated';
const truncated = truncate(longText, 20);
// 'This is a very long...' 

// Convert a string to a slug for URLs
const title = 'This is a Title!';
const slug = slugify(title);
// 'this-is-a-title'

// Convert to camelCase
const camel = camelCase('hello-world');
// 'helloWorld'

// Convert to kebab-case
const kebab = kebabCase('helloWorld');
// 'hello-world'
```

## TypeScript Types

TypeScript types and utilities to enhance type safety.

```typescript
import {
  DeepPartial,
  Nullable,
  Optional,
  Primitive,
  RecursivePartial
} from '@hopla-ui/utils/types';

// Type to make all properties of an object partially optional, including nested objects
type UserSettings = {
  profile: {
    name: string;
    email: string;
    preferences: {
      theme: string;
      notifications: boolean;
    }
    credentials: {
      username: string;
      password: string;
    };
  };
};

// Allows partially updating nested settings
function updateSettings(settings: DeepPartial<UserSettings>) {
  // ...
}

// Call with only the necessary properties
updateSettings({
  profile: {
    preferences: {
      theme: 'dark'
    }
  }
});

// Type for values that can be null
type MaybeUser = Nullable<User>;

// Type for optional values
type OptionalConfig = Optional<Config>;

// Type for primitive values
type PrimitiveValue = Primitive;

// Type for recursive partial objects
type PartialConfig = RecursivePartial<Config>;
```

## Best Practices

- Import only the functions you need to optimize bundle size
- Use custom hooks to simplify component logic
- Leverage TypeScript types to improve safety and autocompletion
- Prefer library utilities over custom implementations to maintain consistency

## Advanced Usage

Combining multiple utilities for more complex use cases.

```javascript
import { deepMerge, pick, useLocalStorage } from '@hopla-ui/utils';

// Example: User preferences manager with local storage
function useUserPreferences(defaultPreferences) {
  const [preferences, setStoredPreferences] = useLocalStorage(
    'user-preferences',
    defaultPreferences
  );

  const updatePreferences = (newPrefs) => {
    setStoredPreferences(deepMerge(preferences, newPrefs));
  };

  const resetPreferences = () => {
    setStoredPreferences(defaultPreferences);
  };

  const getPreferenceSubset = (keys) => {
    return pick(preferences, keys);
  };

  return {
    preferences,
    updatePreferences,
    resetPreferences,
    getPreferenceSubset
  };
}

// Usage
const {
  preferences,
  updatePreferences,
  resetPreferences,
  getPreferenceSubset
} = useUserPreferences({
  theme: 'light',
  fontSize: 'medium',
  notifications: true,
  language: 'en'
});

// Partially update preferences
updatePreferences({ theme: 'dark' });

// Get a subset of preferences
const displaySettings = getPreferenceSubset(['theme', 'fontSize']);
```

## Contribution

The `@hopla-ui/utils` package is designed to be extensible. If you have utilities or hooks that could be useful to the entire project, feel free to contribute by following the guidelines in [contributing.md](./contributing.md).

## Learn More

For more information on using Hopla UI components with these utilities, see [components.md](./components.md).
