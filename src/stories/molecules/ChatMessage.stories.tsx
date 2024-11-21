// src/components/molecules/chatmessage/ChatMessage.stories.tsx
import type { Meta, StoryObj } from '@storybook/react';
import ChatMessage from '../../components/molecules/chatmessage/chatmessage';
import createChatMessage from '../../util/chatMessageFactory';

const meta: Meta<typeof ChatMessage> = {
  title: 'Molecules/ChatMessage',
  component: ChatMessage,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  args: {
    fromUser: false,
    username: 'AI Assistant',
    message: 'This is a message from the assistant. How can I help you?',
    sources: [],
  },
} satisfies Meta<typeof ChatMessage>;

export default meta;
type Story = StoryObj<typeof meta>;

const messageAI = createChatMessage('Here is the information you requested.', false, [
  'https://example.com',
  'https://example.org',
]);
const messageUser = createChatMessage('Can you provide more details on the topic?', true);

export const FromAI: Story = {
  args: {
    fromUser: messageAI.fromUser,
    username: messageAI.username,
    message: messageAI.message,
    sources: messageAI.sources,
  },
};

export const FromUser: Story = {
  args: {
    fromUser: messageUser.fromUser,
    username: messageUser.username,
    message: messageUser.message,
    sources: messageUser.sources,
  },
};

export const WithSources: Story = {
  args: {
    fromUser: messageAI.fromUser,
    username: messageAI.username,
    message: messageAI.message,
    sources: messageAI.sources,
  },
};

export const NoSources: Story = {
  args: {
    fromUser: messageAI.fromUser,
    username: messageAI.username,
    message: messageAI.message,
    sources: [],
  },
};
