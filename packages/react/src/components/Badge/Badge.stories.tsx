import { Search } from '@hopla-ui/icons';
import { Meta, StoryObj } from '@storybook/react';

import { Avatar } from '../Avatar';
import { Button } from '../Button';
import { Badge } from './Badge';

const meta: Meta<typeof Badge> = {
  title: 'Components/Badge',
  component: Badge,
  tags: ['autodocs'],
  argTypes: {
    badgeContent: {
      control: { type: 'text' },
      description: 'Contenu du badge',
    },
    color: {
      control: { type: 'select' },
      options: ['primary', 'secondary', 'success', 'error', 'warning', 'info', 'default'],
      description: 'Couleur du badge',
      table: {
        type: { summary: 'primary | secondary | success | error | warning | info | default' },
        defaultValue: { summary: 'primary' },
      },
    },
    position: {
      control: { type: 'select' },
      options: ['top-right', 'top-left', 'bottom-right', 'bottom-left'],
      description: 'Position du badge',
      table: {
        type: { summary: 'top-right | top-left | bottom-right | bottom-left' },
        defaultValue: { summary: 'top-right' },
      },
    },
    visible: {
      control: { type: 'boolean' },
      description: 'Si le badge est visible',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'true' },
      },
    },
    dot: {
      control: { type: 'boolean' },
      description: 'Si le badge est un point (sans contenu)',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    max: {
      control: { type: 'number' },
      description: 'Valeur maximale à afficher',
      table: {
        type: { summary: 'number' },
        defaultValue: { summary: '99' },
      },
    },
    showZero: {
      control: { type: 'boolean' },
      description: 'Si le badge doit être affiché même si badgeContent est zéro',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    variant: {
      control: { type: 'select' },
      options: ['standard', 'dot'],
      description: 'Variante du badge',
      table: {
        type: { summary: 'standard | dot' },
        defaultValue: { summary: 'standard' },
      },
    },
    horizontalOffset: {
      control: { type: 'text' },
      description: 'Décalage horizontal du badge',
    },
    verticalOffset: {
      control: { type: 'text' },
      description: 'Décalage vertical du badge',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Badge>;

// Badge avec nombre
export const WithNumber: Story = {
  args: {
    badgeContent: 4,
    children: <Button>Notifications</Button>,
  },
};

// Badge avec icône
export const WithIcon: Story = {
  args: {
    badgeContent: 4,
    children: <Search style={{ fontSize: '24px' }} />,
  },
};

// Badge avec Avatar
export const WithAvatar: Story = {
  args: {
    badgeContent: 4,
    color: 'success',
    children: <Avatar src="https://i.pravatar.cc/300" alt="Avatar" />,
  },
};

// Badge en point
export const Dot: Story = {
  args: {
    variant: 'dot',
    color: 'error',
    children: <Button>Notifications</Button>,
  },
};

// Différentes positions
export const Positions: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '24px' }}>
      <Badge badgeContent={1} position="top-right" color="primary">
        <div style={{ width: '40px', height: '40px', backgroundColor: '#e0e0e0' }}></div>
      </Badge>
      <Badge badgeContent={1} position="top-left" color="secondary">
        <div style={{ width: '40px', height: '40px', backgroundColor: '#e0e0e0' }}></div>
      </Badge>
      <Badge badgeContent={1} position="bottom-right" color="success">
        <div style={{ width: '40px', height: '40px', backgroundColor: '#e0e0e0' }}></div>
      </Badge>
      <Badge badgeContent={1} position="bottom-left" color="error">
        <div style={{ width: '40px', height: '40px', backgroundColor: '#e0e0e0' }}></div>
      </Badge>
    </div>
  ),
};

// Différentes couleurs
export const Colors: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '16px' }}>
      <Badge badgeContent={1} color="primary">
        <div style={{ width: '40px', height: '40px', backgroundColor: '#e0e0e0' }}></div>
      </Badge>
      <Badge badgeContent={1} color="secondary">
        <div style={{ width: '40px', height: '40px', backgroundColor: '#e0e0e0' }}></div>
      </Badge>
      <Badge badgeContent={1} color="success">
        <div style={{ width: '40px', height: '40px', backgroundColor: '#e0e0e0' }}></div>
      </Badge>
      <Badge badgeContent={1} color="error">
        <div style={{ width: '40px', height: '40px', backgroundColor: '#e0e0e0' }}></div>
      </Badge>
      <Badge badgeContent={1} color="warning">
        <div style={{ width: '40px', height: '40px', backgroundColor: '#e0e0e0' }}></div>
      </Badge>
      <Badge badgeContent={1} color="info">
        <div style={{ width: '40px', height: '40px', backgroundColor: '#e0e0e0' }}></div>
      </Badge>
      <Badge badgeContent={1} color="default">
        <div style={{ width: '40px', height: '40px', backgroundColor: '#e0e0e0' }}></div>
      </Badge>
    </div>
  ),
};

// Valeur maximale
export const MaxValue: Story = {
  args: {
    badgeContent: 1000,
    max: 99,
    children: <Button>Notifications</Button>,
  },
};

// Avec décalage personnalisé
export const WithOffset: Story = {
  args: {
    badgeContent: 4,
    horizontalOffset: '10px',
    verticalOffset: '10px',
    children: <Button>Notifications</Button>,
  },
};
