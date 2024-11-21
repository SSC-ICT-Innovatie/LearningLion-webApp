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
    onSubmit: (values: {specialty: string; question: string}) => alert(`Specialty: ${values.specialty}, Question: ${values.question}`),
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
    () => <HomePage onSubmit={alert} setApiToken={alert} setApiUrl={alert} />,
  ],
};

export const WithSpecialtySelected: Story = {
  args: {
    onSubmit: ({ specialty, question }: { specialty: string; question: string }) => alert(`Selected Specialty: ${specialty}\nQuestion: ${question}`),
  },
};
