// src/components/atoms/option/Option.stories.tsx
import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';

import Option from '../../components/atoms/option/option';
// import type { OptionProps } from '../../components/atoms/option/option';

const meta: Meta<typeof Option> = {
  title: 'Atoms/Option',
  component: Option,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  args: {
    children: 'Sample Option',
    onClick: fn(),
  },
} satisfies Meta<typeof Option>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: 'Default Option',
  },
};

export const Clickable: Story = {
  args: {
    children: 'Clickable Option',
    onClick: () => alert('Option clicked!'),
  },
};
