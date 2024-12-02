// src/components/pages/homepage/HomePage.stories.tsx
import type { Meta, StoryObj } from '@storybook/react';
import HomePage from '../../components/pages/home_page';

const meta: Meta<typeof HomePage> = {
  title: 'Pages/HomePage',
  component: HomePage,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
  args: {
    setApiToken: (token: string) => alert(`API Token: ${token}`),
    setApiUrl: (url: string) => alert(`API URL: ${url}`),
  },
} satisfies Meta<typeof HomePage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};

export const WithoutModal: Story = {
  args: {},
  decorators: [
    () => (
      <HomePage
        setApiToken={alert}
        setApiUrl={alert}
        specialties={[]}
        setSpecialtyCallback={() => { } } 
        template={<div />}      />
    ),
  ],
};

export const WithSpecialtySelected: Story = {
  args: {
    setSpecialtyCallback: (selectedSpecialty: string) => alert(`Selected Specialty: ${selectedSpecialty}`),
  },
};
