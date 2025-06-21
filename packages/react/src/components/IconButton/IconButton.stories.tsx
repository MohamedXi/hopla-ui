import { IconButton } from './IconButton';

import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof IconButton> = {
  title: 'Components/IconButton',
  component: IconButton,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['filled', 'outlined', 'text', 'ghost'],
      description: 'La variante du bouton',
      table: {
        defaultValue: { summary: 'filled' },
      },
    },
    color: {
      control: 'select',
      options: ['primary', 'secondary', 'success', 'error', 'warning', 'info', 'neutral'],
      description: 'La couleur du bouton',
      table: {
        defaultValue: { summary: 'primary' },
      },
    },
    size: {
      control: 'select',
      options: ['small', 'medium', 'large'],
      description: 'La taille du bouton',
      table: {
        defaultValue: { summary: 'medium' },
      },
    },
    disabled: {
      control: 'boolean',
      description: 'Si true, le bouton sera désactivé',
      table: {
        defaultValue: { summary: false },
      },
    },
    loading: {
      control: 'boolean',
      description: 'Si true, le bouton affichera un état de chargement',
      table: {
        defaultValue: { summary: false },
      },
    },
    onClick: { action: 'clicked' },
  },
};

export default meta;
type Story = StoryObj<typeof IconButton>;

// Icône simple pour les exemples
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

export const Default: Story = {
  args: {
    icon: <HomeIcon />,
    variant: 'filled',
    color: 'primary',
    size: 'medium',
  },
};

export const Outlined: Story = {
  args: {
    icon: <HomeIcon />,
    variant: 'outlined',
    color: 'primary',
  },
};

export const Text: Story = {
  args: {
    icon: <HomeIcon />,
    variant: 'text',
    color: 'primary',
  },
};

export const Ghost: Story = {
  args: {
    icon: <HomeIcon />,
    variant: 'ghost',
    color: 'primary',
  },
};

export const Small: Story = {
  args: {
    icon: <HomeIcon />,
    size: 'small',
  },
};

export const Large: Story = {
  args: {
    icon: <HomeIcon />,
    size: 'large',
  },
};

export const Disabled: Story = {
  args: {
    icon: <HomeIcon />,
    disabled: true,
  },
};

export const Loading: Story = {
  args: {
    icon: <HomeIcon />,
    loading: true,
  },
};

export const Neutral: Story = {
  args: {
    icon: <HomeIcon />,
    color: 'neutral',
  },
};
