import { LikeButton } from './LikeButton';

import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof LikeButton> = {
  title: 'Components/LikeButton',
  component: LikeButton,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    liked: {
      control: 'boolean',
      description: 'Si true, le bouton sera dans l\'état "aimé"',
      table: {
        defaultValue: { summary: false },
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
    onChange: { action: 'changed' },
    onClick: { action: 'clicked' },
  },
};

export default meta;
type Story = StoryObj<typeof LikeButton>;

export const Default: Story = {
  args: {
    liked: false,
    size: 'medium',
  },
};

export const Liked: Story = {
  args: {
    liked: true,
    size: 'medium',
  },
};

export const Small: Story = {
  args: {
    liked: false,
    size: 'small',
  },
};

export const Large: Story = {
  args: {
    liked: false,
    size: 'large',
  },
};

export const Disabled: Story = {
  args: {
    liked: false,
    disabled: true,
  },
};

export const DisabledLiked: Story = {
  args: {
    liked: true,
    disabled: true,
  },
};
