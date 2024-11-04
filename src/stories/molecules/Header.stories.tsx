// src/components/molecules/header/Header.stories.tsx
import type { Meta, StoryObj } from '@storybook/react';
import { Header } from '../../components/molecules/header/header';

const meta: Meta<typeof Header> = {
  title: 'Molecules/Header',
  component: Header,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  args: {
    chatPage: false,
    specialty: '',
  },
} satisfies Meta<typeof Header>;

export default meta;
type Story = StoryObj<typeof meta>;

export const DefaultView: Story = {
  args: {
    chatPage: false,
  },
};

export const ChatPageWithoutSpecialty: Story = {
  args: {
    chatPage: true,
    specialty: '',
  },
};

export const ChatPageWithSpecialty: Story = {
  args: {
    chatPage: true,
    specialty: 'Security',
  },
};