# Hopla UI Components

This documentation presents the main components available in the Hopla UI library.

## Core Components

Core components are basic primitives that serve as a foundation for building consistent user interfaces.

### Box

Base component for creating layouts. It accepts all style properties of the system and can be used as a fundamental building block.

```jsx
import { Box } from '@hopla-ui/core';

<Box padding="16px" backgroundColor="primary.light">
  Content
</Box>
```

### Card

Container with elevation and rounded corners, ideal for presenting grouped content.

```jsx
import { Card } from '@hopla-ui/core';

<Card elevation={2} padding="16px">
  Card content
</Card>
```

### Divider

Horizontal or vertical line to visually separate content.

```jsx
import { Divider } from '@hopla-ui/core';

<Divider orientation="horizontal" />
```

### Grid

Flexible grid system based on Flexbox for creating responsive layouts.

```jsx
import { Grid } from '@hopla-ui/core';

<Grid container spacing={2}>
  <Grid item xs={12} md={6}>
    Column 1
  </Grid>
  <Grid item xs={12} md={6}>
    Column 2
  </Grid>
</Grid>
```

### Paper

Surface with elevation and white background by default.

```jsx
import { Paper } from '@hopla-ui/core';

<Paper elevation={3} padding="24px">
  Content
</Paper>
```

### Stack

Container for organizing elements in a vertical or horizontal stack with uniform spacing.

```jsx
import { Stack } from '@hopla-ui/core';

<Stack direction="column" spacing={2}>
  <div>Item 1</div>
  <div>Item 2</div>
</Stack>
```

## React Components

React components are ready-to-use user interface elements that can be used directly in your applications.

### Avatar

Visual representation of a user or entity.

```jsx
import { Avatar } from '@hopla-ui/react';

<Avatar src="/path/to/image.jpg" alt="User" />
<Avatar>JD</Avatar> {/* Initials */}
```

### Badge

Numeric or status indicator that can be attached to other components.

```jsx
import { Badge } from '@hopla-ui/react';

<Badge count={5} color="error">
  <IconMail />
</Badge>
```

### Button

Interactive button with multiple variants and states.

```jsx
import { Button } from '@hopla-ui/react';

<Button variant="contained" color="primary" onClick={handleClick}>
  Click me
</Button>

<Button variant="outlined" color="secondary" disabled>
  Disabled
</Button>
```

### ButtonGroup

Group of visually and functionally related buttons.

```jsx
import { ButtonGroup, Button } from '@hopla-ui/react';

<ButtonGroup variant="contained">
  <Button>One</Button>
  <Button>Two</Button>
  <Button>Three</Button>
</ButtonGroup>
```

### Checkbox

Form element for multiple selection.

```jsx
import { Checkbox } from '@hopla-ui/react';

<Checkbox 
  checked={checked}
  onChange={handleChange}
  label="Accept terms"
/>
```

### IconButton

Circular button containing only an icon.

```jsx
import { IconButton } from '@hopla-ui/react';
import { HeartIcon } from '@hopla-ui/icons';

<IconButton color="primary" onClick={handleClick}>
  <HeartIcon />
</IconButton>
```

### LikeButton

Specialized button for "like" actions with animations.

```jsx
import { LikeButton } from '@hopla-ui/react';

<LikeButton 
  liked={isLiked}
  onChange={handleLikeChange}
  count={likeCount}
/>
```

### TextField

Text input field with multiple variants and states.

```jsx
import { TextField } from '@hopla-ui/react';

<TextField 
  label="Email"
  value={email}
  onChange={handleEmailChange}
  error={!!emailError}
  helperText={emailError || "Enter your email address"}
/>
```

## Using with ThemeProvider

For components to correctly use the theme system, make sure to wrap them in a `ThemeProvider`:

```jsx
import { ThemeProvider } from '@hopla-ui/react';
import { createTheme } from '@hopla-ui/system';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      {/* Your components here */}
    </ThemeProvider>
  );
}
```

## Component Customization

All components can be customized via:

1. **Props** - Direct properties for common use cases
2. **Theme System** - For consistent global customization
3. **Styled Components** - For advanced and specific customization

```jsx
import { styled } from '@hopla-ui/system';
import { Button } from '@hopla-ui/react';

const CustomButton = styled(Button)`
  border-radius: 20px;
  text-transform: none;
`;

<CustomButton variant="contained">
  Custom Button
</CustomButton>
```
