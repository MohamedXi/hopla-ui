import type { Meta, StoryObj } from '@storybook/react';
import { TextField } from './TextField';

const meta: Meta<typeof TextField> = {
  title: 'Components/TextField',
  component: TextField,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['outlined', 'filled', 'standard'],
      description: 'La variante du champ de texte',
      table: {
        defaultValue: { summary: 'outlined' },
      },
    },
    size: {
      control: 'select',
      options: ['small', 'medium', 'large'],
      description: 'La taille du champ de texte',
      table: {
        defaultValue: { summary: 'medium' },
      },
    },
    color: {
      control: 'select',
      options: ['primary', 'secondary', 'success', 'error', 'warning', 'info'],
      description: 'La couleur du champ de texte',
      table: {
        defaultValue: { summary: 'primary' },
      },
    },
    label: {
      control: 'text',
      description: 'Le label du champ de texte',
    },
    helperText: {
      control: 'text',
      description: 'Le texte d\'aide affiché sous le champ de texte',
    },
    placeholder: {
      control: 'text',
      description: 'Le texte de placeholder affiché dans le champ de texte',
    },
    error: {
      control: 'boolean',
      description: 'Si true, le champ de texte affichera un état d\'erreur',
      table: {
        defaultValue: { summary: false },
      },
    },
    disabled: {
      control: 'boolean',
      description: 'Si true, le champ de texte sera désactivé',
      table: {
        defaultValue: { summary: false },
      },
    },
    readOnly: {
      control: 'boolean',
      description: 'Si true, le champ de texte sera en lecture seule',
      table: {
        defaultValue: { summary: false },
      },
    },
    fullWidth: {
      control: 'boolean',
      description: 'Si true, le champ de texte prendra toute la largeur disponible',
      table: {
        defaultValue: { summary: false },
      },
    },
    onChange: { action: 'changed' },
  },
};

export default meta;
type Story = StoryObj<typeof TextField>;

export const Default: Story = {
  args: {
    label: 'Nom',
    placeholder: 'Entrez votre nom',
    variant: 'outlined',
    size: 'medium',
  },
};

export const WithHelperText: Story = {
  args: {
    label: 'Email',
    placeholder: 'exemple@email.com',
    helperText: 'Nous ne partagerons jamais votre email.',
  },
};

export const Filled: Story = {
  args: {
    label: 'Message',
    placeholder: 'Entrez votre message',
    variant: 'filled',
  },
};

export const Standard: Story = {
  args: {
    label: 'Sujet',
    placeholder: 'Entrez le sujet',
    variant: 'standard',
  },
};

export const Error: Story = {
  args: {
    label: 'Mot de passe',
    type: 'password',
    error: true,
    helperText: 'Le mot de passe doit contenir au moins 8 caractères.',
  },
};

export const Disabled: Story = {
  args: {
    label: 'Nom d\'utilisateur',
    value: 'utilisateur123',
    disabled: true,
  },
};

export const ReadOnly: Story = {
  args: {
    label: 'ID',
    value: '12345',
    readOnly: true,
  },
};

export const WithAdornments: Story = {
  args: {
    label: 'Prix',
    placeholder: '0.00',
    startAdornment: '€',
    endAdornment: <button>Valider</button>,
  },
};

export const FullWidth: Story = {
  args: {
    label: 'Adresse',
    placeholder: 'Entrez votre adresse complète',
    fullWidth: true,
  },
};
