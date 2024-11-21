import { chatMessage } from '../App.tsx';

const generateUniqueId = (): string => `_${Math.random().toString(36).substr(2, 9)}`;

const createChatMessage = (
  message: string,
  fromUser?: boolean,
  sources?: string[],
): chatMessage => ({
  id: generateUniqueId(),
  message,
  username: fromUser ? 'Jij' : 'Learning Lion (genAI)',
  sources: sources || [],
  fromUser: fromUser || false,
});

export default createChatMessage;
