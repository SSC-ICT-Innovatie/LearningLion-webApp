// src/components/molecules/modal/Modal.stories.tsx
import type { Meta, StoryObj } from '@storybook/react';
import Modal from '../../components/molecules/modal/modal';

const meta: Meta<typeof Modal> = {
  title: 'Molecules/Modal',
  component: Modal,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  args: {
    title: 'API Configuratie',
    description: 'Voer je API token en URL in om verder te gaan.',
    onSubmit: () => alert('Submitted'),
  },
} satisfies Meta<typeof Modal>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    title: 'API Configuratie',
    description: 'Voer je API token en URL in om verder te gaan.',
  },
};

export const CustomTitleAndDescription: Story = {
  args: {
    title: 'Instellingen',
    description: 'Vul de onderstaande gegevens in om de instellingen te configureren.',
  },
};
