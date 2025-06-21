import { Button } from './Button';
import { ButtonGroup } from './ButtonGroup';
import { IconButton } from './IconButton';

import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof ButtonGroup> = {
  title: 'Components/ButtonGroup',
  component: ButtonGroup,
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
type Story = StoryObj<typeof ButtonGroup>;

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
    variant: 'filled',
    color: 'primary',
    size: 'medium',
    children: [
      <Button key="1">Précédent</Button>,
      <Button key="2">Actuel</Button>,
      <Button key="3">Suivant</Button>,
    ],
  },
};

export const Outlined: Story = {
  args: {
    variant: 'outlined',
    color: 'primary',
    size: 'medium',
    children: [
      <Button key="1">Précédent</Button>,
      <Button key="2">Actuel</Button>,
      <Button key="3">Suivant</Button>,
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
      <Button key="1">Haut</Button>,
      <Button key="2">Milieu</Button>,
      <Button key="3">Bas</Button>,
    ],
  },
};

export const WithIcons: Story = {
  args: {
    variant: 'filled',
    color: 'primary',
    size: 'medium',
    children: [
      <Button key="1" startIcon={<HomeIcon />}>
        Accueil
      </Button>,
      <Button key="2">Profil</Button>,
      <Button key="3" endIcon={<HomeIcon />}>
        Paramètres
      </Button>,
    ],
  },
};

export const IconButtonGroup: Story = {
  args: {
    variant: 'filled',
    color: 'primary',
    size: 'medium',
    children: [
      <IconButton key="1" icon={<HomeIcon />} />,
      <IconButton key="2" icon={<HomeIcon />} />,
      <IconButton key="3" icon={<HomeIcon />} />,
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
      <Button key="1">Précédent</Button>,
      <Button key="2">Actuel</Button>,
      <Button key="3">Suivant</Button>,
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
      <Button key="1">Précédent</Button>,
      <Button key="2">Actuel</Button>,
      <Button key="3">Suivant</Button>,
    ],
  },
};
