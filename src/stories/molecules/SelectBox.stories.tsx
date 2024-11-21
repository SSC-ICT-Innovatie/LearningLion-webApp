// src/components/molecules/selectbox/SelectBox.stories.tsx
import type { Meta, StoryObj } from '@storybook/react';
import SelectBox from '../../components/molecules/selectbox/selectbox';

const meta: Meta<typeof SelectBox> = {
  title: 'Molecules/SelectBox',
  component: SelectBox,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  args: {
    options: ['Option 1', 'Option 2', 'Option 3'],
    placeholder: 'Selecteer een optie',
    onSubmit: (value: string) => alert(`Selected: ${value}`),
  },
} satisfies Meta<typeof SelectBox>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    options: ['Option 1', 'Option 2', 'Option 3'],
    placeholder: 'Selecteer een optie',
  },
};

export const WithCustomOptions: Story = {
  args: {
    options: ['Red', 'Blue', 'Green', 'Yellow'],
    placeholder: 'Kies een kleur',
  },
};

export const EmptyOptions: Story = {
  args: {
    options: [],
    placeholder: 'Geen opties beschikbaar',
  },
};
