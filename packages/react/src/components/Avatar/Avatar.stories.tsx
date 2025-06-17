import React from 'react';
import { Meta, StoryObj } from '@storybook/react';
import { Avatar } from './Avatar';
import { User } from '@hopla-ui/icons';

const meta: Meta<typeof Avatar> = {
  title: 'Components/Avatar',
  component: Avatar,
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: { type: 'select' },
      options: ['small', 'medium', 'large'],
      description: 'Taille de l\'avatar',
      table: {
        type: { summary: 'small | medium | large' },
        defaultValue: { summary: 'medium' },
      },
    },
    variant: {
      control: { type: 'select' },
      options: ['circular', 'rounded', 'square'],
      description: 'Forme de l\'avatar',
      table: {
        type: { summary: 'circular | rounded | square' },
        defaultValue: { summary: 'circular' },
      },
    },
    color: {
      control: { type: 'select' },
      options: ['primary', 'secondary', 'success', 'error', 'warning', 'info', 'default'],
      description: 'Couleur de l\'avatar',
      table: {
        type: { summary: 'primary | secondary | success | error | warning | info | default' },
        defaultValue: { summary: 'default' },
      },
    },
    src: {
      control: { type: 'text' },
      description: 'URL de l\'image',
    },
    alt: {
      control: { type: 'text' },
      description: 'Texte alternatif pour l\'image',
    },
    children: {
      control: { type: 'text' },
      description: 'Contenu à afficher à l\'intérieur de l\'avatar',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Avatar>;

// Avatar avec image
export const WithImage: Story = {
  args: {
    src: 'https://i.pravatar.cc/300',
    alt: 'Avatar',
    size: 'medium',
    variant: 'circular',
  },
};

// Avatar avec initiales
export const WithInitials: Story = {
  args: {
    children: 'JD',
    size: 'medium',
    variant: 'circular',
    color: 'primary',
  },
};

// Avatar avec icône
export const WithIcon: Story = {
  args: {
    children: <User />,
    size: 'medium',
    variant: 'circular',
    color: 'secondary',
  },
};

// Différentes tailles
export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
      <Avatar size="small">S</Avatar>
      <Avatar size="medium">M</Avatar>
      <Avatar size="large">L</Avatar>
    </div>
  ),
};

// Différentes variantes
export const Variants: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '16px' }}>
      <Avatar variant="circular">C</Avatar>
      <Avatar variant="rounded">R</Avatar>
      <Avatar variant="square">S</Avatar>
    </div>
  ),
};

// Différentes couleurs
export const Colors: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '16px' }}>
      <Avatar color="primary">P</Avatar>
      <Avatar color="secondary">S</Avatar>
      <Avatar color="success">Su</Avatar>
      <Avatar color="error">E</Avatar>
      <Avatar color="warning">W</Avatar>
      <Avatar color="info">I</Avatar>
      <Avatar color="default">D</Avatar>
    </div>
  ),
};

// Fallback pour les images qui échouent
export const Fallback: Story = {
  args: {
    src: 'invalid-image-url',
    alt: 'Invalid image',
  },
};
