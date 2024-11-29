import { useEffect, useRef } from 'react';
import QuestionBar from '../atoms/question-bar/question-bar.tsx';
import TextElement from '../atoms/TextElement/TextElement.tsx';
import ChatMessage from '../molecules/chatmessage/chatmessage.tsx';
import { chatMessage } from '../../App.tsx';
import { Button } from '../atoms/button/Button.tsx';

interface chatPageProps {
  messages: chatMessage[];
  newMessage: (message: string) => void;
  disabled: boolean;
  emptyChat: () => void;
  errorOccured: boolean;
  retryFailure: () => void;
  regenerateMessage: () => void;
}

function ChatPage({
  messages,
  newMessage,
  disabled = false,
  emptyChat,
  errorOccured = false,
  retryFailure,
  regenerateMessage,
}: chatPageProps) {
  const messagesEndRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  return (
    <div
      className="wrapper"
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        height: 'auto',
        width: '100%',
      }}>
      <Button onClick={emptyChat}>
        <p>Verwijder chat</p>
      </Button>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          height: '65vh',
          overflow: 'scroll',
          padding: '5px 0',
          margin: '10px 0',
          width: '100%',
        }}>
        {messages.map((message, _index) => (
          <ChatMessage
            key={message.id}
            fromUser={message.fromUser}
            message={message.message}
            username={message.username}
            sources={message.sources}
            retryFunction={regenerateMessage}
          />
        ))}
        <div ref={messagesEndRef} />
      </div>
      {disabled && (
        <TextElement type="small bold left">Learning Lion is aan het typen...</TextElement>
      )}
      {errorOccured && (
        <div>
          <TextElement type="small bold left">Excuus er is een fout opgetreden</TextElement>
          <Button onClick={retryFailure}>Probeer het opnieuw</Button>
        </div>
      )}
      <QuestionBar
        disabled={disabled}
        onSubmit={(values: string) => {
          newMessage(values);
        }}
      />

      <TextElement type="regular bold center">Learning Lion kan fouten maken</TextElement>
    </div>
  );
}

export default ChatPage;
