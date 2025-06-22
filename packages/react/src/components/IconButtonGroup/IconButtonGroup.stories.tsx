import { IconButton } from '../IconButton/IconButton';
import { IconButtonGroup } from './IconButtonGroup';

import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof IconButtonGroup> = {
  title: 'Components/IconButtonGroup',
  component: IconButtonGroup,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['filled', 'outlined', 'text', 'ghost'],
      description: 'La variante des boutons dans le groupe',
      table: {
        defaultValue: { summary: 'filled' },
      },
    },
    color: {
      control: 'select',
      options: ['primary', 'secondary', 'success', 'error', 'warning', 'info', 'neutral'],
      description: 'La couleur des boutons dans le groupe',
      table: {
        defaultValue: { summary: 'primary' },
      },
    },
    size: {
      control: 'select',
      options: ['small', 'medium', 'large'],
      description: 'La taille des boutons dans le groupe',
      table: {
        defaultValue: { summary: 'medium' },
      },
    },
    vertical: {
      control: 'boolean',
      description: 'Si true, les boutons seront orientés verticalement',
      table: {
        defaultValue: { summary: false },
      },
    },
    fullWidth: {
      control: 'boolean',
      description: 'Si true, le groupe de boutons prendra toute la largeur disponible',
      table: {
        defaultValue: { summary: false },
      },
    },
    disabled: {
      control: 'boolean',
      description: 'Si true, tous les boutons du groupe seront désactivés',
      table: {
        defaultValue: { summary: false },
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof IconButtonGroup>;

// Icônes pour les exemples
const HomeIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
    <polyline points="9 22 9 12 15 12 15 22"></polyline>
  </svg>
);

const UserIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
    <circle cx="12" cy="7" r="4"></circle>
  </svg>
);

const SettingsIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="12" cy="12" r="3"></circle>
    <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path>
  </svg>
);

export const Default: Story = {
  args: {
    variant: 'filled',
    color: 'primary',
    size: 'medium',
    children: [
      <IconButton key="1" icon={<HomeIcon />} />,
      <IconButton key="2" icon={<UserIcon />} />,
      <IconButton key="3" icon={<SettingsIcon />} />,
    ],
  },
};

export const Outlined: Story = {
  args: {
    variant: 'outlined',
    color: 'primary',
    size: 'medium',
    children: [
      <IconButton key="1" icon={<HomeIcon />} />,
      <IconButton key="2" icon={<UserIcon />} />,
      <IconButton key="3" icon={<SettingsIcon />} />,
    ],
  },
};

export const Vertical: Story = {
  args: {
    variant: 'filled',
    color: 'primary',
    size: 'medium',
    vertical: true,
    children: [
      <IconButton key="1" icon={<HomeIcon />} />,
      <IconButton key="2" icon={<UserIcon />} />,
      <IconButton key="3" icon={<SettingsIcon />} />,
    ],
  },
};

export const DifferentSizes: Story = {
  args: {
    variant: 'filled',
    color: 'primary',
    size: 'small',
    children: [
      <IconButton key="1" icon={<HomeIcon />} />,
      <IconButton key="2" icon={<UserIcon />} />,
      <IconButton key="3" icon={<SettingsIcon />} />,
    ],
  },
};

export const DifferentColors: Story = {
  args: {
    variant: 'filled',
    color: 'secondary',
    size: 'medium',
    children: [
      <IconButton key="1" icon={<HomeIcon />} />,
      <IconButton key="2" icon={<UserIcon />} />,
      <IconButton key="3" icon={<SettingsIcon />} />,
    ],
  },
};

export const FullWidth: Story = {
  args: {
    variant: 'filled',
    color: 'primary',
    size: 'medium',
    fullWidth: true,
    children: [
      <IconButton key="1" icon={<HomeIcon />} />,
      <IconButton key="2" icon={<UserIcon />} />,
      <IconButton key="3" icon={<SettingsIcon />} />,
    ],
  },
};

export const Disabled: Story = {
  args: {
    variant: 'filled',
    color: 'primary',
    size: 'medium',
    disabled: true,
    children: [
      <IconButton key="1" icon={<HomeIcon />} />,
      <IconButton key="2" icon={<UserIcon />} />,
      <IconButton key="3" icon={<SettingsIcon />} />,
    ],
  },
};
