// src/components/atoms/question-bar/QuestionBar.stories.tsx
import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';

import { QuestionBar } from '../../components/atoms/question-bar/question-bar';

const meta: Meta<typeof QuestionBar> = {
  title: 'Atoms/QuestionBar',
  component: QuestionBar,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  args: {
    onSubmit: fn(),
    disabled: false,
  },
} satisfies Meta<typeof QuestionBar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    disabled: false,
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
  },
};