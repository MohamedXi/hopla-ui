import React from 'react';
import { Meta, StoryObj } from '@storybook/react';
import { Checkbox } from './Checkbox';

const meta: Meta<typeof Checkbox> = {
  title: 'Components/Checkbox',
  component: Checkbox,
  tags: ['autodocs'],
  argTypes: {
    color: {
      control: { type: 'select' },
      options: ['primary', 'secondary', 'success', 'error', 'warning', 'info'],
      description: 'La couleur de la case à cocher',
      table: {
        type: { summary: 'primary | secondary | success | error | warning | info' },
        defaultValue: { summary: 'primary' },
      },
    },
    size: {
      control: { type: 'select' },
      options: ['small', 'medium', 'large'],
      description: 'La taille de la case à cocher',
      table: {
        type: { summary: 'small | medium | large' },
        defaultValue: { summary: 'medium' },
      },
    },
    label: {
      control: { type: 'text' },
      description: 'Le label de la case à cocher',
    },
    checked: {
      control: { type: 'boolean' },
      description: 'Si la case à cocher est cochée',
    },
    indeterminate: {
      control: { type: 'boolean' },
      description: 'Si la case à cocher est dans un état indéterminé',
      table: {
        defaultValue: { summary: 'false' },
      },
    },
    disabled: {
      control: { type: 'boolean' },
      description: 'Si la case à cocher est désactivée',
      table: {
        defaultValue: { summary: 'false' },
      },
    },
    error: {
      control: { type: 'boolean' },
      description: 'Si la case à cocher est en état d\'erreur',
      table: {
        defaultValue: { summary: 'false' },
      },
    },
    helperText: {
      control: { type: 'text' },
      description: 'Le texte d\'aide affiché sous la case à cocher',
    },
    onChange: { action: 'changed' },
  },
};

export default meta;
type Story = StoryObj<typeof Checkbox>;

// Checkbox par défaut
export const Default: Story = {
  args: {
    label: 'Accepter les conditions',
  },
};

// Checkbox cochée
export const Checked: Story = {
  args: {
    label: 'Option sélectionnée',
    checked: true,
  },
};

// Checkbox indéterminée
export const Indeterminate: Story = {
  args: {
    label: 'Sélection partielle',
    indeterminate: true,
  },
};

// Checkbox désactivée
export const Disabled: Story = {
  args: {
    label: 'Option désactivée',
    disabled: true,
  },
};

// Checkbox avec erreur
export const Error: Story = {
  args: {
    label: 'Option requise',
    error: true,
    helperText: 'Cette option est requise',
  },
};

// Différentes tailles
export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <Checkbox label="Petite taille" size="small" />
      <Checkbox label="Taille moyenne" size="medium" />
      <Checkbox label="Grande taille" size="large" />
    </div>
  ),
};

// Différentes couleurs
export const Colors: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <Checkbox label="Primaire" color="primary" checked />
      <Checkbox label="Secondaire" color="secondary" checked />
      <Checkbox label="Succès" color="success" checked />
      <Checkbox label="Erreur" color="error" checked />
      <Checkbox label="Avertissement" color="warning" checked />
      <Checkbox label="Information" color="info" checked />
    </div>
  ),
};

// Avec texte d'aide
export const WithHelperText: Story = {
  args: {
    label: 'Recevoir des notifications',
    helperText: 'Vous recevrez des emails concernant votre compte',
  },
};

// Groupe de cases à cocher
export const CheckboxGroup: Story = {
  render: () => {
    const [checkedItems, setCheckedItems] = React.useState({
      option1: false,
      option2: false,
      option3: false,
    });

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      setCheckedItems({
        ...checkedItems,
        [event.target.name]: event.target.checked,
      });
    };

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        <Checkbox
          label="Option 1"
          name="option1"
          checked={checkedItems.option1}
          onChange={handleChange}
        />
        <Checkbox
          label="Option 2"
          name="option2"
          checked={checkedItems.option2}
          onChange={handleChange}
        />
        <Checkbox
          label="Option 3"
          name="option3"
          checked={checkedItems.option3}
          onChange={handleChange}
        />
        <div style={{ marginTop: '16px' }}>
          Options sélectionnées: {Object.entries(checkedItems)
            .filter(([_, value]) => value)
            .map(([key]) => key)
            .join(', ') || 'Aucune'}
        </div>
      </div>
    );
  },
};
