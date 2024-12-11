// src/components/pages/chatpage/ChatPage.stories.tsx
import type { Meta, StoryObj } from '@storybook/react';
import ChatPage from '../../components/pages/chat_page';

const meta: Meta<typeof ChatPage> = {
  title: 'Pages/ChatPage',
  component: ChatPage,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
  args: {
    messages: [
      {
        fromUser: true,
        message: 'Hallo, kan ik wat informatie krijgen over veiligheid?',
        username: 'Gebruiker',
        sources: [],
        id: ''
      },
      {
        fromUser: false,
        message: 'Natuurlijk! Ik help je graag verder met veiligheid.',
        username: 'Learning Lion',
        sources: ['https://example.com'],
        id: ''
      },
    ],
    newMessage: (message: string | { inleiding: string; vragen: string; departmentSentiment: string; news: string; }) => {
      if (typeof message === 'string') {
        alert(`Nieuw bericht: ${message}`);
      } else {
        alert(`Nieuw bericht: ${JSON.stringify(message)}`);
      }
    },
    disabled: false,
  },
} satisfies Meta<typeof ChatPage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};

export const EmptyChat: Story = {
  args: {
    messages: [],
  },
};

export const TypingIndicator: Story = {
  args: {
    disabled: true,
  },
};
